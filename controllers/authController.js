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
            return res.render("register", {
                message: "User already exists"
            });
        }

        await User.create({ userName: name, email, password });

        res.render("login", {
            message: "User registered successfully. Please log in."
        });

    } catch (error) {
        console.log(error);
        res.render("register", { message: "Something went wrong" });
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
            return res.render("login", {
                message: "Invalid email or password"
            });
        }

        req.session.userId = user._id;

        console.log("Login success, redirecting to dashboard...");

        res.redirect("/dashboard");

    } catch (error) {
        console.log(error);
        res.render("login", {
            message: "Server error"
        });
    }
};

//logout user
export const logout = (req, res) => {
    req.session.userId = null;
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.redirect("/dashboard");
        }

        res.clearCookie("connect.sid", {
            path: "/"
        });

        return res.redirect("/login");
    });
};