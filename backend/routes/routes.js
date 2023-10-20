import express from "express";
import { generateToken, trackingParcel } from "../controllers/controller.js";

const router = express.Router();

router.route("/login").post(generateToken);
router.route("/track").post(trackingParcel);

export default router;
