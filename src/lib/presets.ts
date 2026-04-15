import { defaultQRGeneratorOptions } from '@/config/qr-types';
import { QRPreset, QRStateSnapshot } from '@/lib/types';

export const PRESETS_STORAGE_KEY = 'qr-zen-presets-v1';

function encodeBase64Url(input: string): string {
  return btoa(unescape(encodeURIComponent(input)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function decodeBase64Url(input: string): string {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/');
  const padding = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
  return decodeURIComponent(escape(atob(`${normalized}${padding}`)));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function isValidSnapshot(value: unknown): value is QRStateSnapshot {
  if (!isRecord(value)) return false;
  if (typeof value.qrType !== 'string') return false;
  if (!isRecord(value.formValues)) return false;
  if (!isRecord(value.options)) return false;

  const options = value.options;
  return (
    typeof options.size === 'number' &&
    typeof options.fgColor === 'string' &&
    typeof options.bgColor === 'string' &&
    typeof options.includeLogo === 'boolean' &&
    (options.logoUrl === undefined || typeof options.logoUrl === 'string')
  );
}

export function sanitizeSnapshot(snapshot: QRStateSnapshot): QRStateSnapshot {
  const rawShape = (snapshot.options as { qrShape?: string }).qrShape;
  const normalizedShape = rawShape === 'rounded' ? 'rounded' : 'square';

  return {
    qrType: snapshot.qrType,
    formValues: { ...snapshot.formValues },
    options: {
      ...defaultQRGeneratorOptions,
      ...snapshot.options,
      qrShape: normalizedShape,
      logoUrl: snapshot.options.includeLogo ? snapshot.options.logoUrl : undefined,
    },
  };
}

export function encodeSnapshot(snapshot: QRStateSnapshot): string {
  return encodeBase64Url(JSON.stringify(sanitizeSnapshot(snapshot)));
}

export function decodeSnapshot(token: string): QRStateSnapshot | null {
  try {
    const parsed = JSON.parse(decodeBase64Url(token)) as unknown;
    if (!isValidSnapshot(parsed)) return null;
    return sanitizeSnapshot(parsed);
  } catch {
    return null;
  }
}

export function loadPresets(): QRPreset[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(PRESETS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is QRPreset => {
      if (!isRecord(item)) return false;
      return (
        typeof item.id === 'string' &&
        typeof item.name === 'string' &&
        typeof item.createdAt === 'string' &&
        isValidSnapshot(item.snapshot)
      );
    });
  } catch {
    return [];
  }
}

export function savePresets(presets: QRPreset[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(PRESETS_STORAGE_KEY, JSON.stringify(presets));
}
