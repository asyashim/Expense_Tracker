import User from "../models/User.js";

export const dashboard = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        res.render("dashboard", { name: user.name });
    } catch (error) {
        console.log(error);
        res.redirect("/login");
    }
};