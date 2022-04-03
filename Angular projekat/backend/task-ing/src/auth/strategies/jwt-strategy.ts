/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
//import { TaskService } from 'src/task/task.service';
import { EmployeeService } from 'src/employee/employee.service';
import * as env from '../../environments/environment';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly employeeService: EmployeeService,
  ) //private readonly taskService: TaskService,
  {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.environment.jwtSecret,
    });
  }

  async validate(payload: any) {
    //return this.userService.findUser(payload.username); //ZA USERE!!
    return { username: payload.username }; //RADIIIIIIIIIIIIIII
    //return this.taskService.findTask(payload.id);
  }
}
