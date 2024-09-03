import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Connected to DB"))
        .catch((e) => console.log(e))
}

const app = express();
const PORT = 8080 || process.env.PORT;

app.use(express.json());
// app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);


app.use((err, req, res, next) => {
    const status = err.staus || 500;
    const message = err.message || "Something went wrong.";
    return res.status(status).json({
        success: false,
        status,
        message
    })
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Listening on PORT:${PORT}`);

});