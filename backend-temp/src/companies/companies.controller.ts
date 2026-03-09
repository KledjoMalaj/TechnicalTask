import {Body, Controller, Delete, Get, Param, Post, UseGuards} from "@nestjs/common";
import {CompaniesService} from "./companies.service";
import {CompanyDto} from "./Dto/company.dto";
import {AuthGuard} from "@nestjs/passport";
import {retry} from "rxjs";

@Controller('/companies')
@UseGuards(AuthGuard('jwt'))
export class CompaniesController {
    constructor(private companyService:CompaniesService) {}

    @Post('/register')
    createCompany(@Body() company:CompanyDto){
        return this.companyService.createCompany(company)
    }

    @Get()
    getAllCompanies(){
        return this.companyService.getAllCompanies()
    }

    @Delete("/:id")
    deleteCompany(@Param('id')id:string){
        return this.companyService.deleteCompany(id)
    }

    @Get('/stats/:id')
    getStats(@Param('id')id:string){
        return this.companyService.getCompanyStats(id)
    }

    @Get('/homeStats')
    getHomeStats(){
        return this.companyService.getHomePageStats()
    }
}