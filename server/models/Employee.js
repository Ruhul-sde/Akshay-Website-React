const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  ls_EmpCode: { type: String, required: true, unique: true },
  ls_Password: { type: String, required: true },
  ls_EmpName: { type: String },
  ls_Department: { type: String },
  ls_Designation: { type: String },
  ls_Email: { type: String }
});

module.exports = mongoose.model("Employee", employeeSchema);
