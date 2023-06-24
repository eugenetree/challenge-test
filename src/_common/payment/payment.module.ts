import { Module } from '@nestjs/common';
import { UtilsModule } from '../utils/utils.module';
import { PaymentService } from './payment.service';

@Module({
	imports: [UtilsModule],
	providers: [PaymentService],
	exports: [PaymentService],
})
export class PaymentModule {}
