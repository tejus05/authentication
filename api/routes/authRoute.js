import express from "express";
import { signup, login, google, signout } from "../controllers/authController.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/google', google);
router.get('/signout', signout);

export default router;