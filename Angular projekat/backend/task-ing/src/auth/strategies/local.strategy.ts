/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Employee } from 'src/employee/employee.model';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ username: 'username' });
  }

  async validate(username: string, password: string): Promise<Employee> {
    const employee = await this.authService.validatEmployee(username, password);
    if (!employee) throw new UnauthorizedException();
    return employee;
  }
}
