import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/connectDB.mjs";
import rootRouter from "./routes/root.mjs";
import userRouter from "./routes/user.mjs";
import apiRouter from "./routes/api.mjs";
import bodyParser from "body-parser";
import session from "express-session";
connectDB();
const app = express();

app.use(
  session({
    secret: "UDA123",
    resave: false,
    saveUninitialized: true,
  })
);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());
// parse application/json
app.use(bodyParser.json());

app.use(morgan("combined"));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/api/v1/users", apiRouter);

app.listen(3000, () => {
  console.log("Server Started!!!");
});
