import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import * as env from '../environments/environment';
import { JwtStrategy } from './strategies/jwt-strategy';
import { EmployeeModule } from 'src/employee/employee.module';
import { AuthController } from './auth.controller';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [
    TaskModule,
    EmployeeModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: env.environment.jwtSecret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
