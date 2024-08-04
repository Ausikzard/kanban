const express = require('express');
const attachmentRouter = express.Router();
const upload = require('./upload'); // 引入上面创建的 Multer 中间件

// 文件上传路由
attachmentRouter.post('/upload', upload.single('attachment'), (req, res) => {
  // req.file 是上传的文件信息
  console.log(req);
  
  const { filename, path } = req.file;
  // 可以在这里添加将文件信息存储到数据库的逻辑

  res.status(201).json({
    message: 'File uploaded successfully',
    file: {
      filename,
      path, // 通常我们不会返回文件的完整路径，这里仅作为示例
    },
  });
});

module.exports = attachmentRouter;