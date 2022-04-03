import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  UseGuards,
  Req,
  Headers,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TaskService } from './task.service';

@Controller('api/tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('hello')
  async getHello(@Req() req) {
    return 'radi radi radi JWT passport auth';
  }

  //@UseGuards(JwtAuthGuard)
  @Post()
  async addTask(
    @Req() req,
    @Body('title') tTitle: string,
    @Body('description') tDescription: string,
    @Body('storyPoints') tStoryPoints: number,
    @Body('assignee') tAssignee: string,
    @Body('reporter') tReporter: string,
    @Body('priority') tPriority: string,
    @Body('type') tType: string,
    @Body('tag') tTag: string,
    @Body('comment') tComment: string,
  ) {
    const generated = await this.taskService.addTask(
      tTitle,
      tDescription,
      tStoryPoints,
      tAssignee,
      tReporter,
      tPriority,
      tType,
      tTag,
      tComment,
    );
    return generated;
  }

  //@UseGuards(JwtAuthGuard)
  @Get()
  async getAllTasks(@Req() req) {
    const tasks = this.taskService.getAllUserTasks();
    return tasks;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getSingleTask(@Req() req, @Param('id') taskId: string) {
    return this.taskService.getSingleTask(taskId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('tag/:tag')
  getTasksByTag(@Req() req, @Param('tag') tag: string) {
    return this.taskService.getTasksByTag(tag);
  }

  //@UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateTask(
    @Headers('Authorization') auth: string,
    @Req() req,
    @Param('id') taskId: string,
    @Body('title') tTitle: string,
    @Body('username') username: string,
    @Body('description') tDescription: string,
    @Body('storyPoints') tStoryPoints: number,
    @Body('assignee') tAssignee: string,
    @Body('reporter') tReporter: string,
    @Body('priority') tPriority: string,
    @Body('type') tType: string,
    @Body('tag') tTag: string,
    @Body('comment') tComment: string,
  ) {
    await this.taskService.updateTask(
      taskId,
      tTitle,
      username,
      tDescription,
      tStoryPoints,
      tAssignee,
      tReporter,
      tPriority,
      tType,
      tTag,
      tComment,
    );
    return null;
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeTask(@Req() req, @Param('id') taskId: string) {
    await this.taskService.removeTask(taskId);
    return { taskId: taskId };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async rejectTask(
    @Req() req,
    @Param('id') taskId: string,
    @Body('comment') comment: string,
    @Body('tagOld') tagTestable: string,
    @Body('tagNew') tagToDo: string,
  ) {
    await this.taskService.rejectTask(taskId, comment, tagTestable, tagToDo);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async addToDone(
    @Req() req,
    @Param('id') taskId: string,
    @Body('tag') tag: string,
  ) {
    await this.taskService.addToDone(taskId, tag);
    return null;
  }
}
