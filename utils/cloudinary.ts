import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

export const cloudinaryUpload = (file, folderName) => cloudinary.uploader.upload(file, {folder: folderName});
export const cloudinaryDelete = async (id) => await cloudinary.uploader.destroy(id);