import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../schemas/User.schema";
import {Model, Types} from "mongoose";
import {UserDto} from "./Dto/user.dto";

@Injectable()
export class UsersServices {
    constructor(@InjectModel(User.name) private userModel:Model<User>) {}

    createUser(userDto:UserDto){
        const newUser = new this.userModel(userDto)
        return newUser.save()
    }

    getUsersPerCompany(id:string){
        const users = this.userModel.find({companyId:id})
        return users
    }

    getAllUsers(){
        return this.userModel.find()
    }
}