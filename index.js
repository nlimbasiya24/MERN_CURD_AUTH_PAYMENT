require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes")
const passwordResetRoutes = require("./routes/passwordReset");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;
// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordResetRoutes);
app.use('/api/notes',noteRoutes)

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"))
}
app.listen(port, console.log(`Listening on port ${port}...`));
