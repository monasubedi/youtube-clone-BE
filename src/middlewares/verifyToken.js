import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) next(createError(401, "You are not authenticated"));

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) next(createError(403, "Token is not valid."));
        req.user = user;
        next();
    })

}