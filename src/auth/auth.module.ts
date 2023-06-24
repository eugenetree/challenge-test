import { Module } from "@nestjs/common";
import { SessionModule } from "./session/session.module";
import { TwitchAuthModule } from "./strategies/twitch/twitch-auth.module";

@Module({
	imports: [SessionModule, TwitchAuthModule],
})
export class AuthModule { }
