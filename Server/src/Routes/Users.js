import express from "express";
import {login, signup, verify_token} from "../../Auth/auth.js";
const router = express.Router();

router.post('/login', login);
router.post('/signin', signup);
router.post('/verifyToken', verify_token);

export default router;
