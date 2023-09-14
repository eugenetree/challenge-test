import { ID } from "src/_common/types";

export class DonationGoalWidget {
	id: ID;
	textWhenRaisingIsInProgress: string;
	textWhenRaisingIsFinished: string;
  endDate: Date;
  isWidgetEnabled: boolean;
	userId: ID;
}