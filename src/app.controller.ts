import { Controller, Get } from "@nestjs/common";
import { UserMediaService } from "./user-media/user-media.service";

@Controller()
export class AppController {
	constructor() { }

	@Get('ping')
	async ping() {
		return 'pong';
	}
}