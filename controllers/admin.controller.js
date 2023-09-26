import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import Order from "../models/Order.js";

// create admin
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user not exist
    const isExist = await User.findOne({ email, role: "admin" });

    if (!isExist) {
      // encrypt password
      const hashedPassword = await bcrypt.hash(password, 15);

      const newAdmin = new User({
        name,
        email,
        password: hashedPassword,
        role: "admin",
      });

      await newAdmin.save();

      return res.status(201).json({
        status: "success",
        message: "User created successfully",
      });
    } else {
      return res.status(200).json({
        status: "error",
        message: "User already exists",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// login admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user not exist
    const isExist = await User.findOne({ email: email, role: "admin" });

    if (isExist) {
      const checkPassword = await bcrypt.compare(password, isExist.password);

      if (checkPassword) {
        //  create token
        const token = jwt.sign(
          {
            id: isExist._id,
            name: isExist.name,
            email: isExist.email,
            password: isExist.password,
            role: isExist.role,
          },
          process.env.SECRET_KEY
        );

        return res.status(200).json({
          status: "success",
          message: "login success",
          token: token,
        });
      } else {
        return res
          .status(200)
          .json({ status: "error", message: "invalid password" });
      }
    } else {
      return res
        .status(200)
        .json({ status: "error", message: "User not exists" });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// create user account
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const isExist = await User.findOne({ email: email, role: "user" });

    if (isExist === null) {
      // ecnrypt password
      const encryptedPassword = await bcrypt.hash(password, 15);
      // create new user
      const user = new User({
        name: name,
        email: email,
        password: encryptedPassword,
      });

      await user.save();

      return res.status(201).json({
        status: "success",
        message: "User created successfully",
      });
    } else {
      return res
        .status(200)
        .json({ status: "error", message: "User already exists" });
    }
  } catch (error) {}
};

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });

    if (users.length > 0) {
      return res.status(200).json({
        status: "success",
        message: "users data found",
        data: users,
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "users data not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById({ _id: userId });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "user not found",
      });
    }
    // delete semua order dari user tersebut
    await Order.deleteMany({ user: userId });

    // delete user tersebut
    await User.findByIdAndDelete({ _id: userId });

    return res.status(200).json({
      status: "success",
      message: "user deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// get all orders from all users
export const getAllOrderFromUsers = async (req, res) => {
  try {
    const orderData = await Order.find({});
    if (orderData.length > 0) {
      return res.status(200).json({
        status: "success",
        message: "orders data found",
        data: orderData,
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "orders data not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// get all orders from a user
export const getAllOrderFromOneUser = async (req, res) => {
  try {
    const { userId } = req.body;

    // check the user
    const user = await User.findById({ _id: userId });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "user not found",
      });
    }
    // get the order data
    const orderData = await Order.find({ user: userId });

    if (orderData.length > 0) {
      return res.status(200).json({
        status: "success",
        message: "orders data found",
        data: orderData,
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "orders data not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
// delete all orders from all users
// detele all orders from specific user
