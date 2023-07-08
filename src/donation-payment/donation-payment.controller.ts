import { Body, Controller, HttpCode, Post, Query, Res } from '@nestjs/common';
import { DonationPaymentUsecase } from './donation-payment.usecase';
import { CreatePaymentUrlDto, DonationPaymentCallbackBodyDto, DonationPaymentCallbackQueryDto } from './donation-payment.dto';
import { DonationUsecase } from 'src/donation/donation.usecase';

@Controller('donations/payment')
export class DonationPaymentController {
  constructor(
    private readonly donationPaymentService: DonationPaymentUsecase,
    private readonly donationUsecase: DonationUsecase,
  ) { }

  @Post()
  async createPaymentUrl(
    @Body() dto: CreatePaymentUrlDto,
  ) {
    const paymentUrl = await this.donationPaymentService.createPaymentUrl({
      ...dto,
      callbackUrlPathAfterPayment: 'donation-payments/callback',
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
    this.donationUsecase.processSuccessfulDonation(id, paymentData);
  }
}