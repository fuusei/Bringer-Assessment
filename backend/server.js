import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import routes from "./routes/routes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "https://bringer-assessment.onrender.com/",
    ],
  })
);

app.use("/api", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`.blue.bold));
