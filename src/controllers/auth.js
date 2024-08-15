import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hashedPassword });
        await newUser.save();
        return res.status(201).send("User has been created.");
    } catch (error) {
        console.log(error);
        next(error);

    }
}

export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ name: req.body.name });
        if (!user) return next(createError(404, "User not found!"));
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) return next(createError(400, "Wrong Credentials."));
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
        const { password, ...userDetails } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(userDetails);

    } catch (error) {
        next(error);
    }
}