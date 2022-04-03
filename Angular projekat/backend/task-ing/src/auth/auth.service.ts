/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EmployeeService } from 'src/employee/employee.service';
import { JwtService } from '@nestjs/jwt';
import * as env from '../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
  ) {}

  async validatEmployee(username: string, password: string): Promise<any> {
    const employee = await this.employeeService.findEmployee(username);

    if (employee && employee.password === password) {
      const { username, password, ...rest } = employee;
      return rest; //rest ce vratiti sve osim username-a i pass-a
    }
  }

  async login(employee: any) {
    const payload = {
      username: employee.username,
      lastName: employee.lastName,
      position: employee.position,
      experience: employee.experience,
      sub: employee.id,
    };
    const access_token = this.jwtService.sign(payload);
    console.log(access_token);
    return {
      access_token: access_token, //vraca token koji treba da stavim u local storage
      token_type: 'JWT',
      expires_in: '3600s',
    };
  }

  verifyToken(token: string) {
    const decoded = this.jwtService.verify(token, {
      secret: env.environment.jwtSecret,
    });
    console.log(decoded);
    // const employee = this.employeeService.findEmployee(decoded.username);
    // if (!employee)
    //   throw new NotFoundException('Could not find user from decoded token.');
    // return employee;
    if (!decoded) throw new UnauthorizedException('Unautorized!');
  }

  decode(auth: string): { uuid: string } {
    const jwt = auth.replace('Bearer ', '');
    return this.jwtService.decode(jwt, { json: true }) as { uuid: string };
  }

  verifyJWTToken(token) {
    return new Promise((resolve, reject) => {
      if (!token.startsWith('Bearer')) {
        // Reject if there is no Bearer in the token
        return reject('Token is invalid');
      }
      // Remove Bearer from string
      token = token.slice(7, token.length);
      this.jwtService.verify(token);
    });
  }

  jwtMiddleware(req, res, next) {
    // get token from headers object
    const token = req.get('Authorization');
    // check token
    if (!token) {
      res.status(401).send('Token is invalid');
    }
    this.verifyJWTToken(token)
      .then((user) => {
        // put user's information to req object
        req.user = user;
        // call next to finish this middleware function
        next();
      })
      .catch((err) => {
        res.status(401).send(err);
      });
  }
}
