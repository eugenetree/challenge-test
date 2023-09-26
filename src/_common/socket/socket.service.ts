import { Injectable } from '@nestjs/common';
import { ID } from '../types';
import { Server, Socket } from 'socket.io';
import { UserRepository } from 'src/user/user.repository';
import { Donation } from 'src/donation/donation';
import {
  AlertWidgetEventName,
  DonationGoalWidgetEventName,
  RoomType,
} from './socket.events';

type EmitAlertWidgetEventParams =
  | {
      eventName:
        | AlertWidgetEventName.DONATION_ALERT_TO_PLAY_REGULAR
        | AlertWidgetEventName.DONATION_ALERT_TO_PLAY_TEST
        | AlertWidgetEventName.DONATION_ALERT_TO_PLAY_FORCE;
      alertWidgetId: ID;
      data: { donationAlert: ID; donation: Donation };
    }
  | {
      eventName: AlertWidgetEventName.DONATION_ALERT_TO_STOP;
      alertWidgetId: ID;
      data: { donationAlert: ID };
    };

type EmitDonationGoalWidgetEventParams = {
  eventName: DonationGoalWidgetEventName.DONATION_GOAL_SUM_UPDATED;
  donationGoalWidgetId: ID;
  data: { sum: number };
};

@Injectable()
export class SocketService {
  private server: Server;

  constructor(private readonly userRepository: UserRepository) {}

  init = (server: Server) => {
    this.server = server;
  };

  joinToRoom = async ({
    token,
    roomType,
    roomId,
    client,
  }: {
    token: string;
    roomType: RoomType;
    roomId: string;
    client: Socket;
  }) => {
    // TODO: move logic of verifying user into guard
    const user = await this.userRepository.findOne({ where: { token } });
    const roomUrl = this.getRoomUrl({ roomType, roomId });
    if (user) {
      client.join(roomUrl);
    }
  };

  async emitAlertWidgetEvent({
    eventName,
    alertWidgetId,
    data,
  }: EmitAlertWidgetEventParams) {
    const roomUrl = this.getRoomUrl({
      roomType: RoomType.ALERT_WIDGET,
      roomId: alertWidgetId,
    });

    this.server.to(roomUrl).emit(eventName, data);
  }

  async emitDonationGoalWidgetEvent({
    eventName,
    donationGoalWidgetId,
    data,
  }: EmitDonationGoalWidgetEventParams) {
    const roomUrl = this.getRoomUrl({
      roomType: RoomType.DONATION_GOAL_WIDGET,
      roomId: donationGoalWidgetId,
    });

    this.server.to(roomUrl).emit(eventName, data);
  }

  private getRoomUrl = ({
    roomType,
    roomId,
  }: {
    roomType: RoomType;
    roomId: ID;
  }) => {
    return `${roomType}/${roomId}`;
  };
}
