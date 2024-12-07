import express from "express";
import ApiUserController from "../controllers/api_user_controller.mjs";
const apiRouter = express.Router();
import User from "../models/user.mjs";
import jwt from "jsonwebtoken";
import { name } from "ejs";

apiRouter.get("/", ApiUserController.index);
apiRouter.get("/:id", ApiUserController.show);
apiRouter.delete("/:id", ApiUserController.delete);
apiRouter.post("/", ApiUserController.create);
apiRouter.put("/:id", ApiUserController.update);

apiRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user || user.password !== password)
    return res.status(400).json({ message: "Login khong thanh cong!" });
  let token = jwt.sign({ email: user.email, name: user.name }, "shhhhh");
  res.status(400).json({ message: "Login thanh cong!", accesToken: token });
});

export default apiRouter;
