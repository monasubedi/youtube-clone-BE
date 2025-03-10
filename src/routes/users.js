import express from "express";
import { deleteUser, dislikeVideo, getUser, likeVideo, subscribe, unsubscribe, updateUser } from "../controllers/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

//update user
router.put("/:id", verifyToken, updateUser);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/find/:id", getUser);

//subscribe a user
router.put("/subscribe/:id", verifyToken, subscribe);

//unsubscribe a user
router.put("/unsubscribe/:id",verifyToken,unsubscribe);

//like a video
router.put("/like/:videoId", verifyToken, likeVideo);

//dislike a video
router.put("/dislike/:videoId", verifyToken, dislikeVideo);

export default router;