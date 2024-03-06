require("dotenv").config();
const express = require("express");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");

const { connectDB } = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,FETCH,PATCH,DELETE",
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);

app.use(errorMiddleware);

const PORT = 5000;
connectDB().then(async () => {
  await app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
  });
});
