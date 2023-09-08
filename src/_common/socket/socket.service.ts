import { Injectable } from "@nestjs/common";
import { ID } from "../types";
import { Server, Socket } from "socket.io";
import { UserRepository } from "src/user/user.repository";

// DONATION_TO_PLAY_REGULAR = event when donation was paid and after payment sent to the streamer
// DONATION_TO_PLAY_TEST = event when donation was sent as test (payment phase was skipped)
// DONATION_TO_PLAY_FORCE = event when donation was inited to play out of turn (by streamer)
// DONATION_TO_STOP = event when donation was inited to stop by streamer

type EventName = 'DONATION_TO_PLAY_REGULAR' | 'DONATION_TO_PLAY_TEST' | 'DONATION_TO_PLAY_FORCE' | 'DONATION_TO_STOP';

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
		eventName: EventName;
		eventData?: unknown
	}) => {
		this.server.to(roomId).emit(eventName, eventData);
	}
}