import { ID } from "src/_common/types";

export class OauthProvider {
	id: ID;
	accessToken: string;
	refreshToken: string;
	profileId: string;
	type: "twitch" | "youtube";
	userId: ID;
};