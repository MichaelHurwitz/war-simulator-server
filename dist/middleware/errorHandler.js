"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    if (process.env.Node_Environment === "dev") {
        console.error(err.stack);
    }
    res.status(500).json({ message: "Error Occurred", error: err.message || err });
};
exports.errorHandler = errorHandler;
