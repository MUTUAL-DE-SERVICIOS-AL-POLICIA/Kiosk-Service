import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { NatsService } from 'src/common';
import { Repository } from 'typeorm';
import { KioskAuthenticationData } from './entities/kiosk-authentication-data.entity';

@Injectable()
export class KioskService {
  constructor(
    private readonly nats: NatsService,
    @InjectRepository(KioskAuthenticationData)
    private kioskAuthenticationDataRepository: Repository<KioskAuthenticationData>,
  ) {}

  async getDataPerson(identityCard: string) {
    const dataPerson = await this.nats.fetchAndClean(
      { term: identityCard, field: 'identityCard' },
      'person.findOne',
      [
        'uuidColumn',
        'cityBirthId',
        'pensionEntityId',
        'financialEntityId',
        'dueDate',
        'isDuedateUndefined',
        'gender',
        'civilStatus',
        'surnameHusband',
        'deathCertificationNumber',
        'reasonDeath',
        'phoneNumber',
        'nua',
        'accountNumber',
        'sigepStatus',
        'idPersonSeansir',
        'personAffiliates',
        'birthDate',
        'dateDeath',
        'deathCertification',
        'createdAt',
        'updatedAt',
        'deletedAt',
        'personFingerprints',
        'deathCertificateNumber',
        'cellPhoneNumber',
        'idPersonSenasir',
      ],
    );
    if (!dataPerson.serviceStatus)
      throw new RpcException({
        code: 404,
        message: 'Persona no encontrada',
      });
    const { firstName, lastName, secondName, mothersLastName, ...data } =
      dataPerson;
    return {
      fullName: [firstName, secondName, lastName, mothersLastName]
        .filter(Boolean)
        .join(' '),
      ...data,
    };
  }
  async saveDataKioskAuth(data: any) {
    const dataSaved = await this.kioskAuthenticationDataRepository.save(data);
    return dataSaved;
  }

  async savePhotos(personId: number, hasCI: boolean, hasFace: boolean) {
    const now = new Date();
    const formattedDate = this.formatCurrentDate(now);
    const photos = [];

    if (hasCI) {
      photos.push({
        fileId: 'ci',
        path: `/Person/images/kiosk/${personId}/ci/${formattedDate}-photoIdentityCard.png`,
      });
    }

    if (hasFace) {
      photos.push({
        fileId: 'face',
        path: `/Person/images/kiosk/${personId}/face/${formattedDate}-photoFace.png`,
      });
    }
    return photos;
  }
  private formatCurrentDate(date: Date): string {
    const datePart = date.toLocaleDateString('en-GB');
    const timePart = date.toLocaleTimeString('en-GB').replace(/:/g, '');
    return `${datePart.split('/').reverse().join('-')}-${timePart}`;
  }

  async getFingerprintComparison(personId: number): Promise<any> {
    return await this.nats.firstValue('person.getFingerprints', {
      id: personId,
      columns: ['id', 'quality', 'path'],
    });
  }
}
