import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1565733008148 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `banstatus` (`id` int NOT NULL AUTO_INCREMENT, `isBanned` tinyint NOT NULL DEFAULT 0, `description` varchar(255) NOT NULL DEFAULT 'This user is not banned!', PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `blacklist` (`id` int NOT NULL AUTO_INCREMENT, `token` varchar(255) NOT NULL, `date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `role` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `isDeleted` tinyint NOT NULL DEFAULT 0, `banstatusId` int NULL, UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), UNIQUE INDEX `REL_15de78a2ad5e6dbfe54c777d7c` (`banstatusId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_roles_role` (`userId` int NOT NULL, `roleId` int NOT NULL, INDEX `IDX_5f9286e6c25594c6b88c108db7` (`userId`), INDEX `IDX_4be2f7adf862634f5f803d246b` (`roleId`), PRIMARY KEY (`userId`, `roleId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_15de78a2ad5e6dbfe54c777d7c7` FOREIGN KEY (`banstatusId`) REFERENCES `banstatus`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_roles_role` ADD CONSTRAINT `FK_5f9286e6c25594c6b88c108db77` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_roles_role` ADD CONSTRAINT `FK_4be2f7adf862634f5f803d246b8` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user_roles_role` DROP FOREIGN KEY `FK_4be2f7adf862634f5f803d246b8`");
        await queryRunner.query("ALTER TABLE `user_roles_role` DROP FOREIGN KEY `FK_5f9286e6c25594c6b88c108db77`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_15de78a2ad5e6dbfe54c777d7c7`");
        await queryRunner.query("DROP INDEX `IDX_4be2f7adf862634f5f803d246b` ON `user_roles_role`");
        await queryRunner.query("DROP INDEX `IDX_5f9286e6c25594c6b88c108db7` ON `user_roles_role`");
        await queryRunner.query("DROP TABLE `user_roles_role`");
        await queryRunner.query("DROP INDEX `REL_15de78a2ad5e6dbfe54c777d7c` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `role`");
        await queryRunner.query("DROP TABLE `blacklist`");
        await queryRunner.query("DROP TABLE `banstatus`");
    }

}
