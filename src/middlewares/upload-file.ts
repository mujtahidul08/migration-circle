import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now()+"-"+Math.round(Math.random()* 1e9)
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const fileFilter = ( 
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed') as any, false);
  }
};

const uploadMiddleware = multer({
  storage,
  fileFilter,
}).single('file');

export function upload(req: Request, res: Response, next: NextFunction) {
  uploadMiddleware(req, res, (err) => {
    if (err instanceof multer.MulterError || err) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }

    next();
  });
}