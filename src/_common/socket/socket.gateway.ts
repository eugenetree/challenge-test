import { WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
	cors: {
		origin: "*",
	},
})
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;

	afterInit() {
		console.log('socket gateway initialized');
	}

	handleConnection(client) {
		console.log('client connected');
	}

	handleDisconnect(client) {
		console.log('client disconnected');
	}

	@SubscribeMessage('events')
	handleEvent(
		@MessageBody() data: string,
		@ConnectedSocket() client: Socket,
	): string {
		console.log('data', data);
		return data;
	}
}