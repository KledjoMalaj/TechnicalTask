import {
    ConflictException,
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../schemas/User.schema";
import {Model, Types} from "mongoose";
import {UserDto} from "./Dto/user.dto";
import {Company} from "../schemas/Company.schema";

@Injectable()
export class UsersServices {
    constructor(@InjectModel(User.name) private userModel:Model<User>,
                @InjectModel(Company.name) private companyModel:Model<Company>) {}

    async createUser(userDto:UserDto){
        try{
            const newUser = new this.userModel(userDto)
            const exists = await this.userModel.findOne({email:userDto.email})
            if (exists) throw new ConflictException('User with this email already exists')
            return newUser.save()
        }catch (err){
            if (err instanceof HttpException) throw err
            throw new InternalServerErrorException(`Failed to register user ${err.message}`)
        }
    }

    async getUsersPerCompany(id:string){
        const exists = await this.companyModel.findById(id)
        if (!exists) throw new NotFoundException('Company not found')

        const users = await this.userModel.find({companyId:id})
        return users
    }

    getAllUsers(){
        return this.userModel.find()
    }
}