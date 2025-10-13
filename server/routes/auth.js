const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
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

// User Registration
router.post("/register", async (req, res) => {
  try {
    const { email, password, name, company, phone } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPass,
      name,
      company,
      phone,
      role: 'user'
    });

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        company: user.company,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        company: user.company,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Admin Login (special endpoint)
router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Employee.findOne({ ls_Email: email });
    if (!admin) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.ls_Password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.ls_Email,
        name: admin.ls_EmpName,
        role: 'admin',
        empCode: admin.ls_EmpCode
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Admin login successful",
      token,
      user: {
        id: admin._id,
        email: admin.ls_Email,
        name: admin.ls_EmpName,
        role: 'admin',
        empCode: admin.ls_EmpCode
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;