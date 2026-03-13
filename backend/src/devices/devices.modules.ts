import {forwardRef, Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Device, DeviceSchema} from "../schemas/Device.schema";
import {DevicesService} from "./devices.service";
import {DevicesController} from "./devices.controller";
import {CompaniesModule} from "../companies/companies.module";

@Module({
    imports:[
        MongooseModule.forFeature([{
            name : Device.name,
            schema: DeviceSchema
        }]),
        forwardRef(()=> CompaniesModule)
    ],
    providers:[DevicesService],
    controllers:[DevicesController],
    exports:[MongooseModule]
})

export class DevicesModules {

}