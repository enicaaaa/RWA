import { Body, Controller, Post, Patch, Get } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('api/employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('register')
  async register(
    @Body('firstname') firstname: string,
    @Body('lastname') lastname: string,
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('cover') cover: string,
    @Body('position') position: string,
    @Body('experience') experience: string,
  ) {
    const generatedId = await this.employeeService.registerEmployee(
      firstname,
      lastname,
      username,
      password,
      cover,
      position,
      experience,
    );
    return {
      message: 'Successful registration.',
      result: generatedId,
    };
  }

  @Patch('update-account')
  async updateAccount(
    @Body('username') username: string,
    @Body('oldpassword') oldPassword: string,
    @Body('newpassword') newPassword: string,
    @Body('newpasswordrepeat') newPasswordRepeat: string,
  ) {
    await this.employeeService.updateAccount(
      username,
      oldPassword,
      newPassword,
      newPasswordRepeat,
    );
    return {
      message: 'Successfull update.',
    };
  }
}
