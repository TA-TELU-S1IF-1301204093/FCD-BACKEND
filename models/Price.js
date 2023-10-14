import { Schema, model } from "mongoose";

const price = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

export default model("Price", price);
