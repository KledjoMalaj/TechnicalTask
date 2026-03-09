import {Model} from "mongoose";
import {Company} from "../schemas/Company.schema";
import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {CompanyDto} from "./Dto/company.dto";
import {User} from "../schemas/User.schema";
import {Device} from "../schemas/Device.schema";

@Injectable()
export class CompaniesService {
    constructor(@InjectModel(Company.name) private companyModel: Model<Company>,
                @InjectModel(User.name) private userModel: Model<User>,
                @InjectModel(Device.name) private deviceModel:Model<Device>) {}

    createCompany(company:CompanyDto){
        const newCompany = new this.companyModel(company)
        return newCompany.save()
    }

    getAllCompanies(){
        return this.companyModel.find()
    }

    async deleteCompany(id:string){
        await this.companyModel.findByIdAndDelete(id)
        await this.userModel.deleteMany({companyId:id})
        await this.deviceModel.deleteMany({companyId:id})
    }

    async getCompanyStats(id:string){
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
    }

    async getHomePageStats(){
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
    }
}