import { Module } from '@nestjs/common';
import { OauthProviderRepository } from './domain/oauth-provider.repository.type';
import { BaseOauthProviderRepository } from './infrastructure/oauth-provider.repository';
import { DatabaseModule } from 'src/_common/database/database.module';

const shared = [
	{
		provide: OauthProviderRepository,
		useClass: BaseOauthProviderRepository,
	},
]

@Module({
	imports: [DatabaseModule],
	exports: [...shared],
	providers: [...shared],
})
export class OauthProviderModule { }
