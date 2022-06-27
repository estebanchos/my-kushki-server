const mongoose = require('mongoose')

const BudgetSchema = new mongoose.Schema({
    category: String,
    amount: Number
})

const ExpenseSchema = new mongoose.Schema({
    item: String,
    category: String,
    amount: Number
})

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 6
    },
    password: {
        type: String,
        required: true
    },
    budget: [BudgetSchema],
    expenses: [ExpenseSchema]
})

const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel