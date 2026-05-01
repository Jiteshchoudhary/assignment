import { CreateTaskDto } from "../dtos/CreateTask.Dto";
import { TaskQueryDto } from "../dtos/TaskQuery.dto";
import { TaskRepository } from "../repository/task.repository";

export class TaskService {
    private readonly taskRepository = new TaskRepository();

    async getTask(params: TaskQueryDto) {
        try {
            const filter: any = {};
            if (params.priority) {
                filter['priority'] = params.priority;
            }
            if (params.status) {
                filter['status'] = params.status;
            }

            if (params.page && params.limit) {
                const limit = params.limit;
                const skip = (params.page - 1) * limit;
                return await this.taskRepository.find(
                    {
                        where: filter,
                        take: limit,
                        skip
                    },
                )
            } else {
                return await this.taskRepository.find({
                    where: filter
                });
            }

        } catch (error) {
            throw error;
        }
    }

    async createTask(params: CreateTaskDto, userId: string, tenantId: string) {
        try {
            let requestParams = { ...params, userId, tenantId }
            const tasks = this.taskRepository.create(requestParams);
            return await this.taskRepository.save(tasks);
        } catch (error) {
            throw error;
        }
    }

    async analyticsOfTask() {
        const pendingTasks = await this.taskRepository.count({ where: { status: 'pending' } });
        const completeTasks = await this.taskRepository.count({ where: { status: 'completed' } });
        const groupByTasks = await this.taskRepository.query(`
        select priority, count(*) as count from tasks group by priority`);
        const groupByTaskStatus = await this.taskRepository.query(`
        select status, count(*) as count from tasks group by status`);
        return { pendingTasks, completeTasks, groupByTasks, groupByTaskStatus }
    }
}