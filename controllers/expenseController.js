import Transaction from "../models/Transaction.js";

// show add expense form
export const showAddExpensePage = (req, res) => {
    res.render("addExpense");
};

// add expense
export const addExpense = async (req, res) => {
    const { title, amount, type, category, date } = req.body;

    try {
        await Transaction.create({
            title,
            amount,
            type,
            category,
            date: date || Date.now(),
            userId: req.session.userId,
        });

        req.flash("success", "Transaction added successfully!");
        res.redirect("/dashboard");

    } catch (error) {
        console.log(error);
        req.flash("error", "Failed to add transaction. Please try again.");
        res.redirect("/expense/add");
    }
};

// show edit expense form
export const showEditExpensePage = async (req, res) => {
    try {
        const expense = await Transaction.findOne({
            _id: req.params.id,
            userId: req.session.userId,
        });

        if (!expense) {
            req.flash("error", "Transaction not found.");
            return res.redirect("/dashboard");
        }

        res.render("editExpense", { expense });

    } catch (error) {
        console.log(error);
        req.flash("error", "Something went wrong.");
        res.redirect("/dashboard");
    }
};

// update expense
export const updateExpense = async (req, res) => {
    const { title, amount, type, category, date } = req.body;

    try {
        await Transaction.findOneAndUpdate(
            { _id: req.params.id, userId: req.session.userId },
            { title, amount, type, category, date },
            { new: true }
        );

        req.flash("success", "Transaction updated successfully!");
        res.redirect("/dashboard");

    } catch (error) {
        console.log(error);
        req.flash("error", "Failed to update transaction.");
        res.redirect("/dashboard");
    }
};

// delete expense
export const deleteExpense = async (req, res) => {
    try {
        await Transaction.findOneAndDelete({
            _id: req.params.id,
            userId: req.session.userId,
        });

        req.flash("success", "Transaction deleted successfully!");
        res.redirect("/dashboard");

    } catch (error) {
        console.log(error);
        req.flash("error", "Failed to delete transaction.");
        res.redirect("/dashboard");
    }
};
