import { Injectable } from "@nestjs/common";
import * as crypto from "crypto";

@Injectable()
export class DatabaseService {
	generateId(): string {
		return crypto.randomUUID();
	}
}