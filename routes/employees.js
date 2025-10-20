
const express = require('express');
const router = express.Router();

// Require the Employee controller
const employeeController = require("../controllers/employeecontroller.js");

// Define routes for CRUD operations

// Get all employees
router.get('/', employeeController.list);

// Get single employee by id
router.get('/show/:id', employeeController.show);

// Create employee
router.get('/create', employeeController.create);

// Save employee
router.post('/save', employeeController.save);

// Edit employee
router.get('/edit/:id', employeeController.edit);

// Update employee
router.post('/update/:id', employeeController.update);

// Delete employee
router.post('/delete/:id', employeeController.delete);

// Export router as a module
module.exports = router;