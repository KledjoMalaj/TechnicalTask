import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {AdminsService} from "../admins/admins.service";
import {Strategy} from "passport-local";
import {AdminDto} from "../admins/Dto/admin.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private adminsService: AdminsService) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string) {
        const admin = await this.adminsService.validateAdmin(email, password)
        if (!admin) throw new UnauthorizedException()
        return admin
    }
}