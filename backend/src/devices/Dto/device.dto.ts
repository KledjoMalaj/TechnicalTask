import {Types} from "mongoose";
import {IsNotEmpty, IsString} from "class-validator";

export class DeviceDto {
    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsString()
    serialNumber:string

    @IsNotEmpty()
    companyId:Types.ObjectId
}