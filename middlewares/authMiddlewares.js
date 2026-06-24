export const isLoggedIn = (req, res, next) => {
    console.log("SESSION CHECK:", req.session);

    if (!req.session || !req.session.userId) {
        return res.redirect("/login");
    }

    next();
};