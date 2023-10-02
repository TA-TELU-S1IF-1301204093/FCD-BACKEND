import Help from "../models/Help.js";

export const fetchHelp = async (req, res) => {
    try {
        await Help.find()
            .then((result) => {
                return res.status(200).json({
                    status: "success",
                    message: "help data fetfch succesfully",
                    data: result,
                });
            })
            .catch((err) => {
                return res
                    .status(404)
                    .json({ status: "error", message: err.message });
            });
    } catch (error) {
        return res
            .status(200)
            .json({ status: "error", message: error.message });
    }
};

export const createHelp = async (req, res) => {
    try {
        const { question, answer } = req.body;

        const newHelp = new Help({
            question,
            answer,
        });

        await newHelp.save();

        return res.status(201).json({
            status: "success",
            message: "new help data created succesfully",
            data: newHelp,
        });
    } catch (error) {
        return res
            .status(200)
            .json({ status: "error", message: error.message });
    }
};
