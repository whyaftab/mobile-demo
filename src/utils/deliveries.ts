import { DeliveryStatusType } from '@screens/dashboard/types';

export const DELIVERY_STATUS: { [key: number]: DeliveryStatusType } = {
  0: 'not_started',
  1: 'in_progress',
  2: 'complete',
};
