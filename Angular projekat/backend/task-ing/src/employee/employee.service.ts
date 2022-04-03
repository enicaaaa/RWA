import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './employee.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
  ) {}

  async registerEmployee(
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    cover: string,
    position: string,
    experience: string,
  ) {
    if (await this.findEmployee(username))
      throw new BadRequestException('Username Already Exists!');
    const hashPassword = await bcrypt.hash(password, 12);
    const newEmployee = new this.employeeModel({
      firstname,
      lastname,
      username,
      password: hashPassword,
      cover,
      position,
      experience,
    });
    const res = await newEmployee.save();
    return { id: res.id, username: res.username };
  }

  async loginUser(username: string, password: string) {
    const user = await this.findEmployee(username);
    if (!user) throw new BadRequestException('Invalid credentials.');
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    } //nedovrseno
  }

  async findEmployee(username: string): Promise<Employee> {
    return await this.employeeModel.findOne({ username: username }).exec();
  }

  async updateAccount(
    username: string,
    oldPassword: string,
    newPassword: string,
    newPasswordRepeat: string,
  ) {
    if (newPassword !== newPasswordRepeat)
      throw new BadRequestException("New passwords don't match");
    const employee = await this.findEmployee(username);
    if (!employee) throw new BadRequestException('Invalid credentials.');

    if (!(await bcrypt.compare(oldPassword, employee.password))) {
      throw new BadRequestException('Invalid credentials');
    }
    employee.password = await bcrypt.hash(newPassword, 12);

    await employee.save();
  }

  // autoLogin() {
  //   const data = JSON.parse(localStorage.getItem('access_token'));
  //   console.log(data.access_token);
  //   if (!data) return;
  //   else return data.access_token;
  // }
}
