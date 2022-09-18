import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ArticleMigration1663430498588 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "article",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "objectID",
            type: "text",
            isUnique: false, // FIXME db - unique restriction?
            isNullable: false,
          },
          {
            name: "title",
            type: "text",
            isNullable: true,
          },
          {
            name: "story_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "author",
            type: "text",
            isNullable: true,
          },
          {
            name: "tags",
            type: "text",
            isNullable: true,
            isArray: true
          },
          {
            name: "created_at",
            // type: "timestamp",
            type: "timestamp without time zone", // pg only
            isNullable: true,
          },
          {
            name: "url",
            type: "text",
            isNullable: true,
          },
          {
            name: "points",
            type: "int",
            isNullable: true,
          },
          {
            name: "story_text",
            type: "text",
            isNullable: true,
          },
          {
            name: "comment_text",
            type: "text",
            isNullable: true,
          },
          {
            name: "num_comments",
            type: "int",
            isNullable: true,
          },
          {
            name: "story_title",
            type: "text",
            isNullable: true,
          },
          {
            name: "story_url",
            type: "text",
            isNullable: true,
          },
          {
            name: "parent_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "serverCreatedAt",
            // type: "timestamp",
            type: "timestamp without time zone", // pg only
            default: "now()",
          },
          {
            name: "updatedAt",
            // type: "timestamp",
            type: "timestamp without time zone", // pg only
            default: "now()",
          },
          {
            name: "deletedAt",
            // type: "timestamp",
            type: "timestamp with time zone", // pg only
            isNullable: true,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("article");
  }
}
