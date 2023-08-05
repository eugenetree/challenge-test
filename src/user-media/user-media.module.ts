import { Module } from "@nestjs/common";
import { FileStorageModule } from "src/_common/file-storage/file-storage.module";
import { AuthModule } from "src/auth/auth.module";
import { UserMediaController } from "./user-media.controller";
import { UserMediaRepository } from "./user-media.repository";
import { UserMediaService } from "./user-media.service";
import { DatabaseModule } from "src/_common/database/database.module";
import { SessionModule } from "src/auth/session/session.module";

@Module({
  imports: [FileStorageModule, AuthModule, SessionModule, DatabaseModule],
  providers: [UserMediaRepository, UserMediaService],
  exports: [UserMediaService],
  controllers: [UserMediaController],
})
export class UserMediaModule {}