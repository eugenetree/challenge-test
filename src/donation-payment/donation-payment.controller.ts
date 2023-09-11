import { Body, Controller, HttpCode, Post, Query, Res } from '@nestjs/common';
import { DonationPaymentService } from './donation-payment.service';
import { CreatePaymentUrlDto, DonationPaymentCallbackBodyDto, DonationPaymentCallbackQueryDto } from './donation-payment.dto';
import { DonationService } from 'src/donation/donation.service';
import { LoggerService } from 'src/_common/logger/logger.service';

@Controller('donations/payment')
export class DonationPaymentController {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly donationPaymentService: DonationPaymentService,
    private readonly donationService: DonationService,
  ) { }

  @Post()
  async createPaymentUrl(
    @Body() dto: CreatePaymentUrlDto,
  ) {
    const paymentUrl = await this.donationPaymentService.createPaymentUrl({
      ...dto,
      callbackUrlPathAfterPayment: 'donations/payment/callback',
    });

    return paymentUrl;
  }

  @Post('callback')
  // 200 code is needed because of 'fondy' requirements
  @HttpCode(200)
  handlePaymentSuccessCallback(
    @Body() paymentData: DonationPaymentCallbackBodyDto,
    @Query() { id }: DonationPaymentCallbackQueryDto,
  ) {
    this.loggerService.info(DonationPaymentController.name, `Processing successful donation payment with id ${id}`);
    this.donationService.processSuccessfulDonation(id, paymentData);
  }
}