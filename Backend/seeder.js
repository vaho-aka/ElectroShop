import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';

import Product from './models/productSchema.js';
import User from './models/userSchema.js';
import { productsData } from './data/productsData.js';

dotenv.config();

connectDB();

const users = [
  {
    name: 'irna',
    password: bcrypt.hashSync('123456', 10),
    email: 'irna@example.com',
    isAdmin: true,
  },
];

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const createdUser = await User.insertMany(users);

    const adminUser = createdUser[0]._id;

    const sampleProduct = productsData.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProduct);

    console.log('Data imported successfully!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

importData();
