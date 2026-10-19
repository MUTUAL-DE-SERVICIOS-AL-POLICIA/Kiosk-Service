import { Controller } from '@nestjs/common';
import { KioskService } from './kiosk.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('kiosk')
export class KioskController {
  constructor(private readonly kioskService: KioskService) {}

  @MessagePattern('kiosk.getDataPerson')
  getDataPerson(@Payload() identityCard: string) {
    return this.kioskService.getDataPerson(identityCard);
  }
  @MessagePattern('kiosk.saveDataKioskAuth')
  saveDataKioskAuth(@Payload() data: any) {
    return this.kioskService.saveDataKioskAuth(data);
  }

  @MessagePattern('kiosk.savePhotos')
  savePhotos(
    @Payload()
    data: {
      personId: number;
      hasCI: boolean;
      hasFace: boolean;
    },
  ) {
    return this.kioskService.savePhotos(
      data.personId,
      data.hasCI,
      data.hasFace,
    );
  }

  @MessagePattern('kiosk.getFingerprintComparison')
  getFingerprintComparison(@Payload() personId: number) {
    return this.kioskService.getFingerprintComparison(personId);
  }

  // --- Fondo de retiro y cuota/auxilio mortuorio (afiliado por ci) ---
  // Delegan en KioskService, que llama por NATS al Gateway (patrones pvtBe.kiosk*).
  @MessagePattern('kiosk.retFunRetirementFunds')
  getRetirementFunds(@Payload() payload: { authorization: string; ci: string }) {
    return this.kioskService.getRetirementFunds(payload);
  }

  @MessagePattern('kiosk.quotaAidMortuaries')
  getQuotaAids(@Payload() payload: { authorization: string; ci: string }) {
    return this.kioskService.getQuotaAids(payload);
  }

  @MessagePattern('kiosk.retFunLiquidationPrint')
  printRetFunLiquidation(
    @Payload() payload: {
      authorization: string;
      retirementFundId: string;
    },
  ) {
    return this.kioskService.printRetFunLiquidation(payload);
  }

  @MessagePattern('kiosk.quotaAidLiquidationPrint')
  printQuotaAidLiquidation(
    @Payload() payload: {
      authorization: string;
      quotaAidId: string;
    },
  ) {
    return this.kioskService.printQuotaAidLiquidation(payload);
  }
}
