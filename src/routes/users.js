import express from "express";
import { deleteUser, dislikeVideo, getUser, likeVideo, subscribe, updateUser } from "../controllers/user.js";

const router = express.Router();

//update user
router.put("/:id", updateUser);

//delete user
router.delete("/:id", deleteUser);

//get a user
router.get("/find/:id", getUser);

//subscribe a user
router.put("/subscribe/:id", subscribe);

//like a video
router.put("/like/:videoId", likeVideo);

//dislike a video
router.put("/dislike/:videoId", dislikeVideo);

export default router;