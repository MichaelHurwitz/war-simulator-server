import { Request, Response, NextFunction } from "express";
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.Node_Environment === "dev") {
  console.error(err.stack);
}
  res.status(500).json({ message: "Error Occurred", error:err.message || err });
};
