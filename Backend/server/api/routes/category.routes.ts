import express from 'express';
import { CategoryController } from '../controllers/category.controller';

const categoryController = new CategoryController();

const router = express.Router();

// Add a category
router.post('/add', categoryController.addCategory);

// Remove a category
router.post('/remove', categoryController.removeCategory);

// Get all categories
router.get('/', categoryController.getCategories);


export { router as CategoryRoutes };