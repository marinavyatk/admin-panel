const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

app.use(
  cors({
    origin: "https://admin-panel-chi-lake.vercel.app",
    credentials: true,
  }),
);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// wxH6BOik31Tnyz48
