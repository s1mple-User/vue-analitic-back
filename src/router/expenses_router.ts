import { Router } from "express";
import * as ProductContller from "../controller/expenses_controller.js";
import { chek_auth } from "../middleware/check_auth.js";


const router = Router();

router.post('/create',chek_auth,ProductContller.expensesCreate_contller)
router.delete('/delete',chek_auth,ProductContller.expensesDelete_contller)

export default router   