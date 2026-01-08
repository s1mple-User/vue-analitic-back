import express, { type Request, type Response } from 'express';
import AuthRoute from "./router/auth_router.js"  
import { chek_body } from './middleware/chek_body.js';
import { connectDB } from './config/database.js';
import { globalErrorHandler } from './middleware/app.js';
import CompanyRoute from "./router/company_router.js";
import ProdctRoute from "./router/product_router.js"
import OperationalMetricsRoute from "./router/operational_metrics_reouter.js"
import ExpensesRoute from "./router/expenses_router.js"
import EmployeeRoute from "./router/employee_router.js"
import AnalyticsRoute from "./router/analytics_router.js"
import FinancialRouter from "./router/financial_router.js"

const app = express();
const port = 3000;
connectDB()
app.use(express.json())
app.use(chek_body)

app.use('/auth',AuthRoute)
app.use('/company',CompanyRoute)
app.use('/product',ProdctRoute)
app.use('/operational-metrics',OperationalMetricsRoute)
app.use('/analytics',AnalyticsRoute)
app.use('/employee',EmployeeRoute)
app.use('/expenses',ExpensesRoute)
app.use('/financial',FinancialRouter)

app.use(globalErrorHandler);
async function startServer() {
    try {
        
        await connectDB();
        
        app.listen(port, () => {
            console.log(`✅ База данных готова`);
            console.log(`🚀 Сервер запущен: http://localhost:${port}`);
        });
    } catch (error) {
        console.error("❌ Не удалось запустить сервер из-за ошибки БД:", error);
        process.exit(1); 
    }
}

startServer();