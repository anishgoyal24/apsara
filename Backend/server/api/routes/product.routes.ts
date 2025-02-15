import express from 'express';
import { ProductsController } from '../controllers/product.controller';

const productController = new ProductsController();

const router = express.Router();

// Add a new product
router.post('/add', productController.addProduct);

// Remove a product
router.post('/remove', productController.removeProduct);

// Get first 10 products
router.get('/', productController.getProducts);

// Get next 5 products
router.get('/next', productController.getNextProducts);

// Get products by category
router.post('/filtered', productController.getFiltered);

// Get featured products
router.get('/featured', productController.getFeatured);

// Search products
router.get('/search', productController.search);

// Edit Product
router.post('/edit', productController.edit);

export { router as ProductRoutes };