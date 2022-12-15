import { Router } from "express";
import ReportCategoryController from '../controller/reportCategoryController';
import ReportProductController from "../controller/reportProductController";
import ReportUserController from "../controller/reportUserController";

const report = Router();

report.get('/categories', async (req: any, res) => {
    const reportCategoryCtrl = new ReportCategoryController();
    const result = await reportCategoryCtrl.get(req.query);

    const label = result.map(item => item._id);
    const data = result.map(item => item.sum);
    
    return res.json({label, data});

});

report.get('/products', async (req: any, res) => {
    const reportProductCtrl = new ReportProductController();
    const result = await reportProductCtrl.get(req.query);

    const label = result.map(item => item._id);
    const data = result.map(item => item.sum);
    
    return res.json({label, data});

});

report.get('/users', async (req: any, res) => {
    const reportUserCtrl = new ReportUserController();
    const result = await reportUserCtrl.get(req.query);

    function getMonthName(monthNumber: any) {
        const date = new Date();
        date.setMonth(monthNumber - 1);
      
        return date.toLocaleString('pt-BR', { month: 'long' });
      }

    const label = result.map(item => getMonthName(item._id));
    const data = result.map(item => item.sum);
    
    return res.json({label, data});

});



export {report};