/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  username: { type: String, required: false },
  title: { type: String, required: true },
  description: { type: String, required: true },
  storyPoints: { type: Number, required: true },
  assignee: { type: String, required: true },
  reporter: { type: String, required: true },
  priority: { type: String, required: true },
  type: { type: String, required: true },
  tag: { type: String, required: true },
  comment: { type: String, required: false },
});

export interface Task extends mongoose.Document {
  id: string;
  username: string;
  title: string;
  description: string;
  storyPoints: number;
  assignee: string;
  reporter: string;
  priority: string;
  type: string;
  tag: string;
  comment: string;
}
