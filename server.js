import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import hbs from "hbs";
import dotenv from "dotenv";
import session from "express-session";
import { noCache } from "./middlewares/cacheMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// view engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views/partials"));

// static files
app.use(express.static(path.join(__dirname, "public")));

// session (must be before routes)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    },
  })
);

// cache middleware
app.use(noCache);

// routes
app.use("/", authRoutes);

// home route
app.get("/", (req, res) => {
  res.render("login");
});

// server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});