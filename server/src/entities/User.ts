import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Subscription } from "./Subscription";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  fullName!: string;

  @Column("text")
  password!: string;

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions!: Subscription[];
}
