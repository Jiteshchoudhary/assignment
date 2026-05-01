import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { User } from "../entity/User.entity";

export class UserRepository extends Repository<User> {
    constructor() {
        super(User, AppDataSource.manager)

    }
    private repo = AppDataSource.getRepository(User);


    async findAll() {
        return await this.repo.find();
    }

}