import {AdminsService} from "./admins.service";
import {Body, Controller, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe} from "@nestjs/common";
import {AdminDto} from "./Dto/admin.dto";
import {AuthGuard} from "@nestjs/passport";
import express from "express";

@Controller('/admin')
export class AdminsController {
    constructor(private adminService: AdminsService) {
    }

    @Post('/register')
    @UsePipes(new ValidationPipe())
    createAdmin(@Body() crateAdminDto: AdminDto) {
        return this.adminService.createAdmin(crateAdminDto)
    }

    @Post('/login')
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard('local'))
    login(@Body() adminDto: AdminDto) {
        return this.adminService.login(adminDto)
    }

    @Get('/me')
    @UseGuards(AuthGuard('jwt'))
    getAdmin(@Req() req: express.Request ){
        return req.user
    }

}