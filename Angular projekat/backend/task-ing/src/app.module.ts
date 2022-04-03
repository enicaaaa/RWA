import { Module } from '@nestjs/common';
//import { EmployeeModule } from './employee/employee.module';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as env from './environments/environment';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    //EmployeeModule,
    TaskModule,
    MongooseModule.forRoot(env.environment.dbURL),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
