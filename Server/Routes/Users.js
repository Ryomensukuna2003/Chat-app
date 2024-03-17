import express from "express";
import {login, signup} from "../Controllers/control.js";
const router = express.Router();

router.post('/login', login);
router.post('/signin', signup);

export default router;