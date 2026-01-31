const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');

// Load env vars
dotenv.config({ path: '../../.env' });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/resumex');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const seedAdmin = async () => {
    await connectDB();

    const email = 'v9mirza@gmail.com';
    const password = '1234';

    try {
        // Check if user exists
        let user = await User.findOne({ email });

        if (user) {
            console.log('User found. Updating to Admin...');
            user.role = 'admin';
            // Also update password if you want to enforce the specific one provided
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            console.log('User updated to Admin successfully!');
        } else {
            console.log('User not found. Creating new Admin...');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user = await User.create({
                email,
                password: hashedPassword,
                role: 'admin'
            });
            console.log(`Admin created successfully: ${user.email}`);
        }

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedAdmin();
