import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ArticleMigration1663430498588 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Article",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "username",
            type: "varchar",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "password",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "ip",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "last_login",
            isNullable: true,
            // type: "timestamp",
            type: "timestamp with time zone", // pg only
          },
          {
            name: "created_at",
            // type: "timestamp",
            type: "timestamp with time zone", // pg only
            default: "now()",
          },
          {
            name: "updated_at",
            // type: "timestamp",
            type: "timestamp with time zone", // pg only
            default: "now()",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("Article");
  }
}
