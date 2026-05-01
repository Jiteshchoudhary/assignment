import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
const taskController = new TaskController();

const router = Router();
router.get('/tasks', taskController.getAnalyticsOfTask);
export default router;