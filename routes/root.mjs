import express from "express";
import HomeController from "../controllers/home_controller.mjs";
import User from "../models/user.mjs";

function redirectLogin(req, res, next) {
  if (req.session.user) {
    res.redirect("/users");
  } else {
    next();
  }
}
const rootRouter = express.Router();

const workExperience = [
  {
    name: "Front End Developer",
    start_date: "Jan 2015",
    end_date: "Jan 2015",
    description:
      " Praesentium magnam consectetur vel in deserunt aspernatur est reprehenderit sunt hic. Nulla tempora soluta ea et odio, unde doloremque repellendus iure, iste.",
  },
  {
    name: "Back End Developer",
    start_date: "Jan 2014",
    end_date: "Jan 2014",
    description:
      " Praesentium magnam consectetur vel in deserunt aspernatur est reprehenderit sunt hic. Nulla tempora soluta ea et odio, unde doloremque repellendus iure, iste.",
  },
];

rootRouter.get("/", HomeController.index);

rootRouter.get("/cv/:id", (req, res) => {
  console.log(req.params.id);
  res.render("cv", { title: "Home Page", workExperience });
});

rootRouter.get("/contact", (req, res) => {
  res.send("<h1> Hello Contact Page</h1>");
});

rootRouter.get("/about", (req, res) => {
  res.render("about", { title: "Home Page" });
});

rootRouter.get("/login", redirectLogin, (req, res) => {
  res.render("login", { title: "Login Page" });
});

rootRouter.post("/login", redirectLogin, async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user || user.password !== password)
    return res.render("login", { title: "Login Page" });
  req.session.user = user;
  res.redirect("/users");
});

export default rootRouter;
