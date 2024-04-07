import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

// Image filter
const imageFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

export default upload;