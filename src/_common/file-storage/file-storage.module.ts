import { Module } from "@nestjs/common";
import { FileStorageService } from "./file-storage.service";
import { SettingsModule } from "../settings/settings.module";

@Module({
	imports: [SettingsModule],
	providers: [FileStorageService],
	exports: [FileStorageService],
})
export class FileStorageModule {}