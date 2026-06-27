import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import hbs from "hbs";
import dotenv from "dotenv";
import session from "express-session";
import flash from "connect-flash";
import { noCache } from "./middlewares/cacheMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
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

// handlebars helpers
hbs.registerHelper("eq", (a, b) => a === b);

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

// flash messages (must be after session)
app.use(flash());

// make flash messages available in all views
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// routes
app.use("/", authRoutes);
app.use("/expense", expenseRoutes);

// home route
app.get("/", (req, res) => {
  res.render("login");
});

// server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});