import {Body, Controller, Post, Get, Param, UseGuards} from "@nestjs/common";
import {UsersServices} from "./users.services";
import {UserDto} from "./Dto/user.dto";
import {AuthGuard} from "@nestjs/passport";

@Controller('/users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(private usersService:UsersServices) {
    }

    @Post('/register')
    createUser(@Body() userDto:UserDto){
        return this.usersService.createUser(userDto)
    }

    @Get()
    getAllUsers(){
        return this.usersService.getAllUsers()
    }

    @Get('/company/:id')
    getUserPerCompany(@Param('id') id: string) {
        return this.usersService.getUsersPerCompany(id);
    }
}