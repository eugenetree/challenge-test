import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/_common/database/database.module';
import { OauthProviderRepository } from './oauth-provider.repository';
import { OauthProviderService } from './oauth-provider.service';

@Module({
	imports: [DatabaseModule],
	exports: [OauthProviderService],
	providers: [OauthProviderService, OauthProviderRepository],
})
export class OauthProviderModule { }
