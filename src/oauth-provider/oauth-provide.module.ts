import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/_common/database/database.module';
import { OauthProviderRepository } from './oauth-provider.repository';

@Module({
	imports: [DatabaseModule],
	exports: [OauthProviderRepository],
	providers: [OauthProviderRepository],
})
export class OauthProviderModule { }
