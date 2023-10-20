import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import Order from "../models/Order.js";
import Price from "../models/Price.js";

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
      return res.status(409).json({
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
          .status(401)
          .json({ status: "error", message: "invalid password" });
      }
    } else {
      return res
        .status(404)
        .json({ status: "error", message: "User not exists" });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

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
export const deleteAllorders = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).populate("orders");

    if (!users) {
      return res.status(404).json({
        status: "error",
        message: "Data not found",
      });
    }

    for (const user of users) {
      // console.log(user.orders);
      await Order.deleteMany({ user: user._id });

      // empty the order array
      user.orders = [];

      await user.save();
    }

    return res.status(200).json({
      status: "success",
      message: "Orders deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const addOrderPrice = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (name && price) {
      const newPrice = new Price({
        name: name.toLowerCase(),
        price: price,
      });

      await newPrice.save();

      return res.status(201).json({
        status: "success",
        message: "Succesfully add new order price",
        data: newPrice,
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "empty data",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getAllOrderPrice = async (req, res) => {
  try {
    const orderPriceData = await Price.find({});

    if (orderPriceData) {
      return res.status(200).json({
        status: "success",
        message: "Order price data found",
        data: orderPriceData,
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "Order price data not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getOrderPrice = async (req, res) => {
  try {
    const { name } = req.body;

    if (name) {
      const findOrder = await Price.findOne({
        name: name.toLowerCase(),
      });

      if (findOrder) {
        return res.status(200).json({
          status: "success",
          message: "Order price data found",
          data: findOrder,
        });
      } else {
        return res.status(404).json({
          status: "error",
          message: "Order price data not found",
        });
      }
    } else {
      return res.status(400).json({
        status: "error",
        message: "empty data",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const editOrderPrice = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { price } = req.body;

    if (orderId) {
      const findOrder = await Price.findOne({
        _id: orderId,
      });

      if (findOrder) {
        const updateOrderPrice = await Price.findOneAndUpdate(
          {
            _id: orderId,
          },
          {
            price: price,
          },
          {
            returnOriginal: false,
          }
        );

        return res.status(201).json({
          status: "success",
          message: "successfully update order price data",
          data: updateOrderPrice,
        });
      } else {
        return res.status(404).json({
          status: "error",
          message: "Order not found",
        });
      }
    } else {
      return res.status(400).json({
        status: "error",
        message: "empty data",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
