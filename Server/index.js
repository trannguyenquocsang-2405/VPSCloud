import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';


// Routes
const app = express();


// to serve images for public (public folder)
app.use(express.static('public'));
app.use('/images', express.static('images'));


// MiddleWare
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

dotenv.config();

// Thay thế đoạn kết nối gốc bằng phiên bản này để có retry tự động
mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Thêm các tùy chọn kết nối lại
    serverSelectionTimeoutMS: 5000, // Cố gắng chọn server trong 5s (mặc định 30s)
    socketTimeoutMS: 45000,        // Timeout socket sau 45s
    // Các tùy chọn retry (Mongoose v5+ tự xử lý, nhưng đây là cách set)
    // retryWrites: true,
    // keepAlive: true 
}).then(() =>
    app.listen(process.env.PORT, () => console.log(`🚀 Server listening at ${process.env.PORT}`))
).catch((error) => {
    // Quan trọng: In ra lỗi chi tiết để debug
    console.error('❌ mongoDB connection failed:', error);
    process.exit(1); // Buộc backend container dừng lại nếu thất bại
});


// uses of routes

app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload', UploadRoute);