import { Module } from '@nestjs/common';
import { TaskService } from '../task/task.service';
import { TaskController } from '../task/task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from '../task/task.model';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as env from '../environments/environment';
import { AuthService } from 'src/auth/auth.service';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
    PassportModule,
    JwtModule.register({
      secret: env.environment.jwtSecret,
      signOptions: { expiresIn: '1h' },
    }),
    EmployeeModule,
    TaskModule,
  ],
  controllers: [TaskController],
  providers: [AuthService, TaskService],
  exports: [TaskService],
})
export class TaskModule {}
