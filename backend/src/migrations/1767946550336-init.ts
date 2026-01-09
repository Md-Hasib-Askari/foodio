import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1767946550336 implements MigrationInterface {
    name = 'Init1767946550336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("categoryId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_c9594c262e6781893a1068d91be" PRIMARY KEY ("categoryId"))`);
        await queryRunner.query(`CREATE TABLE "menu_items" ("menuItemId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" character varying(255), "imageUrl" character varying(255) NOT NULL, "price" numeric(10,2) NOT NULL, "available" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" uuid NOT NULL, "orderId" uuid, CONSTRAINT "UQ_69bf08c96d8fada9f36f101216e" UNIQUE ("name"), CONSTRAINT "PK_fd65f248548a5469696184bd038" PRIMARY KEY ("menuItemId"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("orderId" uuid NOT NULL DEFAULT uuid_generate_v4(), "orderPrice" numeric(10,2) NOT NULL, "status" "public"."orders_status_enum" NOT NULL DEFAULT 'PENDING', "userUserId" uuid, "menuItemId" uuid, CONSTRAINT "PK_41ba27842ac1a2c24817ca59eaa" PRIMARY KEY ("orderId"))`);
        await queryRunner.query(`CREATE TABLE "users" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(100) NOT NULL, "hashedPassword" character varying(100) NOT NULL, "fullName" character varying(100) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "isActive" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`ALTER TABLE "menu_items" ADD CONSTRAINT "FK_d56e5ccc298e8bf721f75a7eb96" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_items" ADD CONSTRAINT "FK_09a6abd8542a009606804951dda" FOREIGN KEY ("orderId") REFERENCES "orders"("orderId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_6a4ebad71685a4ed11e89b3e834" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_f23f3cf2bece7970a8ecda5973d" FOREIGN KEY ("menuItemId") REFERENCES "menu_items"("menuItemId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_f23f3cf2bece7970a8ecda5973d"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_6a4ebad71685a4ed11e89b3e834"`);
        await queryRunner.query(`ALTER TABLE "menu_items" DROP CONSTRAINT "FK_09a6abd8542a009606804951dda"`);
        await queryRunner.query(`ALTER TABLE "menu_items" DROP CONSTRAINT "FK_d56e5ccc298e8bf721f75a7eb96"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "menu_items"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
