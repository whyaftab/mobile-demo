import { RootStackParamList } from '@navigation/types';

declare global {
  namespace ReactNavigation {
    type RootParamList = RootStackParamList;
  }
}
