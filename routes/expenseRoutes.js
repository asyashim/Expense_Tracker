import express from "express";
import {
    showAddExpensePage,
    addExpense,
    showEditExpensePage,
    updateExpense,
    deleteExpense,
} from "../controllers/expenseController.js";
import { isLoggedIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// all expense routes are protected
router.get("/add", isLoggedIn, showAddExpensePage);
router.post("/add", isLoggedIn, addExpense);

router.get("/edit/:id", isLoggedIn, showEditExpensePage);
router.post("/edit/:id", isLoggedIn, updateExpense);

router.get("/delete/:id", isLoggedIn, deleteExpense);

export default router;
