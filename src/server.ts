import express, { Request, Response } from "express";
import initBD from "./config/db";
import config from "./config";
import { userRoutes } from "./modules/users/user.routes";
import { vehicleRoutes } from "./modules/vehicle/vehicle.routes";
 const app = express();
 app.use(express.json());
 const port = config.port;

 initBD();

 app.use("/api/v1/users", userRoutes);
 app.use("/api/v1/vehicles", vehicleRoutes);


app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "This is the root route",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log("Server is running on post 5000");
});



