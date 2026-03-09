import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Company, CompanySchema} from "../schemas/Company.schema";
import {CompaniesService} from "./companies.service";
import {CompaniesController} from "./companies.controller";
import {UsersModule} from "../users/users.module";
import {DevicesModules} from "../devices/devices.modules";

@Module({
    imports:[
        MongooseModule.forFeature([{
            name:Company.name,
            schema:CompanySchema
        },
        ]),
        UsersModule,
        DevicesModules
    ],
    providers:[CompaniesService],
    controllers:[CompaniesController]
})

export class CompaniesModule{

}