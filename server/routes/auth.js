import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);   //prefix will be /auth which is mentioned in index.js

export default router;
