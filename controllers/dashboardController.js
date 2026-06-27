import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const dashboard = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);

        const expenses = await Transaction.find({ userId: req.session.userId }).sort({ date: -1 });

        const totalIncome = expenses
            .filter(t => t.type === "income")
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpense = expenses
            .filter(t => t.type === "expense")
            .reduce((sum, t) => sum + t.amount, 0);

        const balance = totalIncome - totalExpense;

        res.render("dashboard", {
            name: user.userName,
            expenses,
            totalIncome,
            totalExpense,
            balance,
        });

    } catch (error) {
        console.log(error);
        res.redirect("/login");
    }
};
