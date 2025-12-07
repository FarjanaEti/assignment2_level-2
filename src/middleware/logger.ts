import { NextFunction, Request, Response } from "express";

// logger middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}\n`);
  next();
};

export default logger;

//signin signup
//Vh created get vh get single vh update vh delete vh
//get all user done
//user delete done