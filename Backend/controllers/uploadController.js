import path from 'path';
import multer from 'multer';

const postStorage = multer.memoryStorage();

const userStorage = multer.memoryStorage();

const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
};

export const postUpload = multer({
  storage: postStorage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

export const userUpload = multer({
  storage: userStorage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});
