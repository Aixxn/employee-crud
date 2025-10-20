const mongoose =require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: String,
    address: String,
    position: String,
    salary: Number,
    update_at: { type: Date, default: Date.now }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;