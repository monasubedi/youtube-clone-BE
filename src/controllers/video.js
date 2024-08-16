import User from "../models/user.js";
import Video from "../models/video.js";
import { createError } from "../utils/error.js";

export const addVideo = async (req, res, next) => {
    try {
        const newVideo = new Video({ userId: req.user.id, ...req.body });
        const savedVideo = await newVideo.save();
        res.status(200).send(savedVideo);
    } catch (error) {
        next(error);
    }
}

export const updateVideo = async (req, res, next) => {
    const { id } = req.params;

    try {
        const video = await Video.findById(id);
        if (!video) return next(createError(404, "No video found with this id."));
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(id, { $set: req.body }, { new: true });
            res.status(200).send(updateVideo);
        }
        else {
            return next(createError(403, "You can only update your video."))
        }
    } catch (error) {
        next(error);
    }
}

export const deleteVideo = async (req, res, next) => {
    const { id } = req.params;

    try {
        const video = await Video.findById(id);
        if (!video) {
            return next(createError(404, "No video found with this id."));
        }
        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(id);
            res.status(200).send("Successfully deleted the video.");
        }
        else {
            return next(createError(403, "You can only delete your video."))
        }

    } catch (error) {
        next(error);
    }
}



export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return next(createError(404, "No video found with this id."));
        }
        res.status(200).send(video);
    } catch (error) {
        next(error);
    }
}

export const addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });

        res.status(200).send("The view has been increased.");
    } catch (error) {
        next(error);
    }
}

export const randomVideos = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos);
    } catch (error) {
        next(error);
    }
}

export const trendingVideos = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 });
        res.status(200).json(videos);
    } catch (error) {
        next(error);
    }
}


export const subscribedVideos = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers;
        const videosList = await Promise.all(subscribedChannels.map((channelId) => {
            return Video.find({ userId: channelId });
        }));
        res.status(200).json(videosList.flat().sort((a, b) => b.createdAt - a.createdAt));

    } catch (error) {
        next(error);
    }
}

export const searchByTags = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    try {
        const videos = await Video.find({ tags: { $in: tags } }).limit(20);
        res.status(200).send(videos);
    } catch (error) {
        next(error);
    }
}

export const searchByTitle = async (req, res, next) => {
    const query = req.query.q;
    try {
        const videos = await Video.find({ title: { $regex: query, $options: "i" } }).limit(40);
        res.status(200).send(videos);
    } catch (error) {
        next(error);
    }
}

