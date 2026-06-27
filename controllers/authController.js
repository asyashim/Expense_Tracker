import User from "../models/User.js";

// register page
export const showRegisterPage = (req, res) => {
    res.render("register");
};

// register user
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            req.flash("error", "User already exists with this email.");
            return res.redirect("/register");
        }

        await User.create({ userName: name, email, password });

        req.flash("success", "Registered successfully! Please log in.");
        res.redirect("/login");

    } catch (error) {
        console.log(error);
        req.flash("error", "Something went wrong. Please try again.");
        res.redirect("/register");
    }
};

// login page
export const showLoginPage = (req, res) => {
    res.render("login");
};

// login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            req.flash("error", "Invalid email or password.");
            return res.redirect("/login");
        }

        req.session.userId = user._id;

        console.log("Login success, redirecting to dashboard...");
        res.redirect("/dashboard");

    } catch (error) {
        console.log(error);
        req.flash("error", "Server error. Please try again.");
        res.redirect("/login");
    }
};

// logout user
export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.redirect("/dashboard");
        }

        res.clearCookie("connect.sid", { path: "/" });
        return res.redirect("/login");
    });
};
