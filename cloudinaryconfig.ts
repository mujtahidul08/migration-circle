import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Nama cloud Anda
  api_key: process.env.CLOUDINARY_API_KEY,       // API Key Anda
  api_secret: process.env.CLOUDINARY_API_SECRET, // API Secret Anda
});

export default cloudinary;