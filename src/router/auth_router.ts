import { Router } from "express";
import * as AuthContller from "../controller/auth_contller.js";


const router = Router();

router.post('/register',AuthContller.register_contller)
router.post('/login',AuthContller.login_contller)
router.post('/accses',AuthContller.getAccses_contller)

export default router