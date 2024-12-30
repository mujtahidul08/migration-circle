import multer from 'multer';
import { StorageEngine } from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';  


const storage: StorageEngine = new CloudinaryStorage({
  cloudinary: cloudinary, 
  params: {
    
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], 
    transformation: [{ width: 500, height: 500, crop: 'limit' }], 
  } as any,
});



const upload = multer({ storage });
export const uploadMultiple = upload.fields([
  { name: 'avatar', maxCount: 1 },  
  { name: 'coverPic', maxCount: 1 },  
]);
export default upload;

// import multer from 'multer';
// import { StorageEngine } from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import { v2 as cloudinary } from 'cloudinary'; // Correct import

// // Create Cloudinary storage engine
// const storage: StorageEngine = new CloudinaryStorage({
//   cloudinary: cloudinary, // Use cloudinary.v2 here
//   params: {
//     folder: 'your-folder', // Optional: Cloudinary folder where files will be stored
//     allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], // Optional: Allowed file formats
//     transformation: [{ width: 500, height: 500, crop: 'limit' }], // Optional: Image transformation
//   } as any,
// });

// // Initialize Multer with Cloudinary storage
// const upload = multer({ storage });

// export default upload;
//======================================
// import cloudinary from 'cloudinary';
// import { NextFunction, Request, Response } from 'express';

// export async function uploadToCloudinary(req: Request, res: Response, next: NextFunction) {
//   const file = req.file; // Pastikan file diterima

//   if (!file) {
//     return res.status(400).json({ message: 'No file uploaded' });
//   }

//   try {
//     const uploadResponse = await cloudinary.v2.uploader.upload(file.path, {
//       folder: 'circle-app',
//       allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'webm', 'avi'], // Batasi hanya format gambar dan video
//     });

//     req.body.fileUrl = uploadResponse.secure_url; // URL dari Cloudinary
//     next(); // Lanjutkan ke controller berikutnya
//   } catch (error) {
//     res.status(500).json({ message: 'Error uploading file to Cloudinary', error });
//   }
//}
//======================================
// import { Request, Response, NextFunction } from 'express';
// import cloudinary from '../../src/config/cloudinary'; // Pastikan path sesuai dengan lokasi file Anda

// export async function uploadToCloudinary(req: Request, res: Response, next: NextFunction) {
//   try {
//     const { file } = req.body; // Pastikan `file` adalah data base64 atau URL file

//     if (!file) {
//       return res.status(400).json({ message: 'No file provided' });
//     }

//     // Unggah file ke Cloudinary
//     const result = await cloudinary.uploader.upload(file, {
//       folder: 'your-folder-name', // Ubah sesuai kebutuhan
//     });

//     req.body.fileUrl = result.secure_url; // Simpan URL file ke `req.body`
//     next();
//   } catch (error: any) {
//     console.error('Error uploading to Cloudinary:', error.message);
//     res.status(500).json({ message: 'Failed to upload file to Cloudinary' });
//   }
// }

// import { NextFunction, Request, Response } from 'express';
// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, 'uploads'));
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now()+"-"+Math.round(Math.random()* 1e9)
//     cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
//   },
// });

// const fileFilter = ( 
//   req: Request,
//   file: Express.Multer.File,
//   cb: multer.FileFilterCallback,
// ) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed') as any, false);
//   }
// };

// const uploadMiddleware = multer({
//   storage,
//   fileFilter,
// }).single('file');

// export function upload(req: Request, res: Response, next: NextFunction) {
//   uploadMiddleware(req, res, (err) => {
//     if (err instanceof multer.MulterError || err) {
//       return res.status(400).json({ message: err.message });
//     } else if (err) {
//       return res.status(400).json({ message: err.message });
//     }

//     next();
//   });
// }

//====================================================
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from '../config/cloudinary';

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'myApp/uploads',
//     allowed_formats: ['jpg', 'png', 'jpeg', 'gif'], 
//   },
// });

// export const upload = multer({ storage });
