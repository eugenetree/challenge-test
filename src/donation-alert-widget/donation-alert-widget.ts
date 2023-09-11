import { ID } from "src/_common/types";
import { z } from "zod";

export class DonationAlertWidget {
	id: ID;
	text: string;
	minAmount: number | null;
	maxAmount: number | null;
	specificAmount: number | null;
	userId: ID;
	alertWidgetsGroupId: ID;
}