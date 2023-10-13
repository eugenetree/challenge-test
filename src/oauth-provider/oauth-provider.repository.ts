import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_common/database/prisma.service';
import { OauthProvider } from './oauth-provider';
import { Optional } from 'src/_common/types';
import { OmitBaseModel } from 'src/_common/database/database.types';

@Injectable()
export class OauthProviderRepository {
  constructor(private readonly prisma: PrismaService) {}

  create = async ({
    data,
  }: {
    data: OmitBaseModel<OauthProvider>;
  }): Promise<OauthProvider> => {
    return this.prisma.oauthProvider.create({ data });
  };

  findOne = async ({
    where,
  }: {
    where: Partial<OauthProvider>;
  }): Promise<OauthProvider | null> => {
    return this.prisma.oauthProvider.findFirst({ where });
  };
}
