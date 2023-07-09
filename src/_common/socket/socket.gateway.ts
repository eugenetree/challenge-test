import { WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JoinToRoomEventDto } from './socket.dto';
import { SocketService } from './socket.service';

@WebSocketGateway({
	cors: {
		origin: "*",
	},
})
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;

	constructor(
		private readonly socketService: SocketService,
	) { }

	afterInit() {
		this.socketService.init(this.server);
		console.log('socket gateway initialized');
	}

	handleConnection(client) {
		console.log('client connected');
	}

	handleDisconnect(client) {
		console.log('client disconnected');
	}

	@SubscribeMessage('JOIN_TO_ROOM')
	async joinToRoom(
		@MessageBody() { token, alertWidgetsGroupId }: JoinToRoomEventDto,
		@ConnectedSocket() client: Socket
	) {
		this.socketService.joinToRoom({
			token,
			alertWidgetsGroupId,
			client
		})
	}
}