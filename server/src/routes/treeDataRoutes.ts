import express from 'express';
import { getTreeDataController } from '../controllers/treeDataController';

//##########################################################################################
// API DATA ROUTER
//##########################################################################################
const router = express.Router();

//##########################################################################################
// ROUTES
//##########################################################################################
router.route('/').get(getTreeDataController);

export default router;
