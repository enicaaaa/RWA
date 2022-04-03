/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const EmployeeSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cover: { type: String, required: true },
  position: { type: String, required: true },
  experience: { type: String, required: true },
});

export interface Employee extends mongoose.Document {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  cover: string;
  position: string;
  experience: string;
}
