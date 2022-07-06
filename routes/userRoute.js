const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController')
const authenticate = require('../middleware/authenticate')

router.post('/newUser', UsersController.createUser)

router.post('/login', UsersController.authenticateUser)

router.post('/newBudget', authenticate, UsersController.addBudgetItem)
router.get('/budget', authenticate, UsersController.getBudget)
router.delete('/budget/:budgetId', authenticate, UsersController.deleteBudget)

router.get('/userInfo', authenticate, UsersController.findUserInfo)

router.post('/newExpense', authenticate, UsersController.addExpenseItem)
router.get('/expenses', authenticate, UsersController.getExpenses)

module.exports = router;