import multer from 'multer';
import path from 'path'
/*
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(path.resolve(), 'public', 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
*/

const maxSize = 500 * 1024;
const storage = multer.memoryStorage();

const ALLOWED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

export const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if(ALLOWED_FORMATS.includes(file.mimetype)) {
            cb(null, true);
        } else cb(new Error('Not supported file type'), false)
    },
    limits: {
        fileSize: maxSize
    }
});