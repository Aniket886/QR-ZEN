import { QRGeneratorOptions, QRType } from '@/config/qr-types';

export interface QRFormValues {
  [key: string]: string;
}

export interface Theme {
  mode: 'light' | 'dark';
  toggle: () => void;
}

export interface QRStateSnapshot {
  qrType: QRType;
  formValues: QRFormValues;
  options: QRGeneratorOptions;
}

export interface QRPreset {
  id: string;
  name: string;
  createdAt: string;
  snapshot: QRStateSnapshot;
}
