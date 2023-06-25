import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserRepository } from "src/user/user.repository";

@Injectable()
export class AuthTokenGuard implements CanActivate {
	constructor(
		private readonly userRepository: UserRepository,
	) { }

	async canActivate(
		context: ExecutionContext,
	): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = request.params;
		const user = await this.userRepository.findOne({ where: { token } });
		return Boolean(user);
	}
}
