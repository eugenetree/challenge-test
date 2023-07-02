import { z } from "zod";

const variablesSchema = z.object({
	ENV: z.enum(["development", "production"]),
	DB_URL: z.string(),
	DB_ROOT_PASSWORD: z.string(),
	FRONT_APP_URL: z.string(),
	BACK_APP_URL: z.string(),
	TWITCH_CLIENT_ID: z.string(),
	TWITCH_CLIENT_SECRET: z.string(),
	FONDY_MERCHANT_ID: z.string(),
	DONATION_CIPHER_PASSPHRASE: z.string(),
	DONATION_CIPHER_IV: z.string(),
});

export class SettingsService implements z.input<typeof variablesSchema>{
	ENV: "development" | "production";
	DB_URL: string;
	DB_ROOT_PASSWORD: string;
	FRONT_APP_URL: string;
	BACK_APP_URL: string;
	TWITCH_CLIENT_ID: string;
	TWITCH_CLIENT_SECRET: string;
	FONDY_MERCHANT_ID: string;
	DONATION_CIPHER_PASSPHRASE: string;
	DONATION_CIPHER_IV: string;

	constructor() {
		try {
			const variables = variablesSchema.parse({
				ENV: process.env.ENV,
				DB_URL: process.env.DB_URL,
				DB_ROOT_PASSWORD: process.env.DB_ROOT_PASSWORD,
				FRONT_APP_URL: process.env.FRONT_APP_URL,
				BACK_APP_URL: process.env.BACK_APP_URL,
				TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID,
				TWITCH_CLIENT_SECRET: process.env.TWITCH_CLIENT_SECRET,
				FONDY_MERCHANT_ID: process.env.FONDY_MERCHANT_ID,
				DONATION_CIPHER_PASSPHRASE: process.env.DONATION_CIPHER_PASSPHRASE,
				DONATION_CIPHER_IV: process.env.DONATION_CIPHER_IV,
			});

			Object.assign(this, variables);
		} catch (err) {
			throw new Error(`Some environment variables are missing: ${err}`);
		}
	}
}