import express from "express";
import {login, signup,xyz} from "../../Auth/auth.js";
const router = express.Router();

router.post('/xyz', xyz);
router.post('/login', login);
router.post('/signin', signup);

export default router;
