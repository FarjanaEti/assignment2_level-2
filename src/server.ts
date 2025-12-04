import express, { Request, Response } from "express";
 const app = express();
app.use(express.json());

//initDB();

// app.use("/api/v1/users", userRoute);
// app.use("/api/v1/auth", authRoute);


app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "This is the root route",
    path: req.path,
  });
});

app.listen(5000, () => {
  console.log("Server is running on post 5000");
});



