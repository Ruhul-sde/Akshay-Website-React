const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");

const router = express.Router();

// Employee Login API
router.post("/EmpLogin", async (req, res) => {
  try {
    const { ls_EmpCode, ls_Password } = req.body;

    const emp = await Employee.findOne({ ls_EmpCode });
    if (!emp) {
      return res.status(400).json({ error: "Invalid Employee Code" });
    }

    const isMatch = await bcrypt.compare(ls_Password, emp.ls_Password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Password" });
    }

    // JWT token
    const token = jwt.sign({ id: emp._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login Successful",
      token,
      employee: {
        ls_EmpCode: emp.ls_EmpCode,
        ls_EmpName: emp.ls_EmpName,
        ls_Department: emp.ls_Department,
        ls_Designation: emp.ls_Designation,
        ls_Email: emp.ls_Email,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});
// Employee Register API
router.post("/EmpRegister", async (req, res) => {
  try {
    const { ls_EmpCode, ls_Password, ls_EmpName, ls_Department, ls_Designation, ls_Email } = req.body;

    // check duplicate
    const existing = await Employee.findOne({ ls_EmpCode });
    if (existing) {
      return res.status(400).json({ error: "Employee already exists" });
    }

    // hash password
    const hashedPass = await bcrypt.hash(ls_Password, 10);

    const emp = await Employee.create({
      ls_EmpCode,
      ls_Password: hashedPass,
      ls_EmpName,
      ls_Department,
      ls_Designation,
      ls_Email,
    });

    res.json({
      message: "Employee created successfully",
      employee: {
        ls_EmpCode: emp.ls_EmpCode,
        ls_EmpName: emp.ls_EmpName,
        ls_Department: emp.ls_Department,
        ls_Designation: emp.ls_Designation,
        ls_Email: emp.ls_Email,
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
