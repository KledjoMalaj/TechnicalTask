import {HttpException, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Admin} from "../schemas/Admin.schema";
import {Model} from "mongoose";
import {AdminDto} from "./Dto/admin.dto";
import bcrypt from "node_modules/bcryptjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AdminsService{
    constructor(@InjectModel(Admin.name) private adminModel:Model<Admin>,
                private jwtService: JwtService
    ) {}

    async createAdmin(crateAdminDto:AdminDto){
        const hashed = await bcrypt.hash(crateAdminDto.password,10)
        const newAdmin = new this.adminModel({
            ...crateAdminDto,
            password:hashed
        })
        return newAdmin.save()
    }

    async validateAdmin(email: string, password: string) {
        const findAdmin = await this.adminModel.findOne({ email })
        if (!findAdmin) throw new HttpException('Admin not found', 404)

        const isMatch = await bcrypt.compare(password, findAdmin.password)
        if (!isMatch) throw new HttpException('Wrong Password', 400)

        return findAdmin
    }

    async login(adminDto: AdminDto) {
        const admin = await this.adminModel.findOne({email:adminDto.email})
        if (!admin) throw new HttpException('Admin does not exist',400)
        const payload = {
            id: admin._id,
            email: admin.email
        }
        return this.jwtService.sign(payload)
    }
}