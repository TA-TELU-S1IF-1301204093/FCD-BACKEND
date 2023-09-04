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
