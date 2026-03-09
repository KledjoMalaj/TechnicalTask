import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Device} from "../schemas/Device.schema";
import {Model} from "mongoose";
import {DeviceDto} from "./Dto/device.dto";

@Injectable()
export class DevicesService {
    constructor(@InjectModel(Device.name) private deviceModel:Model<Device>) {
    }

    createDevice(device:DeviceDto){
        const newDevice = new this.deviceModel(device)
        return newDevice.save()
    }

    getAllDevices(){
        return this.deviceModel.find()
    }

    getDevicesPerCompany(id:string){
        const devices = this.deviceModel.find({companyId:id})
        return devices
    }

    updateDevice(id:string,isAuthorized:boolean){
        return this.deviceModel.findByIdAndUpdate(id,{isAuthorized},{returnDocument: 'after'})
    }
}