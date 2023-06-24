import { OauthProvider, OauthProviderFields } from "src/oauth-provider/domain/oauth-provider";
import { User, UserFields } from "./user";

export abstract class UserRepository {
	findOne: (query: { where: Partial<UserFields> }) => Promise<User | null>;

	findOneByOauthProvider: (query: { where: Partial<OauthProviderFields> }) => Promise<User | null>;

	createWithOauthProvider: (payload: { data: { user: User, oauthProvider: OauthProvider } }) => Promise<User>;
}