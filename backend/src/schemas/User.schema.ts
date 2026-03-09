import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Types} from "mongoose";
import {Company} from "./Company.schema";

@Schema({timestamps:true})
export class User{
    @Prop({required:true})
    name:string
    @Prop({required:true,unique:true})
    email:string
    @Prop({required:true,ref:Company.name})
    companyId:Types.ObjectId
}

export const UserSchema = SchemaFactory.createForClass(User)