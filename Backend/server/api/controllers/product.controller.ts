import { Response, Request, NextFunction } from "express";
import { sendErr } from "../../utils/sendError";
import { Product, Category } from '../models';
const fs = require('fs'); 
import path from 'path';

export class ProductsController{


    // Function to add a new product
    async addProduct(req: Request, res: Response, next: NextFunction){
        try {

            const { productData } = req.body;
            console.log(productData);

            // Add Product to Database
            const product: any = await Product.create(productData);

            // Send status 200 response
            return res.status(200).json({
                message: "Successfully Added Product",
                product: product
            });
        } catch (error) {
            // Send Error Response
            return sendErr(res, new Error(error), "Internal Server Error", 500);
        }
    }


    // Function to remove a product
    async removeProduct(req: Request, res: Response, next: NextFunction){
        try {
            
            const { productId } = req.body;

            // Delete Product from DB
            const product: any = await Product.findOneAndDelete({
                _id: productId
            });


            // Delete image
            fs.unlinkSync(path.join(__dirname, '../../uploads/images' + product.name + '.jpg'))

            // Send status 200 response
            return res.status(200).json({
                message: "Successfully Deleted Product",
                product: product
            });
        } catch (error) {
            // Send Error Response
            return sendErr(res, new Error(error), "Internal Server Error", 500);
        }
    }


    // Function to fetch first 10 recent products
    async getProducts(req: Request, res: Response, next: NextFunction){
        try {
            
            // Fetch first 10 products
            const products: any = await Product.find().sort('-_id').limit(10).populate('category', 'name').lean() || [];

            // Send status 200 response
            return res.status(200).json({
                message: "Successfully Retrieved Products",
                products: products
            });
        } catch (error) {
            // Send Error Response
            return sendErr(res, new Error(error), "Internal Server Error", 500);
        }
    }


    // Function to fetch next 5 recent products
    async getNextProducts(req: Request, res: Response, next: NextFunction){
        try {
            const { lastProductId } = req.params
            // Fetch first 10 products
            const products: any = await Product.find({
                _id: { lt: lastProductId }
            }).sort('-_id').limit(10).populate('category', 'name').lean() || [];

            // Send status 200 response
            return res.status(200).json({
                message: "Successfully Retrieved Products",
                products: products
            });
        } catch (error) {
            // Send Error Response
            return sendErr(res, new Error(error), "Internal Server Error", 500);
        }
    }


    // Function to get products by categories
    async getByCategories(req: Request, res: Response, next: NextFunction){
        try {
            const { categories } = req.body;

            // Retrieve products with specified categories
            const products: any = await Product.find({
                category: { $in: categories } 
            }).populate('category', 'name').lean();

            // Send status 200 response
            return res.status(200).json({
                message: "Successfully Retrieved Products",
                products: products
            });
        } catch (error) {
            // Send Error Response
            return sendErr(res, new Error(error), "Internal Server Error", 500);
        }
    }


    // Function to get featured products
    async getFeatured(req: Request, res: Response, next: NextFunction){
        try {

            // Retrieve products with specified categories
            const products: any = await Product.find({
                featured: true
            }).populate('category', 'name').lean();

            // Send status 200 response
            return res.status(200).json({
                message: "Successfully Retrieved Products",
                products: products
            });
        } catch (error) {
            // Send Error Response
            return sendErr(res, new Error(error), "Internal Server Error", 500);
        }
    }


    // Function to search products
    async search(req: Request, res: Response, next: NextFunction){
        try {
            
            const { query } = req.query;

            // Search Products
            const products: any = await Product.find({
                $or: [
                    { name: { "$regex": query, "$options": "i" } }
                ]
            });

            // Send status 200 response
            return res.status(200).json({
                message: "Successfully Searched Products",
                products: products
            });
        } catch (error) {
            // Send Error Response
            return sendErr(res, new Error(error), "Internal Server Error", 500);
        }
    }


    async edit(req: Request, res: Response, next: NextFunction){
        try {
            
            const { productData } = req.body;

            const productName: any = await Product.findById(productData._id).select('name');

            // Search product amd update
            const product: any = await Product.findByIdAndUpdate(productData._id, {
                $set: productData
            }, {
                new: true
            });

            // Rename image
            fs.rename(path.join(__dirname, '../../uploads/images' + product.name + '.jpg'), 
            path.join(__dirname, '../../uploads/images' + product.name + '.jpg'), () => { 
                console.log("\nFile Renamed!\n"); 
            });

            // Send status 200 response
            return res.status(200).json({
                message: "Successfully Updated Product",
                product: product
            });

        } catch (error) {
            // Send Error Response
            return sendErr(res, new Error(error), "Internal Server Error", 500);
        }
    }

}