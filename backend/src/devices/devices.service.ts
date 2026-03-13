import {
    ConflictException,
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Device} from "../schemas/Device.schema";
import {Model} from "mongoose";
import {DeviceDto} from "./Dto/device.dto";
import {Company} from "../schemas/Company.schema";

@Injectable()
export class DevicesService {
    constructor(@InjectModel(Device.name) private deviceModel:Model<Device>,
                @InjectModel(Company.name) private companyModel:Model<Company>) {
    }

    async createDevice(device:DeviceDto){
        try{
            const newDevice = new this.deviceModel(device)
            const exists = await this.deviceModel.findOne({serialNumber:device.serialNumber})
            if(exists) throw new ConflictException('Device with this serial number exists')
            return newDevice.save()
        }catch (err){
            if(err instanceof HttpException) throw err
            throw new InternalServerErrorException(`Failed to add device ${err}`)
        }
    }

    getAllDevices(){
        return this.deviceModel.find()
    }

    async getDevicesPerCompany(id:string){
        const exists = await this.companyModel.findById(id)
        if (!exists) throw new NotFoundException('Company not found')

        const devices = await this.deviceModel.find({companyId:id})
        return devices
    }

    async updateDevice(id: string, isAuthorized: boolean) {
        const updatedDevice = await this.deviceModel.findByIdAndUpdate(id, { isAuthorized }, { returnDocument: 'after' });
        if (!updatedDevice) {
            throw new NotFoundException('Device not found');
        }
        return updatedDevice;
    }
}