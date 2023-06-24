import { Injectable } from "@nestjs/common";

@Injectable()
export class LoggerService {
	info(context: string, message: string) {
		console.log(`${context} | info | ${message}`)
	};

	warning(context: string, message: string) {
		console.log(`${context} | warning | ${message}`)
	}

	error(context: string, message: string, trace?: string) {
		console.error(`${context} | error | ${message}`) + (trace ? ` | ${trace}` : '');
	};
}