import { Module } from "@nestjs/common";
import { SessionModule } from "./session/session.module";
import { TwitchAuthModule } from "./strategies/twitch/twitch-auth.module";
import { AuthSessionGuard } from "./auth-session.guard";

@Module({
	imports: [SessionModule, TwitchAuthModule],
	providers: [],
	exports: [],
})
export class AuthModule { }
