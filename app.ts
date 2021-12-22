if (process.env.NODE_ENV === "development") require("dotenv").config();

import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import route from "./routes";

const app: Application = express();
const port = process.env.PORT;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use("/", route);

app.listen(port, () => {
  console.log(`Server Running at Port ${process.env.PORT}`);
});
