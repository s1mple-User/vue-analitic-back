import { Router } from "express";
import * as EmployeeContller from "../controller/employee_contller.js";
import { chek_auth } from "../middleware/check_auth.js";


const router = Router();

router.post('/add',chek_auth,EmployeeContller.employeeAdd_contller)
router.delete('/delete',chek_auth,EmployeeContller.employeeDelete_contller)

export default router   