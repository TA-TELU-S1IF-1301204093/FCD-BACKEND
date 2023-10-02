import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
                const token = jwt.sign(
                    {
                        id: newUpdatedUser._id,
                        name: newUpdatedUser.name,
                        email: newUpdatedUser.email,
                        password: newUpdatedUser.password,
                    },
                    process.env.SECRET_KEY
                );
                return res.status(200).json({
                    status: "success",
                    message: "user data updated successfully",
                    token: token,
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
                const token = jwt.sign(
                    {
                        id: newUpdatedUser._id,
                        name: newUpdatedUser.name,
                        email: newUpdatedUser.email,
                        password: newUpdatedUser.password,
                    },
                    process.env.SECRET_KEY
                );
                return res.status(200).json({
                    status: "success",
                    message: "user data updated successfully",
                    token: token,
                });
            }
        } else {
            return res
                .status(200)
                .json({ status: "error", message: "empty data" });
        }
    } catch (error) {
        return res
            .status(200)
            .json({ status: "error", message: error.message });
    }
};

export const fetchUser = async (req, res) => {
    try {
        const { userId } = req.body;

        // find the user data
        const userData = await User.findOne({
            _id: userId,
        });

        if (userData) {
            const token = jwt.sign(
                {
                    id: userData._id,
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                },
                process.env.SECRET_KEY
            );

            return res.status(200).json({
                status: "success",
                message: "user data found",
                token: token,
            });
        } else {
            return res
                .status(200)
                .json({ status: "error", message: "User not found" });
        }
    } catch (error) {
        return res
            .status(200)
            .json({ status: "error", message: error.message });
    }
};

export const decodeUserToken = async (req, res) => {
    try {
        const token = req.headers.authorization;

        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res
                        .status(403)
                        .json({ status: "error", message: "invalid token" });
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: "token berhasil didecode",
                        data: {
                            id: decoded.id,
                            name: decoded.name,
                            email: decoded.email,
                            role: decoded.role,
                        },
                    });
                }
            });
        } else {
            return res
                .status(403)
                .json({ status: "error", message: "token not provided" });
        }
    } catch (error) {
        return res
            .status(200)
            .json({ status: "error", message: error.message });
    }
};
