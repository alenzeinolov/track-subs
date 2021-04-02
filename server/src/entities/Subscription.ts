import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Subscription extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("money")
  price!: number;

  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user.subscriptions)
  user!: User;
}
