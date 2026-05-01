import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './Task.entity';


/**
 * User entity 
 */
@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', unique: true, name: 'email', nullable: false })
    email!: string;

    @Column({ type: "varchar", name: "tenant_id", nullable: false })
    tenantId!: string;

    @CreateDateColumn({ name: "created_at", nullable: false })
    createdAt!: Date;

    @OneToMany(() => Task, (task) => task.user)
    tasks!: Task[];
}