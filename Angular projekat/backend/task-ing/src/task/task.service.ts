import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.model';
import { EmployeeService } from 'src/employee/employee.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly TaskModel: Model<Task>,
    private readonly employeeService: EmployeeService,
  ) {}

  async addTask(
    title: string,
    description: string,
    storyPoints: number,
    assignee: string,
    reporter: string,
    priority: string,
    type: string,
    tag: string,
    comment: string,
  ) {
    const newTask = new this.TaskModel({
      title,
      description,
      storyPoints,
      assignee,
      reporter,
      priority,
      type,
      tag,
      comment,
    });
    await newTask.save();
    console.log(newTask);
    return {
      id: newTask._id,
      title: newTask.title,
      description: newTask.description,
      storyPoints: newTask.storyPoints,
      reporter: newTask.reporter,
      assignee: newTask.assignee,
      priority: newTask.priority,
      type: newTask.type,
      tag: newTask.tag,
      comment: newTask.comment,
    };
  }

  async getAllUserTasks() {
    const tasks = await this.TaskModel.find().exec();
    return tasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      storyPoints: task.storyPoints,
      assignee: task.assignee,
      reporter: task.reporter,
      priority: task.priority,
      type: task.type,
      tag: task.tag,
      comment: task.comment,
    }));
  }

  async getTasksByTag(tag: string) {
    const tasks = await this.findTaskByTag(tag);
    return tasks;
  }

  async getSingleTask(taskId: string) {
    const task = await this.findTask(taskId);
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      storyPoints: task.storyPoints,
      assignee: task.assignee,
      reporter: task.reporter,
      priority: task.priority,
      type: task.type,
      tag: task.tag,
      comment: task.comment,
    };
  }

  async updateTask(
    taskId: string,
    title: string,
    username: string,
    description: string,
    storyPoints: number,
    assignee: string,
    reporter: string,
    priority: string,
    type: string,
    tag: string,
    comment: string,
  ) {
    const updatedTask = await this.findTask(taskId);

    if (title) updatedTask.title = title;
    if (description) updatedTask.description = description;
    if (storyPoints) updatedTask.storyPoints = storyPoints;
    if (assignee) updatedTask.assignee = assignee;
    if (reporter) updatedTask.reporter = reporter;
    if (priority) updatedTask.priority = priority;
    if (type) updatedTask.type = type;
    if (tag) updatedTask.tag = tag;
    if (comment) updatedTask.comment = comment;
    await updatedTask.save();
    return null;
  }

  async findTask(id: string): Promise<Task> {
    let task;
    try {
      task = await this.TaskModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find task.');
    }
    if (!task) throw new NotFoundException('Could not find task.');
    return task;
  }

  async findTaskByTag(tag: string): Promise<Task[]> {
    const tasks = [];
    let i = 0;
    try {
      await this.TaskModel.find({ tag: tag }, function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log('Tasks with that tag: ', docs);
          tasks[i++] = docs;
        }
      }).exec();
    } catch (error) {
      throw new NotFoundException('Could not find task with that tag.');
    }
    if (!tasks)
      throw new NotFoundException('Could not find tasks with that tag.');
    return tasks;
  }

  async removeTask(taskId: string) {
    // const result = await this.TaskModel.deleteOne({ _id: taskId }).exec();
    // if (result.n === 0) throw new NotFoundException('Could not find task.');
    const t = await this.findTask(taskId);
    await t.deleteOne();
    return taskId;
  }

  async rejectTask(
    taskId: string,
    comment: string,
    tagTestable: string,
    tagToDo: string,
  ) {
    const rejectedTask = await this.findTask(taskId);
    if (comment) rejectedTask.comment = comment;
    if (tagToDo) rejectedTask.tag = tagToDo;
    await rejectedTask.save();
  }

  async addToDone(taskId: string, tag: string) {
    const doneTask = await this.findTask(taskId);
    if (tag) doneTask.tag = tag;
    await doneTask.save();
    return null;
  }

  private MapToTask(oldTask: Task): any {
    return {
      taskId: oldTask.id,
      username: oldTask.username,
      title: oldTask.title,
      description: oldTask.description,
      storyPoints: oldTask.storyPoints,
      assignee: oldTask.assignee,
      reporter: oldTask.reporter,
      priority: oldTask.priority,
      type: oldTask.type,
      tag: oldTask.tag,
      comment: oldTask.comment,
    };
  }
}
