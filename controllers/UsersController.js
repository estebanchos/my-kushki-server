const mongoose = require('mongoose')
const UserModel = require('../models/Users')
require('dotenv').config();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

mongoose.connect(process.env.MONGO_URL)

const createUser = async (req, res) => {
    const { name, email, password } = req.body
    const existingEmail = await UserModel.findOne({ email: email })
    if (existingEmail) {
        res.status(400).send("Sorry. A user with that email adress already exists")
    } else {
        const hashedPassword = bcrypt.hashSync(password, 8)
        const newUser = new UserModel({
            name: name,
            email: email,
            password: hashedPassword
        })
        await newUser.save()
        res.status(201).json({ successSignUp: true })
    }
}

const authenticateUser = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            message: 'Please enter the required fields',
            validLogin: false
        });
    }

    const userFound = await UserModel.findOne({ email: email })
    if (!userFound) {
        return res.status(400).json({
            message: 'Invalid user',
            validLogin: false
        })
    }

    const isPasswordCorrect = bcrypt.compareSync(password, userFound.password)
    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: 'Invalid password',
            validLogin: false
        });
    }

    const token = jwt.sign(
        { email: userFound.email },
        process.env.JWT_KEY
    )
    res.status(200).json({ token })
}

const addExpenseItem = async (req, res) => {
    const { item, category, amount } = req.body
    const userEmail = req.user.email
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
    const userEmail = req.user.email
    try {
        const currentUser = await UserModel.findOne({ email: userEmail })
        const expenses = currentUser.expenses
        res.status(200).json(expenses)
    } catch (e) {
        res.status(400).json({ message: e })
    }
}

const addBudgetItem = async (req, res) => {
    const { category, amount } = req.body
    const userEmail = req.user.email
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
    const userEmail = req.user.email
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
    authenticateUser,
    addExpenseItem,
    getExpenses,
    addBudgetItem,
    getBudget
}