const multer = require('multer');
const path = require('path');

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'temp', 'uploads'),
  storage: multer.diskStorage({
    destination: (request, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'temp', 'uploads'));
    },
    filename: (request, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;

      cb(null, filename);
    },
  }),
  fileFilter: (request, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/jpg'
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Tipo de arquivo inválido!"));
    }
  },
};