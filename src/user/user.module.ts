import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { OauthProviderModule } from 'src/oauth-provider/oauth-provide.module';
import { DatabaseModule } from 'src/_common/database/database.module';
import { UserRepository } from './user.repository';

@Module({
	imports: [DatabaseModule, OauthProviderModule],
	exports: [UserRepository, UserService],
	providers: [UserRepository, UserService],
})
export class UserModule { }
