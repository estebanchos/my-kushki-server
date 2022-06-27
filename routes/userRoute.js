const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController')
require('dotenv').config();

router.route('/newUser')
    .post(UsersController.createUser)

router.route('/newBudget')
    .post(UsersController.addBudgetItem)

router.route('/newExpense')
    .post(UsersController.addExpenseItem)



module.exports = router;