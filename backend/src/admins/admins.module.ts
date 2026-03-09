import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Admin, AdminSchema} from "../schemas/Admin.schema";
import {AdminsService} from "./admins.service";
import {AdminsController} from "./admins.controller";
import {JwtModule} from "@nestjs/jwt";
import {LocalStrategy} from "../strategies/local.strategy";
import {JwtStrategy} from "../strategies/jwt.strategy";

@Module({
    imports : [
        MongooseModule.forFeature([{
                name:Admin.name,
                schema: AdminSchema
            }
        ]),
        JwtModule.register({
                secret:'hahahahaha',
                signOptions:{expiresIn:'1h'}
            }
        ),
    ],
    providers:[AdminsService,LocalStrategy,JwtStrategy],
    controllers:[AdminsController]
})

export class AdminsModule {

}