import {ConflictException, HttpException, Injectable, InternalServerErrorException} from "@nestjs/common";
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
        try{
            const existingAdmin = await this.adminModel.findOne({email: crateAdminDto.email})
            if (existingAdmin) throw new ConflictException('Admin already exists')

            const hashed = await bcrypt.hash(crateAdminDto.password,10)
            const newAdmin = new this.adminModel({
                ...crateAdminDto,
                password:hashed
            })

            return await newAdmin.save()

        }catch (err){
            if (err instanceof HttpException) throw err
            throw new InternalServerErrorException(`Failed to register ${err.message}`)
        }
    }

    async validateAdmin(email: string, password: string) {
        const findAdmin = await this.adminModel.findOne({ email })
        if (!findAdmin) throw new HttpException('Admin not found', 404)

        const isMatch = await bcrypt.compare(password, findAdmin.password)
        if (!isMatch) throw new HttpException('Wrong Password', 400)

        return findAdmin
    }

    async login(adminDto: AdminDto) {
        try {
            const admin = await this.validateAdmin(adminDto.email, adminDto.password)

            const payload = {
                id: admin._id,
                email: admin.email
            }
            return this.jwtService.sign(payload)

        }catch (err) {
            if(err instanceof HttpException) throw err
            throw new InternalServerErrorException(`Failed to login ${err.message}`)
        }
    }
}