import { WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, WsException, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JoinToRoomEventDto } from './socket.dto';
import { SocketService } from './socket.service';
import { UseFilters, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { SocketCallbakFilter } from './socket.filter';
import { SocketCallbackData } from './socket.type';

// TODO: implement solution with passing auth token via socket-io headers instead of request params
// @UseGuards(SocketTokenGuard)  
@UseFilters(new SocketCallbakFilter())
@UsePipes(new ZodValidationPipe())
@WebSocketGateway({
	cors: {
		origin: "*",
	},
})
export class SocketGateway implements OnGatewayInit {
	@WebSocketServer() server: Server;

	constructor(
		private readonly socketService: SocketService,
	) { }

	afterInit() {
		this.socketService.init(this.server);
	}

	@SubscribeMessage('JOIN_TO_ROOM')
	async joinToRoom(
		@MessageBody() { token, roomId, roomType }: JoinToRoomEventDto,
		@ConnectedSocket() client: Socket
	): Promise<SocketCallbackData> {
		try {
			await this.socketService.joinToRoom({
				client,
				token,
				roomType,
				roomId,
			})
			return {
				status: 'success',
				data: 'connected',
			}
		} catch (error) {
			return {
				status: 'fail',
				data: JSON.stringify(error),
			}
		}
	}
}