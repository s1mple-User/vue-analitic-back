import { Router } from "express";
import * as ProductContller from "../controller/operational_metrics_controller.js";
import { chek_auth } from "../middleware/check_auth.js";


const router = Router();

router.get('/get-info',chek_auth,ProductContller.operational_metrics_getInfo_controller)

export default router   