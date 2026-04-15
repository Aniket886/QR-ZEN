export interface QRFormValues {
  [key: string]: string;
}

export interface Theme {
  mode: 'light' | 'dark';
  toggle: () => void;
}