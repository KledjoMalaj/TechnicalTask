import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema({timestamps:true})
export class Admin{
    @Prop({unique:true,required:true})
    email: string

    @Prop({required:true})
    password:string
}
export const AdminSchema = SchemaFactory.createForClass(Admin)