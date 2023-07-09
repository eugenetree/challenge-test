import { Injectable } from "@nestjs/common";
import { ID } from "../types";
import { Server, Socket } from "socket.io";
import { UserRepository } from "src/user/user.repository";

@Injectable()
export class SocketService {
	private server: Server;
	
	constructor(
		private readonly userRepository: UserRepository,
	) { }

	init = (server: Server) => {
		this.server = server;
	}

	joinToRoom = async ({
		token,
		alertWidgetsGroupId,
		client
	}: {
		token: string;
		alertWidgetsGroupId: ID;
		client: Socket
	}) => {
		const user = await this.userRepository.findOne({ where: { token } });
		if (user) {
			client.join(alertWidgetsGroupId);
		}
	}

	emitToRoom = async ({
		roomId,
		eventName,
		eventData
	}: {
		roomId: string,
		eventName: string;
		eventData?: unknown
	}) => {
		this.server.to(roomId).emit(eventName, eventData);
	}
}