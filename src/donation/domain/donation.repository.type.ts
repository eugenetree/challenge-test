import { Donation, DonationFields } from "./donation";

export abstract class DonationRepository {
	create: (payload: { data: Donation }) => Promise<Donation>;

	findOne: (query: { where: Partial<DonationFields> }) => Promise<Donation | null>;

	updateOne: (payload: { data: Donation }) => Promise<Donation>;
}