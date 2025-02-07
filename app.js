require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const app = express();
const postRoute = require("./routes/post.route");

app.use(express.json());
app.use(fileUpload());
app.use(express.static("static"));
app.use("/api/post", postRoute);

const PORT = process.env.PORT || 8080;

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
