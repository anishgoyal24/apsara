import { Response, Request, NextFunction } from "express";
import { sendErr } from "../../utils/sendError";
import { Product, Category } from '../models';

export class CategoryController{


    // Add a new Category
    async addCategory(req: Request, res: Response, next: NextFunction){
        try {
            
            const { categoryName } = req.body;

            // Create Category
            const category: any = await Category.create({
                name: categoryName
            });

            // Send status 200 response
            res.status(200).json({
                message: "Successfully Added Category!",
                category: category
            });
        } catch (error) {
            // Send Error Response
            sendErr(res, new Error(error), 'Internal Server Error!', 500);
        }
    }


    // Remove a Category
    async removeCategory(req: Request, res: Response, next: NextFunction){
        try {
            
            const { categoryId } = req.body;

            // Delete category
            const category: any = await Category.findOneAndDelete({
                _id: categoryId
            });

            // Delete category from all products
            const products: any = await Product.updateMany({
                "category._id": categoryId
            }, {
                $pull: { category: { _id: categoryId } }
            });

            // Send status 200 response
            res.status(200).json({
                message: "Successfully Removed Category!",
                category: category
            });
        } catch (error) {
            // Send Error Response
            sendErr(res, new Error(error), 'Internal Server Error!', 500);
        }
    }


    // Get all Categories
    async getCategories(req: Request, res: Response, next: NextFunction){
        try {
            
            const categories: any = await Category.find({});

             // Send status 200 response
             res.status(200).json({
                message: `Found ${categories.length} Categories`,
                categories: categories
            });
        } catch (error) {
            // Send Error Response
            sendErr(res, new Error(error), 'Internal Server Error!', 500);
        }
    }

}