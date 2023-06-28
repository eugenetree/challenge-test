import { Injectable } from "@nestjs/common";
import { Donation as DonationDbEntity } from "@prisma/client";
import { PrismaService } from "src/_common/database/prisma.service";
import { Donation } from "./donation";
import { ID } from "src/_common/types";

@Injectable()
export class DonationRepository {
	constructor(private readonly prisma: PrismaService) { }

	create = async ({ data }: { data: Donation }): Promise<Donation> => {
		const createdDonation = await this.prisma.donation.create({
			data: this.fromModelToDbEntity(data),
		});

		return new Donation(this.fromDbEntityToModel(createdDonation));
	}

	findOne = async ({ where }: { where: Partial<Donation> }): Promise<Donation | null> => {
		const foundDonation = await this.prisma.donation.findFirst({ where });
		return foundDonation ?
			new Donation(this.fromDbEntityToModel(foundDonation)) : null;
	}

	updateOne = async (id: ID, { data }: { data: Partial<Omit<Donation, 'id'>> }) => {
		const updatedDonation = await this.prisma.donation.update({
			data,
			where: { id }
		});

		return new Donation(this.fromDbEntityToModel(updatedDonation));
	}

	private fromModelToDbEntity = (donation: Donation) => {
		return {
			...donation,
			paymentData: JSON.stringify(donation.paymentData),
		}
	}

	private fromDbEntityToModel = (entity: DonationDbEntity) => {
		return {
			...entity,
			paymentData: entity.paymentData ? JSON.parse(entity.paymentData) : null,
		}
	}
}