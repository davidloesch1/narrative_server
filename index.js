const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

dotenv.config();

const app = express();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(cookieParser(process.env.SECRET));

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/auth", require("./routes/index"));
// app.use("/guest", require("./routes/guest"))

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(`Server running on ${PORT} in ${process.env.NODE_ENV} mode`)
  );
  