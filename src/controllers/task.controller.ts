import { Request, Response, NextFunction } from 'express';
import { TaskService } from "../service/task.service";
import { RedisClient } from '../config/redis.config';

//task controller 
export class TaskController {
    private readonly taskService = new TaskService();

    createTask = async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req['userId']
            const tenantId = req['tenantId'];
            const task = await this.taskService.createTask(req.body, userId, tenantId);
            return res.status(201).json({
                success: true,
                data: task,
                message: 'Task created successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    getTasks = async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req['userId']
            const tenantId = req['tenantId'];
            let redisKey = `tasks:${userId}:${tenantId}:${JSON.stringify(req.query)}`;
            let redisClient = RedisClient;
            let tasks = await redisClient.get(redisKey);
            if (tasks && tasks !== undefined && tasks.length > 0 && tasks !== 'null') {
                return res.status(200).json({
                    success: true,
                    data: JSON.parse(tasks),
                    message: 'Task list fetched successfully'
                });
            } else {
                console.log('setting the part ')
                const tasks = await this.taskService.getTask(req.query);
                redisClient.setEx(redisKey, 60, JSON.stringify(tasks));
                return res.status(200).json({
                    success: true,
                    data: tasks,
                    message: 'Task list fetched successfully'
                });
            }
        } catch (error) {
            next(error)
        }
    }

    getAnalyticsOfTask = async (req: any, res: Response, next: NextFunction) => {
        try {
            const tasksInfo = await this.taskService.analyticsOfTask();
            return res.status(200).json({
                success: true,
                data: tasksInfo,
                message: 'Analytics of tasks'
            });
        } catch (error) {
            next(error)
        }
    }
}