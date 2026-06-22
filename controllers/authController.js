export const showRegisterPage = (req, res) => {
    res.render("register");
};

export const registerUser = (req, res) => {
    const { name, email, password } = req.body;

    console.log("User registration data:", { name, email, password });

    // redirect to login page with message
    res.render("login", { message: "User registered successfully. Please log in." });
};

export const showLoginPage = (req, res) => {
    res.render("login");
};

export const loginUser = (req, res) => {
    const { email, password } = req.body;

    console.log("User login data:", { email, password });

    res.send("User logged in successfully");
};