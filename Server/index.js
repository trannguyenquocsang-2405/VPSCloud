import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

// Import routes (giả sử các file Routes/*.js đã tồn tại; nếu chưa, tạo cơ bản như hướng dẫn trước)
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';

// Tạo app
const app = express();

// Serve static files (public và images folder)
app.use(express.static('public'));
app.use('/images', express.static('images'));

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Config từ env (Docker truyền MONGO_URI và PORT)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/mydb';
const PORT = process.env.PORT || 8080;

// Kết nối MongoDB
mongoose.connect(MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => {
    console.log(`✅ Connected to MongoDB at ${MONGO_URI}`);
    
    // Đăng ký routes sau khi connect (tốt hơn để tránh lỗi nếu routes cần DB)
    app.use('/auth', AuthRoute);
    app.use('/user', UserRoute);
    app.use('/post', PostRoute);
    app.use('/upload', UploadRoute);
    
    // Root route test (optional, để check server OK)
    app.get('/', (req, res) => {
      res.send('Social Media Backend API is running! 🚀');
    });
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  });