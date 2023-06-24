import { Module } from '@nestjs/common';
import { UserRepository } from './domain/user.repository.type';
import { BaseUserRepository } from './infrastructure/user.repository';
import { UserService } from './application/user.service';
import { OauthProviderModule } from 'src/oauth-provider/oauth-provide.module';
import { DatabaseModule } from 'src/_common/database/database.module';

const shared = [
	{
		provide: UserRepository,
		useClass: BaseUserRepository,
	},
]

@Module({
	imports: [DatabaseModule, OauthProviderModule],
	exports: [...shared, UserService],
	providers: [...shared, UserService],
})
export class UserModule { }
