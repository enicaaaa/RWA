/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import { Employee } from 'src/employee/employee.model';
import { Promise } from 'mongoose';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request): Promise<{ access_token: string; }> {//ako ovo proraddi da ti ne vraca access token
    return await this.authService.login(req.user as Employee);
  }

  @UseGuards(LocalAuthGuard)
  @Get("isLoggedIn")
  async isLoggedIn(@Req() req: Request)  /*Promise<boolean>*/{
    // if(await this.authService.login(req.user as Employee)){
    //   return true;
    // }else{
    //   return false;
    //this.authService.verifyToken({acces_token: req.access_token})
    console.log("Ghghghcbxzcfdg")
    return req.user;
    }
  }

