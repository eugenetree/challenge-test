// DONATION_TO_PLAY_REGULAR = event when donation was paid and after payment sent to the streamer
// DONATION_TO_PLAY_TEST = event when donation was sent as test (payment phase was skipped)
// DONATION_TO_PLAY_FORCE = event when donation was inited to play out of turn (by streamer)
// DONATION_TO_STOP = event when donation was inited to stop by streamer

export enum AlertWidgetEventName {
  DONATION_ALERT_TO_PLAY_REGULAR = 'DONATION_ALERT_TO_PLAY_REGULAR',
  DONATION_ALERT_TO_PLAY_TEST = 'DONATION_ALERT_TO_PLAY_TEST',
  DONATION_ALERT_TO_PLAY_FORCE = 'DONATION_ALERT_TO_PLAY_FORCE',
  DONATION_ALERT_TO_STOP = 'DONATION_ALERT_TO_STOP',
}

export enum DonationGoalWidgetEventName {
  DONATION_GOAL_SUM_UPDATED = 'DONATION_GOAL_SUM_UPDATED',
}

export enum RoomType {
  ALERT_WIDGET = 'ALERT_WIDGET',
  DONATION_GOAL_WIDGET = 'DONATION_GOAL_WIDGET',
}
