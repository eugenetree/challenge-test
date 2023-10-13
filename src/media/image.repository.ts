import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_common/database/prisma.service';
import { Image } from './image';
import { OmitBaseModel } from 'src/_common/database/database.types';

@Injectable()
export class ImageRepository {
  constructor(private readonly prisma: PrismaService) {}

  create = async ({
    data,
  }: {
    data: OmitBaseModel<Image, 'userId'>;
  }): Promise<Image> => {
    return this.prisma.image.create({ data });
  };

  findOne = async ({
    where,
  }: {
    where: Partial<Image>;
  }): Promise<Image | null> => {
    return this.prisma.image.findFirst({ where });
  };

  findMany = async ({ where }: { where: Partial<Image> }): Promise<Image[]> => {
    return this.prisma.image.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  };
}
