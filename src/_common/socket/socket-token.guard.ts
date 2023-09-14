import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserRepository } from "src/user/user.repository";

@Injectable()
export class SocketTokenGuard implements CanActivate {
	constructor(
    private readonly userRepository: UserRepository,
	) { }

	async canActivate(
		context: ExecutionContext,
	): Promise<boolean> {
		const request = context.switchToWs().getData();
		const userByToken = await this.userRepository.findOne({ where: { token: request.token } });
		return Boolean(userByToken);
	}
}
