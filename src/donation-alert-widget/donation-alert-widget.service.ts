import { Injectable } from "@nestjs/common";
import { ID } from "src/_common/types";
import { DonationAlertWidgetRepository } from "./donation-alert-widget.repository";

@Injectable()
export class DonationAlertWidgetService {
  constructor(
    private readonly donationAlertWidgetRepository: DonationAlertWidgetRepository,
  ) { }

  create(data: { userId: ID; alertWidgetsGroupId: ID }) {
    return this.donationAlertWidgetRepository.create({
      data: { ...data, text: 'for now just some demo text', minAmount: 0 }
    });
  }
}