require("dotenv").config();
const PORT = process.env.PORT || 8080;

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(fileUpload());
app.use(express.static("static"));

// Routes
app.use("/api/post", require("./routes/post.route"));
app.use("/api/auth", require("./routes/auth.route"));


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
