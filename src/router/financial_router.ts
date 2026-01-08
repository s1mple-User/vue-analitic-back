import { Router } from "express";
import * as ProductContller from "../controller/financial_controller.js";
import { chek_auth } from "../middleware/check_auth.js";


const router = Router();

router.get('/get-info',chek_auth,ProductContller.financial_getInfo_controller)

export default router   