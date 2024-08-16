import User from "../models/user.js";
import { createError } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body
                }, { new: true });
            res.status(200).json(updatedUser);

        } catch (error) {
            next(error);
        }
    }
    else {
        return next(createError(403, "You can only update your account."))
    }

}

export const deleteUser = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("User has been deleted.");

        } catch (error) {
            next(error);
        }
    }
    else {
        return next(createError(403, "You can only delete your account."))
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            return res.status(200).send(user);
        }
        else {
            return next(createError(404, "Cannot find the user with this id."))
        }
    } catch (error) {
        next(error);
    }
}


export const subscribe = async (req, res, next) => {
    const { id } = req.params;
    try {
        await User.findByIdAndUpdate(req.user.id, { $push: { subscribedUsers: id } });
        await User.findById(id, { $inc: { subscribers: 1 } });
        res.status(200).send("Subscription successful.")
    } catch (error) {
        next(error);
    }
}

export const unsubscribe = async () => {
    const { id } = req.params;
    try {
        await User.findByIdAndUpdate(req.user.id, { $pull: { subscribedUsers: id } });
        await User.findById(id, { $inc: { subscribers: -1 } });
        res.status(200).send("unsubscription successful.");
    } catch (error) {
        next(error);
    }
}

export const likeVideo = async () => {
    try {

    } catch (error) {
        next(error);
    }
}

export const dislikeVideo = async () => {
    try {

    } catch (error) {
        next(error);
    }
}