import { Injectable } from "@nestjs/common";
import { Donation as DonationDbEntity } from "@prisma/client";
import { PrismaService } from "src/_common/database/prisma.service";
import { Donation } from "../domain/donation";
import { DonationRepository } from "../domain/donation.repository.type";

@Injectable()
export class BaseDonationRepository implements DonationRepository {
	constructor(private readonly prisma: PrismaService) { }

	create: DonationRepository['create'] = async (payload) => {
		const createdDonation = await this.prisma.donation.create({
			data: this.fromModelToDbEntity(payload.data),
		});

		return new Donation(this.fromDbEntityToModel(createdDonation));
	}

	findOne: DonationRepository['findOne'] = async ({ where }) => {
		const foundDonation = await this.prisma.donation.findFirst({ where });
		return foundDonation ?
			new Donation(this.fromDbEntityToModel(foundDonation)) : null;
	}

	updateOne: DonationRepository['updateOne'] = async ({ data }) => {
		const updatedDonation = await this.prisma.donation.update({
			data,
			where: { id: data.id }
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