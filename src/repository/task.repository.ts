import { Repository } from "typeorm";
import { Task } from "../entity/Task.entity";
import { AppDataSource } from "../config/database";

/**
 * task repository
 */
export class TaskRepository extends Repository<Task> {
    constructor() {
        super(Task, AppDataSource.manager)
    }
}