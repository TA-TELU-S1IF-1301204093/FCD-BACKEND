import express from "express";
import mongoose from "mongoose";
import cors from "cors	";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";

// import routes
import authRoute from "./routes/auth.route.js";
import orderRoute from "./routes/order.route.js";
import userRoute from "./routes/user.route.js";
import helpRoute from "./routes/help.route.js";
import adminRoute from "./routes/admin.route.js";

// define application
const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: true }));

// dev only
app.use(morgan("dev"));

// basic api endpoint
app.get("/", (req, res) => {
    res.status(200).json({ status: "OK", message: "API MNote" });
});

// auth routes
app.use("/auth", authRoute);
app.use("/orders", orderRoute);
app.use("/user", userRoute);
app.use("/help", helpRoute);

// admin routes
app.use("/api/admin", adminRoute);

// connect to database
mongoose
    .connect(
        process.env.NODE_ENV === "production"
            ? process.env.MONGO_URI_PROD
            : process.env.MONGO_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log(
            `Connected to database : ${mongoose.connection.db.databaseName}`
        );
        app.listen(process.env.PORT || 80, () => {
            console.log(`Server running on localhost port ${process.env.PORT}`);
        });
    });
