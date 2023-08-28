import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export function uploadFileMiddleware(req, res, next) {
    upload.single('movies')(req, res, (error) => {
        if (error) {
            return res.status(400).json({ success: false, message: 'File upload failed' });
        }
        next();
    });
}
