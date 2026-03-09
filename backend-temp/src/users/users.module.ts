import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../schemas/User.schema";
import {UsersServices} from "./users.services";
import {UsersController} from "./users.controller";

@Module({
    imports:[
        MongooseModule.forFeature([{
           name:User.name,
            schema:UserSchema
        }
        ])
    ],
    providers:[UsersServices],
    controllers:[UsersController],
    exports:[MongooseModule]
})

export class UsersModule {

}