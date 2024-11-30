import express from "express";
import ApiUserController from "../controllers/api_user_controller.mjs";
const apiRouter = express.Router();

apiRouter.get("/", ApiUserController.index);
apiRouter.get("/:id", ApiUserController.show);
apiRouter.delete("/:id", ApiUserController.delete);
apiRouter.post("/", ApiUserController.create);
apiRouter.put("/:id", ApiUserController.update);

export default apiRouter;
