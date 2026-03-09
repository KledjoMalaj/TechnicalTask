import {Body, Controller, Post, Get, Param, UseGuards} from "@nestjs/common";
import {DevicesService} from "./devices.service";
import {DeviceDto} from "./Dto/device.dto";
import {AuthGuard} from "@nestjs/passport";

@Controller('devices')
@UseGuards(AuthGuard('jwt'))
export class DevicesController{
    constructor(private deviceService:DevicesService) {
    }

    @Post('/register')
    createDevice(@Body()deviceDto:DeviceDto){
        return this.deviceService.createDevice(deviceDto)
    }

    @Get()
    getAllDevices(){
        return this.deviceService.getAllDevices()
    }

    @Get('/company/:id')
    getDevicesPerCompany(@Param('id')id:string){
        return this.deviceService.getDevicesPerCompany(id)
    }

    @Post('/authorize/:id')
    updateDevice(@Param('id')id:string,@Body('isAuthorized')isAuthorized:boolean){
        return this.deviceService.updateDevice(id,isAuthorized)
    }
}