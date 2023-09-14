import { Injectable } from "@nestjs/common";
import { ID } from "../types";
import { Server, Socket } from "socket.io";
import { UserRepository } from "src/user/user.repository";

// DONATION_TO_PLAY_REGULAR = event when donation was paid and after payment sent to the streamer
// DONATION_TO_PLAY_TEST = event when donation was sent as test (payment phase was skipped)
// DONATION_TO_PLAY_FORCE = event when donation was inited to play out of turn (by streamer)
// DONATION_TO_STOP = event when donation was inited to stop by streamer

type AlertWidgetsGroupEventName =
	| 'DONATION_TO_PLAY_REGULAR'
	| 'DONATION_TO_PLAY_TEST'
	| 'DONATION_TO_PLAY_FORCE'
	| 'DONATION_TO_STOP'

type DonationGoalWidgetEventName =
	| 'DONATION_GOAL_WIDGET_SUM_UPDATED'

type RoomType =
	| 'ALERT_WIDGETS_GROUP'
	| 'DONATION_GOAL_WIDGET'

type EmitAlertWidgetsGroupEventParams =
	| { eventName: 'DONATION_TO_PLAY_REGULAR', data: { donationAlertWidgetId: ID; } } // TODO: add here some info

type EmitDonationGoalWidgetEventParams = 
	| { eventName: 'DONATION_GOAL_WIDGET_SUM_UPDATED', data: { sum: number } }

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
		roomType,
		roomId,
		client
	}: {
		token: string;
		roomType: RoomType;
		roomId: string;
		client: Socket
	}) => {
		// TODO: move logic of verifying user into guard
		const user = await this.userRepository.findOne({ where: { token } });
		const roomUrl = this.getRoomUrl({ roomType, roomId });
		if (user) {
			client.join(roomUrl);
		}
	}

	async emitDonationGoalWidgetEvent({
		widgetId,
	}: {
		widgetId: ID,
	}) {
		
	}

	emitEvent({
		eventName,
		eventData,
		roomId,
	}: {
		eventName: EventName;
		eventData?: unknown;
		roomId?: string;
	}) {
		if (roomId) {
			this.server.to(roomId).emit(eventName, eventData);
		} else {
			this.server.emit(eventName, eventData);
		}
	}

	private getRoomUrl = ({ roomType, roomId }: { roomType: RoomType, roomId: ID }) => { 
		return `${roomType}/${roomId}`
	}
}