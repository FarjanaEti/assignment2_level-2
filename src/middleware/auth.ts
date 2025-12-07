
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bearerToken = req.headers.authorization;
      //console.log(token)
      if (!bearerToken || typeof bearerToken!== "string") {
        return res.status(401).json({ message: "No token provided" });
      }
       const parts = bearerToken.split(" ");

      if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ message: "Invalid authorization format" });
      }

      const token  = parts[1]!; 

      const decoded = jwt.verify(
        token,
        config.jwtSecret as string
      ) as JwtPayload;
      //console.log({ decoded });
      req.user = decoded;

      //["admin"]
      if (roles.length && !roles.includes(decoded.role as string)) {
        return res.status(401).json({
          error: "unauthorized!!!",
        });
      }

      next();
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
};

export default auth;