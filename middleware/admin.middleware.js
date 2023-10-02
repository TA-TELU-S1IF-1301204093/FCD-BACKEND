import jwt from "jsonwebtoken";

export const validateAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (decoded.role === "admin") {
            next();
        } else {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
};
