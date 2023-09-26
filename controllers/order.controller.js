import Order from "../models/Order.js";
import User from "../models/User.js";

// create a new order data
export const addOrder = async (req, res) => {
  try {
    const { name, amount, _id } = req.body;

    // create the current date for current order
    const currentDate = `${
      new Date().getDate() < 10
        ? "0" + new Date().getDate()
        : new Date().getDate()
    }-${
      new Date().getMonth() < 10
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1
    }-${new Date().getFullYear()}`;

    // check data input
    if (name && amount && _id) {
      // find the user
      const userData = await User.findOne({
        _id: _id,
      });

      // create the price
      let price = 0;
      if (name.includes("nasi") && !name.includes("ayam")) {
        price = 13000;
      } else if (name.includes("dingin")) {
        price = 7000;
      } else if (name === "nasi") {
        price = 5000;
      } else if (name.includes("nasi")) {
        price = 15000;
      }

      if (userData) {
        const newOrder = new Order({
          name: name,
          amount: amount,
          price: price * amount,
          date: currentDate,
          user: userData._id,
        });

        // save to database
        await newOrder.save();

        // add the new order _id to orders in user db
        await User.findByIdAndUpdate(
          {
            _id: userData._id,
          },
          {
            $push: { orders: newOrder._id },
          }
        );

        // return the order data
        return res.status(201).json({
          status: "success",
          message: "new order data added successfully",
          data: newOrder,
        });
      }
    }
  } catch (error) {
    return res.status(200).json({ status: "error", message: error.message });
  }
};

// view all orders data from user id which has dates of today
export const todayOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    // get all orders with todays date from the user
    const orderData = await Order.find({
      user: userId,
      date: `${
        new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate()
      }-${
        new Date().getMonth() < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1
      }-${new Date().getFullYear()}`,
    });

    if (orderData) {
      return res.status(200).json({
        status: "success",
        message: "order data found",
        data: orderData,
      });
    } else {
      return res.status(200).json({
        status: "error",
        message: "order data not found",
      });
    }
  } catch (error) {
    return res.status(200).json({ status: "error", message: error.message });
  }
};

// delete an order
export const deleteOrder = async (req, res) => {
  try {
    const { orderId, userId } = req.body;

    // delete from the order db then delete from orders list from user db
    const orderData = await Order.findOneAndDelete({ _id: orderId });
    if (orderData) {
      await User.findByIdAndUpdate(
        { _id: userId },
        {
          $pull: { orders: orderId },
        }
      ).then(() => {
        return res.status(200).json({
          status: "success",
          message: "order data deleted succesfully",
        });
      });
    } else {
      return res.status(200).json({
        status: "error",
        message: "order data with given id not found",
      });
    }
  } catch (error) {
    return res.status(200).json({ status: "error", message: error.message });
  }
};

// search order by date (summary order)
export const summaryOrder = async (req, res) => {
  try {
    const { date, userId } = req.body;

    // get all orders form the user with matching date
    const userOrder = await Order.find({ user: userId, date: date });

    console.log(userOrder);

    if (userOrder) {
      return res.status(200).json({
        status: "success",
        message: "Order data found",
        data: userOrder,
      });
    } else {
      console.log(userOrder);
      return res.status(200).json({
        status: "error",
        message: "order data not found",
      });
    }
  } catch (error) {
    return res.status(200).json({ status: "error", message: error.message });
  }
};

// search order by name (searc)

export const searchOrder = async (req, res) => {
  try {
    const { name, userId } = req.body;

    const orderData = await Order.find({ user: userId });

    let result = [];

    orderData.forEach((element) => {
      if (element.name.includes(name)) {
        result.push(element);
      }
    });

    if (result.length > 0) {
      return res
        .status(200)
        .json({ status: "success", message: "order data found", data: result });
    } else {
      return res
        .status(200)
        .json({ status: "error", message: "order data not found" });
    }
  } catch (error) {
    return res.status(200).json({ status: "error", message: error.message });
  }
};

// get detail order (for deleting order data by order id)
export const orderDetail = async (req, res) => {
  try {
    const { orderId } = req.body;

    const orderData = await Order.findOne({ _id: orderId });
    if (orderData) {
      return res.status(200).json({
        status: "success",
        message: "order data found",
        data: orderData,
      });
    } else {
      return res
        .status(200)
        .json({ status: "error", message: "order data not found" });
    }
  } catch (error) {
    return res.status(200).json({ status: "error", message: error.message });
  }
};
