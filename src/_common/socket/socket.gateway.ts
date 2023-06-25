import { WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway()
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server;

	afterInit() {
		console.log('socket gateway initialized');
	}

	handleConnection(client) {
		console.log('client connected');
	}

	handleDisconnect(client) {
		console.log('client disconnected');
	}

	
}