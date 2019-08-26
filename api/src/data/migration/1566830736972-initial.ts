import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1566830736972 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `banstatus` (`id` int NOT NULL AUTO_INCREMENT, `isBanned` tinyint NOT NULL DEFAULT 0, `description` varchar(255) NOT NULL DEFAULT 'This user is not banned!', PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `blacklist` (`id` int NOT NULL AUTO_INCREMENT, `token` varchar(255) NOT NULL, `date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `role` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `book` (`id` varchar(36) NOT NULL, `title` varchar(50) NOT NULL, `author` varchar(50) NOT NULL, `topic` varchar(20) NOT NULL, `language` varchar(20) NOT NULL, `timestamp` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `isDeleted` tinyint NOT NULL DEFAULT 0, `averageRating` enum ('Awful', 'Bad', 'Average', 'Good', 'Excellent') NOT NULL, `isTaken` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX `IDX_c10a44a29ef231062f22b1b7ac` (`title`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `borrow_type` (`id` varchar(36) NOT NULL, `name` enum ('Taken', 'Returned') NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `library_event` (`id` varchar(36) NOT NULL, `timestamp` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, `bookId` varchar(36) NULL, `borrowId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(15) NOT NULL, `password` varchar(255) NOT NULL, `email` varchar(15) NOT NULL, `isDeleted` tinyint NOT NULL DEFAULT 0, `banstatusId` int NULL, UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), UNIQUE INDEX `REL_15de78a2ad5e6dbfe54c777d7c` (`banstatusId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `rating_type` (`id` varchar(36) NOT NULL, `name` enum ('Awful', 'Bad', 'Average', 'Good', 'Excellent') NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `book_review` (`id` varchar(36) NOT NULL, `comment` varchar(2000) NOT NULL, `timestamp` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `isDeleted` tinyint NOT NULL DEFAULT 0, `userId` int NULL, `bookId` varchar(36) NULL, `ratingId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_roles_role` (`userId` int NOT NULL, `roleId` int NOT NULL, INDEX `IDX_5f9286e6c25594c6b88c108db7` (`userId`), INDEX `IDX_4be2f7adf862634f5f803d246b` (`roleId`), PRIMARY KEY (`userId`, `roleId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `library_event` ADD CONSTRAINT `FK_f70e5fd64a62a0b34d955e5b5d1` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `library_event` ADD CONSTRAINT `FK_15f2b2a4fd041cf71571b4b5a59` FOREIGN KEY (`bookId`) REFERENCES `book`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `library_event` ADD CONSTRAINT `FK_59f42d3703a71b399e781c2637c` FOREIGN KEY (`borrowId`) REFERENCES `borrow_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_15de78a2ad5e6dbfe54c777d7c7` FOREIGN KEY (`banstatusId`) REFERENCES `banstatus`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `book_review` ADD CONSTRAINT `FK_bae7725a0fe20b67dc03d5a4fd9` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `book_review` ADD CONSTRAINT `FK_d47a02807234f545466e113ca0b` FOREIGN KEY (`bookId`) REFERENCES `book`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `book_review` ADD CONSTRAINT `FK_cbe9cc64b7981deec9845a7b249` FOREIGN KEY (`ratingId`) REFERENCES `rating_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_roles_role` ADD CONSTRAINT `FK_5f9286e6c25594c6b88c108db77` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_roles_role` ADD CONSTRAINT `FK_4be2f7adf862634f5f803d246b8` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user_roles_role` DROP FOREIGN KEY `FK_4be2f7adf862634f5f803d246b8`");
        await queryRunner.query("ALTER TABLE `user_roles_role` DROP FOREIGN KEY `FK_5f9286e6c25594c6b88c108db77`");
        await queryRunner.query("ALTER TABLE `book_review` DROP FOREIGN KEY `FK_cbe9cc64b7981deec9845a7b249`");
        await queryRunner.query("ALTER TABLE `book_review` DROP FOREIGN KEY `FK_d47a02807234f545466e113ca0b`");
        await queryRunner.query("ALTER TABLE `book_review` DROP FOREIGN KEY `FK_bae7725a0fe20b67dc03d5a4fd9`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_15de78a2ad5e6dbfe54c777d7c7`");
        await queryRunner.query("ALTER TABLE `library_event` DROP FOREIGN KEY `FK_59f42d3703a71b399e781c2637c`");
        await queryRunner.query("ALTER TABLE `library_event` DROP FOREIGN KEY `FK_15f2b2a4fd041cf71571b4b5a59`");
        await queryRunner.query("ALTER TABLE `library_event` DROP FOREIGN KEY `FK_f70e5fd64a62a0b34d955e5b5d1`");
        await queryRunner.query("DROP INDEX `IDX_4be2f7adf862634f5f803d246b` ON `user_roles_role`");
        await queryRunner.query("DROP INDEX `IDX_5f9286e6c25594c6b88c108db7` ON `user_roles_role`");
        await queryRunner.query("DROP TABLE `user_roles_role`");
        await queryRunner.query("DROP TABLE `book_review`");
        await queryRunner.query("DROP TABLE `rating_type`");
        await queryRunner.query("DROP INDEX `REL_15de78a2ad5e6dbfe54c777d7c` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `library_event`");
        await queryRunner.query("DROP TABLE `borrow_type`");
        await queryRunner.query("DROP INDEX `IDX_c10a44a29ef231062f22b1b7ac` ON `book`");
        await queryRunner.query("DROP TABLE `book`");
        await queryRunner.query("DROP TABLE `role`");
        await queryRunner.query("DROP TABLE `blacklist`");
        await queryRunner.query("DROP TABLE `banstatus`");
    }

}
