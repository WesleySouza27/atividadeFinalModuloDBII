import express from "express";
import { envs } from "./envs";

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});


app.listen(envs.PORT, () => console.log("Server is running"));
