import express from 'express';
import { UserController } from '../controllers/user.controller';

const userController = new UserController();

const router = express.Router();

// Authenticate
router.post('/authenticate', userController.authenticate);

// Change Password
router.post('/change-password', userController.changePassword);

export { router as UserRoutes };