import {Types} from "mongoose";
import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class UserDto{
    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    companyId:Types.ObjectId
}