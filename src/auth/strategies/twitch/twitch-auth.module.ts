import { Module } from "@nestjs/common";
import { TwitchAuthController } from "./presentation/twitch-auth.controller";
import { TwitchAuthApiService } from "./infrastructure/twtch-auth-api.service";
import { TwitchAuthService } from "./application/twitch-auth.service";
import { LoggerModule } from "src/_common/logger/logger.module";
import { OauthProviderModule } from "src/oauth-provider/oauth-provide.module";
import { SettingsModule } from "src/_common/settings/settings.module";
import { UserModule } from "src/user/user.module";
import { SessionModule } from "src/auth/session/session.module";

@Module({
	imports: [LoggerModule, SettingsModule, OauthProviderModule, UserModule, SessionModule],
	providers: [TwitchAuthApiService, TwitchAuthService],
	controllers: [TwitchAuthController],
})
export class TwitchAuthModule { }
