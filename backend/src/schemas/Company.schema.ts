import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema({timestamps:true})
export class Company{
    @Prop({unique:true,required:true})
    name:string
}

export const CompanySchema = SchemaFactory.createForClass(Company)