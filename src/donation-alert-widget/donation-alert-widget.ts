import { ID } from "src/_common/types";

export class DonationAlertWidget {
	id: ID;
	text: string;
	minAmount: number | null;
	maxAmount: number | null;
	specificAmount: number | null;
	userId: ID;
	alertWidgetsGroupId: ID;
}