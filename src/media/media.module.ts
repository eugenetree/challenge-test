import { Module } from "@nestjs/common";
import { FileStorageModule } from "src/_common/file-storage/file-storage.module";
import { AuthModule } from "src/auth/auth.module";
import { MediaController } from "./media.controller";
import { ImageRepository } from "./image.repository";
import { MediaService } from "./media.service";
import { DatabaseModule } from "src/_common/database/database.module";
import { SessionModule } from "src/auth/session/session.module";

@Module({
  imports: [FileStorageModule, AuthModule, SessionModule, DatabaseModule],
  providers: [ImageRepository, MediaService],
  exports: [MediaService],
  controllers: [MediaController],
})
export class UserMediaModule {}