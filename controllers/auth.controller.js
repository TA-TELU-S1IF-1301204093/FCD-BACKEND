import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// export const Signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // check if user already exists
//     const isExist = await User.findOne({ email: email });

//     if (isExist === null) {
//       // ecnrypt password
//       const encryptedPassword = await bcrypt.hash(password, 15);
//       // create new user
//       const user = new User({
//         name: name,
//         email: email,
//         password: encryptedPassword,
//       });

//       await user.save();

//       return res.status(201).json({
//         status: "success",
//         message: "User created successfully",
//         data: user,
//       });
//     } else {
//       return res
//         .status(200)
//         .json({ status: "error", message: "User already exists" });
//     }
//   } catch (error) {
//     return res.status(200).json({ status: "error", message: error.message });
//   }
// };

export const Signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user not exist
    const isExist = await User.findOne({ email: email });

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
    return res.status(200).json({ status: "error", message: error.message });
  }
};
