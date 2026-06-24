import express from "express";
import { registerUser,showRegisterPage,showLoginPage,loginUser,logout } from "../controllers/authController.js";
import { isLoggedIn } from "../middlewares/authMiddlewares.js";
import { noCache } from "../middlewares/cacheMiddleware.js";
import { dashboard } from "../controllers/dashboardController.js";


const router = express.Router();

//registration routes
router.get("/register",showRegisterPage);
router.post("/register",registerUser)


//login routes
router.get("/login", showLoginPage);
router.post("/login", loginUser);
router.get("/dashboard",noCache,isLoggedIn,dashboard)
router.post("/logout",logout)

export default router;