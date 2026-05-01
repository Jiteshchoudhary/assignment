import { DataSource } from "typeorm";
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: true,
    migrations: [path.join(__dirname, '..', 'migrations', '*.{ts,js}')],
});