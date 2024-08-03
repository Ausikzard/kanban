const multer = require('multer');
const path = require('path');

// 设置 Multer 存储配置
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // 文件存储路径
  },
  filename: (req, file, cb) => {
    // 为文件命名，确保文件名唯一性
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  // 限制文件类型，例如只允许图片
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 限制文件大小为5MB
  },
});

module.exports = upload;