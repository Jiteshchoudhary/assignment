import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { CreateTaskDto } from '../dtos/CreateTask.Dto';
import { TaskQueryDto } from '../dtos/TaskQuery.dto';
import { TaskController } from '../controllers/task.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
const taskController = new TaskController();

const router = Router();
router.post('/', authMiddleware, validate(CreateTaskDto), taskController.createTask);
router.get('/', authMiddleware, validate(TaskQueryDto), taskController.getTasks);
export default router;