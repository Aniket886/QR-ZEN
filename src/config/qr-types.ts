export type QRType = 'url' | 'text' | 'wifi' | 'email' | 'phone' | 'sms';

export interface QRTypeConfig {
  id: QRType;
  label: string;
  icon: string;
  description: string;
}

export interface QRTypeField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'password' | 'select';
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  options?: { value: string; label: string }[];
}

export interface QRTypeDefinition {
  config: QRTypeConfig;
  fields: QRTypeField[];
  buildData: (values: Record<string, string>) => string;
}

export const qrTypes: QRTypeDefinition[] = [
  {
    config: {
      id: 'url',
      label: 'URL',
      icon: 'Link',
      description: 'Generate QR code for a website URL',
    },
    fields: [
      {
        name: 'url',
        label: 'Website URL',
        type: 'text',
        placeholder: 'https://example.com',
        required: true,
      },
    ],
    buildData: (values) => values.url,
  },
  {
    config: {
      id: 'text',
      label: 'Text',
      icon: 'FileText',
      description: 'Generate QR code for plain text',
    },
    fields: [
      {
        name: 'text',
        label: 'Text Content',
        type: 'text',
        placeholder: 'Enter your text here',
        required: true,
        maxLength: 1000,
      },
    ],
    buildData: (values) => values.text,
  },
  {
    config: {
      id: 'wifi',
      label: 'WiFi',
      icon: 'Wifi',
      description: 'Generate QR code for WiFi network',
    },
    fields: [
      {
        name: 'ssid',
        label: 'Network Name (SSID)',
        type: 'text',
        placeholder: 'My WiFi Network',
        required: true,
        maxLength: 32,
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter password',
        required: false,
      },
      {
        name: 'encryption',
        label: 'Encryption Type',
        type: 'select',
        required: true,
        options: [
          { value: 'WPA', label: 'WPA/WPA2' },
          { value: 'WEP', label: 'WEP' },
          { value: 'nopass', label: 'None' },
        ],
      },
    ],
    buildData: (values) => {
      const { ssid, password, encryption } = values;
      return `WIFI:T=${encryption};S=${ssid};P=${password};;`;
    },
  },
  {
    config: {
      id: 'email',
      label: 'Email',
      icon: 'Mail',
      description: 'Generate QR code for email address',
    },
    fields: [
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'email@example.com',
        required: true,
      },
      {
        name: 'subject',
        label: 'Subject',
        type: 'text',
        placeholder: 'Email subject',
        required: false,
      },
      {
        name: 'body',
        label: 'Message',
        type: 'text',
        placeholder: 'Email body',
        required: false,
      },
    ],
    buildData: (values) => {
      const { email, subject, body } = values;
      const mailto = `mailto:${email}`;
      const params = new URLSearchParams();
      if (subject) params.append('subject', subject);
      if (body) params.append('body', body);
      return params.toString() ? `${mailto}?${params.toString()}` : mailto;
    },
  },
  {
    config: {
      id: 'phone',
      label: 'Phone',
      icon: 'Phone',
      description: 'Generate QR code for phone number',
    },
    fields: [
      {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        placeholder: '+1234567890',
        required: true,
      },
    ],
    buildData: (values) => `tel:${values.phone}`,
  },
  {
    config: {
      id: 'sms',
      label: 'SMS',
      icon: 'MessageSquare',
      description: 'Generate QR code for SMS',
    },
    fields: [
      {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        placeholder: '+1234567890',
        required: true,
      },
      {
        name: 'message',
        label: 'Message',
        type: 'text',
        placeholder: 'Enter your message',
        required: false,
      },
    ],
    buildData: (values) => {
      const { phone, message } = values;
      return message ? `smsto:${phone}:${message}` : `smsto:${phone}:`;
    },
  },
];

export const getQRTypeDefinition = (type: QRType): QRTypeDefinition | undefined => {
  return qrTypes.find((qt) => qt.config.id === type);
};

export interface QRGeneratorOptions {
  size: number;
  fgColor: string;
  bgColor: string;
  includeLogo: boolean;
  logoUrl?: string;
}

export const defaultQRGeneratorOptions: QRGeneratorOptions = {
  size: 256,
  fgColor: '#000000',
  bgColor: '#ffffff',
  includeLogo: false,
  logoUrl: undefined,
};