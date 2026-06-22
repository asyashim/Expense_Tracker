import express from "express";
import { registerUser,showRegisterPage,showLoginPage,loginUser } from "../controllers/authController.js";

const router = express.Router();

//registration routes
router.get("/register",showRegisterPage);
router.post("/register",registerUser)

//login routes
router.get("/login", showLoginPage);
router.post("/login", loginUser);

export default router;