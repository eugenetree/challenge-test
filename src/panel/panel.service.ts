import { Injectable } from '@nestjs/common';
import { ID } from 'src/_common/types';
import { AlertWidgetsGroupRepository } from 'src/alert-widgets-group/alert-widgets-group.repository';
import { PanelRepository } from './panel.repository';

@Injectable()
export class PanelService {
  constructor(private readonly panelRepository: PanelRepository) {}

  getAlertsPage({ userId }: { userId: ID }) {
    return this.panelRepository.getAlertsPage({ userId });
  }
}
