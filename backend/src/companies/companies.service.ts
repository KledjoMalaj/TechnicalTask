import {Model} from "mongoose";
import {Company} from "../schemas/Company.schema";
import {ConflictException, HttpException, Injectable, InternalServerErrorException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {CompanyDto} from "./Dto/company.dto";
import {User} from "../schemas/User.schema";
import {Device} from "../schemas/Device.schema";

@Injectable()
export class CompaniesService {
    constructor(@InjectModel(Company.name) private companyModel: Model<Company>,
                @InjectModel(User.name) private userModel: Model<User>,
                @InjectModel(Device.name) private deviceModel:Model<Device>) {}

    async createCompany(company:CompanyDto){
        try {
            const newCompany = new this.companyModel(company)
            const exists = await this.companyModel.findOne({name:company.name})
            if (exists) {
                throw new ConflictException('Company already registered')
            }
            return newCompany.save()
        }catch (err) {
            if (err instanceof HttpException) {
                throw err
            }
            throw new InternalServerErrorException("Failed to register")
        }
    }

    getAllCompanies(){
        return this.companyModel.find()
    }

    async deleteCompany(id: string) {
        try {
            await this.companyModel.findByIdAndDelete(id);
            await this.userModel.deleteMany({ companyId: id });
            await this.deviceModel.deleteMany({ companyId: id });
        } catch (err) {
            throw new Error(`Failed to delete company: ${err.message}`);
        }
    }

    async getCompanyStats(id:string){
        try{
            const userCount = await this.userModel.countDocuments({companyId:id})
            const deviceCount = await this.deviceModel.countDocuments({companyId:id})
            const unauthorisedDevices = await this.deviceModel.countDocuments({companyId:id,isAuthorized:false})
            const authorisedDevices = await this.deviceModel.countDocuments({companyId:id,isAuthorized:true})
            return {
                users:userCount,
                devices:deviceCount,
                unauthorizedDevices:unauthorisedDevices,
                authorisedDevices:authorisedDevices
            }
        }catch (err){
            throw new InternalServerErrorException(`Filed to get company stats ${err.message}`)
        }
    }

    async getHomePageStats(){
        try{
            const userCount = await this.userModel.countDocuments()
            const deviceCount = await this.deviceModel.countDocuments()
            const companyCount = await this.companyModel.countDocuments()
            const authCount = await this.deviceModel.countDocuments({isAuthorized:true})
            const notAuthCount = await this.deviceModel.countDocuments({isAuthorized:false})
            return {
                users:userCount,
                devices:deviceCount,
                companies:companyCount,
                isAuth:authCount,
                notAuth:notAuthCount
            }
        }catch (err){
            throw new InternalServerErrorException(`Failed to get homepage stats ${err.message}`)
        }
    }
}