import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'uuid', name: 'user_id' })
    userId!: string;

    @Column({ type: "varchar", name: "tenant_id" })
    tenantId!: string;

    @Column({ type: "varchar", name: "title" })
    title!: string;

    @Column({ type: "varchar", name: "status" })
    status!: string;

    @Column({ type: "varchar" })
    priority!: string

    @CreateDateColumn({ name: 'crated_at' })
    createdAt!: Date

    @ManyToOne(() => User, (user) => user.tasks)
    @JoinColumn({ name: 'user_id' })
    user!: User;
}