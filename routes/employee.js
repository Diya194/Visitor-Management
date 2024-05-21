const express = require('express');
const employeeController = require('../controllers/employee.controller')
const router = express.Router();

router.post('/sign-up', employeeController.signUp);
router.post('/login', employeeController.login);
router.get('/', employeeController.fetchEmployee);

module.exports = router;