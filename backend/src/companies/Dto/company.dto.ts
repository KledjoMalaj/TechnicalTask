import {IsNotEmpty, IsString} from "class-validator";

export class CompanyDto {
    @IsNotEmpty()
    @IsString()
    name:string
}