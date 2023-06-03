import { Module } from "@nestjs/common";
import { UserReposService } from "./users.repository.service";

@Module({
    providers: [UserReposService],
    exports: [UserReposService]
})
export class DatabaseModule {}