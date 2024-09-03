import express from "express";
import { addVideo, addView, deleteVideo, getVideo, randomVideos, searchByTags, searchByTitle, subscribedVideos, trendingVideos, updateVideo } from "../controllers/video.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();


router.post("/", verifyToken, addVideo);

router.delete("/:id", verifyToken, deleteVideo);

router.put("/:id", verifyToken, updateVideo);

router.get("/find/:id", getVideo);

router.put("/view/:id", addView);

router.get("/random", randomVideos);

router.get("/trends", trendingVideos);

router.get("/sub", verifyToken, subscribedVideos);

router.get("/tags", searchByTags);

router.get("/search", searchByTitle);

export default router;