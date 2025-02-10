require("dotenv").config();
const PORT = process.env.PORT || 8080;

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error.middleware");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(cookieParser({}));
app.use(fileUpload());
app.use(express.static("static"));

// Routes
app.use("/api/post", require("./routes/post.route"));
app.use("/api/auth", require("./routes/auth.route"));

// Middlewares
app.use(errorMiddleware);

const bootstrap = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log("Connected DB"));
    app.listen(PORT, () => {
      console.log(`Listening on - http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error connecting width DB: ${error}`);
  }
};

bootstrap();
