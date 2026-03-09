import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Types} from "mongoose";
import {Company} from "./Company.schema";

@Schema({timestamps:true})
export class Device {
    @Prop({required:true})
    name:string

    @Prop({unique:true,required:true})
    serialNumber:string

    @Prop({default:false})
    isAuthorized:boolean

    @Prop({required:true,ref:Company.name})
    companyId:Types.ObjectId
}

export const DeviceSchema = SchemaFactory.createForClass(Device)

