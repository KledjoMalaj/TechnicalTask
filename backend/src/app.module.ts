import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {AdminsModule} from "./admins/admins.module";
import {JwtModule} from "@nestjs/jwt";
import {CompaniesModule} from "./companies/companies.module";
import {UsersModule} from "./users/users.module";
import {DevicesModules} from "./devices/devices.modules";

@Module({
  imports: [
      MongooseModule.forRoot('mongodb://localhost/deviceManagement'),
      AdminsModule,
      CompaniesModule,
      UsersModule,
      DevicesModules
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
