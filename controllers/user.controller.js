import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const settings = async (req, res) => {
  try {
    const { userId, name, email, newPassword } = req.body;

    if (userId && name && email) {
      if (newPassword) {
        const newEncryptedPassword = await bcrypt.hash(newPassword, 15);

        const newUpdatedUser = await User.findOneAndUpdate(
          {
            _id: userId,
          },
          {
            name: name,
            email: email,
            password: newEncryptedPassword,
          },
          {
            returnOriginal: false,
          }
        );

        console.log(newUpdatedUser);
        return res.status(201).json({
          status: "success",
          message: "user data updated successfully",
          data: newUpdatedUser,
        });
      } else {
        const newUpdatedUser = await User.findOneAndUpdate(
          {
            _id: userId,
          },
          {
            name: name,
            email: email,
          },
          {
            returnOriginal: false,
          }
        );

        console.log(newUpdatedUser);
        return res.status(201).json({
          status: "success",
          message: "user data updated successfully",
          data: newUpdatedUser,
        });
      }
    } else {
      return res.status(200).json({ status: "error", message: "empty data" });
    }
  } catch (error) {
    return res.status(200).json({ status: "error", message: error.message });
  }
};
