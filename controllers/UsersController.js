const mongoose = require('mongoose')
const { findById } = require('../models/Users')
const UserModel = require('../models/Users')

mongoose.connect('mongodb+srv://estebanchos:V22Cf1wZoRVajBPx@cluster0.lrocg.mongodb.net/my-kushki?retryWrites=true&w=majority')

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
        const currentUser = await UserModel.find({ email: userEmail })
        const newExpenseItem = {
            item,
            category,
            amount
        }
        currentUser.expenses = [...expenses, newExpenseItem]
        console.log(currentUser.expenses)
        // await currentUser.save()
        res.status(201)
        // .json(newExpenseItem)
    } catch (e) {
        console.log(e.message)
    }
}

const getExpenses = async (req, res) => {
    const userEmail = req.body.email
    try {
        const currentUser = await UserModel.find({ email: userEmail })
        const budget = currentUser.budget
        res.status(200).json(budget)
    } catch (e) {
        console.log(e.message)
    }
}

const addBudgetItem = async (req, res) => {
    const { userEmail, category, amount } = req.body
    try {
        const currentUser = await UserModel.find({ email: userEmail })
        const newBudgetItem = {
            category,
            amount
        }
        currentUser.budget.push(newBudgetItem)
        await currentUser.save()
        res.status(201)
    } catch (e) {
        console.log(e.message)
    }
}

const getBudget = async (req, res) => {
    const userEmail = req.body.email
    try {
        const currentUser = await UserModel.find({ email: userEmail })
        const budget = currentUser.budget
        res.status(200).json(budget)
    } catch (e) {
        console.log(e.message)
    }
}

module.exports = {
    createUser,
    addExpenseItem,
    getExpenses,
    addBudgetItem,
    getBudget
}