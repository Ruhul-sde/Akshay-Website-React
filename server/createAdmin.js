
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Employee = require('./models/Employee');

const createDefaultAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Employee.findOne({ ls_EmpCode: 'ADMIN001' });
    
    if (existingAdmin) {
      console.log('Admin already exists!');
      console.log('Email:', existingAdmin.ls_Email);
      process.exit(0);
    }

    // Create default admin
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    
    const admin = await Employee.create({
      ls_EmpCode: 'ADMIN001',
      ls_Password: hashedPassword,
      ls_EmpName: 'System Administrator',
      ls_Department: 'IT',
      ls_Designation: 'Admin',
      ls_Email: 'admin@akshaytech.com'
    });

    console.log('✅ Default admin created successfully!');
    console.log('==========================================');
    console.log('Email: admin@akshaytech.com');
    console.log('Password: Admin@123');
    console.log('==========================================');
    console.log('⚠️  Please change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createDefaultAdmin();
