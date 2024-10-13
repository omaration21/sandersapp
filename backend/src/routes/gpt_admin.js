import { Router } from "express";
import { GptAdminController } from "../controllers/gpt_admin.js";
import { verifyToken } from "../middlewares/token.js";

export const GptAdminRouter = Router();
// Process question
GptAdminRouter.post("/question", verifyToken, GptAdminController.proccessQuestion);