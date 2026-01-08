import { Router } from "express";
import * as CompanyContller from "../controller/company_controller.js";
import { chek_auth } from "../middleware/check_auth.js";


const router = Router();

router.post('/create',chek_auth,CompanyContller.create_company_contloler)
router.delete('/delete',chek_auth,CompanyContller.delete_company_contloler)
router.put('/update',chek_auth,CompanyContller.update_company_contloler)

export default router   