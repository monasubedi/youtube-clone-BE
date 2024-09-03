import express from "express";
import { signin, signinWithGoogle, signup } from "../controllers/auth.js";

const router = express.Router();


//create a user
router.post("/signup", signup);

//sign in
router.post("/signin", signin);


//google authentication
router.post("/google", signinWithGoogle);


export default router;