import { Schema, model } from "mongoose";

const help = new Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
});

export default model("Help", help);
