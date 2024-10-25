import express from "express";
import { dashboard } from "../../controllers/primaryController.js";
const router = express.Router();

router.route("/").get(dashboard);

export default router;
