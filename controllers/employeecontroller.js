const Employee = require("../models/employee.js");

const employeeController = {};

// List all employees
employeeController.list = async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.render("employee/list", { employees });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ message: "Server Error" });
    }
};

// Show single employee
employeeController.show = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.render("employee/show", { employee });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ message: "Server Error" });
    }
};

// Show create form
employeeController.create = async (req, res) => {
    res.render("employee/create");
};

// Save new employee
employeeController.save = async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.redirect("/employees");
    } catch (error) {
        console.error("Error saving employee:", error);
        res.status(400).render("employee/create", { error: "Failed to create employee: " + error.message });
    }
};

// Show edit form
employeeController.edit = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).send({ message: "Employee not found" });
        }
        res.render("employee/edit", { employee });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ message: "Server Error" });
    }
};

// Update employee
employeeController.update = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect("/employees/show/" + employee._id);
    } catch (err) {
        console.error(err);
        res.status(400).render("employee/edit", { employee: req.body, error: "Failed to update employee: " + err.message });
    }
};

// Delete employee
employeeController.delete = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).send({ message: "Employee not found" });
        }
        console.log("Deleted Employee:", deletedEmployee);
        res.redirect("/employees");
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).send({ message: "Server Error" });
    }
};

module.exports = employeeController;
