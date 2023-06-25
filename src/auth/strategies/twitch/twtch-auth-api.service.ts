import { Injectable } from "@nestjs/common";
import axios from "axios";
import { SettingsService } from "src/_common/settings/settings.service";

@Injectable()
export class TwitchAuthApiService {
	constructor(
		private readonly settingsService: SettingsService,
	) {}

	async getDataByOauthCode(code: string): Promise<{ accessToken: string; refreshToken: string; profile: any; }> {
    const tokensResponse = await axios.post('https://id.twitch.tv/oauth2/token', {
      client_id: this.settingsService.TWITCH_CLIENT_ID,
      client_secret: this.settingsService.TWITCH_CLIENT_SECRET,
      code,
      // redirectUrl is needed only to match oauth2 requirements,
      // when request is going through axios - there is no redirect
      redirect_uri: 'http://localhost:3000',
      grant_type: 'authorization_code',
    })

    const accessToken = tokensResponse.data.access_token;
    const refreshToken = tokensResponse.data.refresh_token;

    const usersResponse = await axios.get('https://api.twitch.tv/helix/users', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Client-Id': this.settingsService.TWITCH_CLIENT_ID,
      }
    });

    const profile = usersResponse.data.data[0];

    return {
      accessToken,
      refreshToken,
      profile,
    }
  }
}