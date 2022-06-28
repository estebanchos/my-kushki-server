const mongoose = require('mongoose')
const UserModel = require('../models/Users')
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)

const createUser = async (req, res) => {
    const user = req.body
    const existingEmail = await UserModel.findOne({ email: user.email })
    if (existingEmail) {
        res.status(400).send("Sorry. A user with that email adress already exists")
    } else {
        const newUser = new UserModel(user)
        await newUser.save()
        res.status(201).json(user)
    }
}

const addExpenseItem = async (req, res) => {
    const { userEmail, item, category, amount } = req.body
    try {
        const currentUser = await UserModel.findOne({ email: userEmail })
        const newExpenseItem = {
            item,
            category,
            amount
        }
        currentUser.expenses.push(newExpenseItem)
        await currentUser.save()
        res.status(201).json(newExpenseItem)
    } catch (e) {
        res.status(400).json({ message: e })
    }
}

const getExpenses = async (req, res) => {
    const userEmail = req.body.userEmail
    try {
        const currentUser = await UserModel.findOne({ email: userEmail })
        const expenses = currentUser.expenses
        res.status(200).json(expenses)
    } catch (e) {
        res.status(400).json({ message: e })
    }
}

const addBudgetItem = async (req, res) => {
    const { userEmail, category, amount } = req.body
    try {
        const currentUser = await UserModel.findOne({ email: userEmail })
        const newBudgetItem = {
            category,
            amount
        }
        currentUser.budget.push(newBudgetItem)
        await currentUser.save()
        res.status(201).json(newBudgetItem)
    } catch (e) {
        res.status(400).json({ message: e })
    }
}

const getBudget = async (req, res) => {
    const userEmail = req.body.userEmail
    try {
        const currentUser = await UserModel.findOne({ email: userEmail })
        const budget = currentUser.budget
        res.status(200).json(budget)
    } catch (e) {
        res.status(400).json({ message: e })
    }
}

module.exports = {
    createUser,
    addExpenseItem,
    getExpenses,
    addBudgetItem,
    getBudget
}