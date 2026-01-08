import { Router } from "express";
import * as ProductContller from "../controller/product_contller.js";
import { chek_auth } from "../middleware/check_auth.js";


const router = Router();

router.post('/create',chek_auth,ProductContller.productCreate_contller)
router.delete('/delete',chek_auth,ProductContller.productDelete_contller)

export default router   