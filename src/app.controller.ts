import { Controller, Get, Req } from "@nestjs/common";

@Controller()
export class AppController {
	constructor() { }

	@Get('ping')
	async pingGet() {
		return 'pong';
	}
}