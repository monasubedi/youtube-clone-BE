import Comment from "../models/comment.js";
import Video from "../models/video.js";
import { createError } from "../utils/error.js";

export const addComment = async (req, res, next) => {
    try {
        const newComment = new Comment({ userId: req.user.id, ...req.body });
        const savedComment = await newComment.save();
        res.status(200).send(savedComment);
    } catch (error) {
        next(error);
    }
}

export const deleteComment = async (req, res, next) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findById(id);
        const video = await Video.find({ videoId: comment.videoId });
        if (req.user.id === comment.userId || req.user.id === video.userId) {
            await Comment.findByIdAndDelete(id);
            return res.status(200).send("Successfully deleted the comment.");
        }
        else {
            return next(createError(403, "You can delete only your comment."))
        }
    } catch (error) {
        next(error);
    }
}

export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId });
        return res.status(200).send(comments);
    } catch (error) {
        next(error);
    }
}