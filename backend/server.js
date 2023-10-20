import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import routes from "./routes/routes.js";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.use("/api", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`.blue.bold));
