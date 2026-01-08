import { Router } from "express";
import * as AnalyticsContller from "../controller/analytics_controller.js";
import { chek_auth } from "../middleware/check_auth.js";


const router = Router();

router.get('/get-info',chek_auth,AnalyticsContller.analyticsGetInfo_controller)

export default router   