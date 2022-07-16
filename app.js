const connectDB = require("./db/connect");
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const tasks = require("./routes/tasksRoute");
const port = process.env.PORT;

// middleware
app.use(morgan("dev"));
app.use(express.json());

// routes
app.get("/hello", (req, res) => {
  res.send("<h1>HELLO</h1>");
});

app.use("/api/v1/tasks", tasks);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500);
  res.json({ error: err });
});

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
