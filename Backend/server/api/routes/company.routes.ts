import express from 'express';
import { CompanyController } from '../controllers/company.controller';

const companyController = new CompanyController();

const router = express.Router();

// Add a company
router.post('/add', companyController.addCompany);

// Remove a company
router.post('/remove', companyController.removeCompany);

// Get all companies
router.get('/', companyController.getCompanies);


export { router as CompanyRoutes };