import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text", { nullable: false })
  objectID!: string;

  @Column("text", { nullable: true })
  title!: string | null;

  @Column("int", { nullable: true })
  story_id!: number | null;

  @Column("text", { nullable: true })
  author!: string | null;

  @Column("text", {
    array: true,
    default: [],
  })
  tags!: string[];

  @Column("timestamp without time zone", { nullable: true })
  created_at!: Date | null;

  @Column("text", { nullable: true })
  url!: string | null;

  @Column("int", { nullable: true })
  points!: number | null;

  @Column("text", { nullable: true })
  story_text!: string | null;

  @Column("text", { nullable: true })
  comment_text!: string | null;

  @Column("int", { nullable: true })
  num_comments!: number | null;

  @Column("text", { nullable: true })
  story_title!: string | null;

  @Column("text", { nullable: true })
  story_url!: string | null;

  @Column("int", { nullable: true })
  parent_id!: number | null;

  @CreateDateColumn()
  serverCreatedAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

export default Article;
