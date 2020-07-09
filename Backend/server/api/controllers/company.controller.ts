import { Response, Request, NextFunction } from "express";
import { sendErr } from "../../utils/sendError";
import { Product, Company } from '../models';

export class CompanyController{


    // Add a new Company
    async addCompany(req: Request, res: Response, next: NextFunction){
        try {
            
            const { companyName } = req.body;

            // Create Category
            const company: any = await Company.create({
                name: companyName
            });

            // Send status 200 response
            res.status(200).json({
                message: "Successfully Added Company!",
                company: company
            });
        } catch (error) {
            // Send Error Response
            sendErr(res, new Error(error), 'Internal Server Error!', 500);
        }
    }


    // Remove a Company
    async removeCompany(req: Request, res: Response, next: NextFunction){
        try {
            
            const { companyId } = req.body;

            // Delete category
            const company: any = await Company.findOneAndDelete({
                _id: companyId
            });


            // Send status 200 response
            res.status(200).json({
                message: "Successfully Removed Company!",
                company: company
            });
        } catch (error) {
            // Send Error Response
            sendErr(res, new Error(error), 'Internal Server Error!', 500);
        }
    }


    // Get all Companies
    async getCompanies(req: Request, res: Response, next: NextFunction){
        try {
            
            const companies: any = await Company.find({});

             // Send status 200 response
             res.status(200).json({
                message: `Found ${companies.length} Companies`,
                categories: companies
            });
        } catch (error) {
            // Send Error Response
            sendErr(res, new Error(error), 'Internal Server Error!', 500);
        }
    }

}