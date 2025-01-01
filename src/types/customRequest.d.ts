import { Request } from 'express';

export interface CustomRequest extends Request {
  files?: {
    [fieldname: string]: Express.Multer.File[];
  };
  user?: { id: string }; // Menyimpan data user yang terautentikasi
}