'use client';

import { useState, useCallback, useMemo } from 'react';
import { QRType, QRGeneratorOptions, defaultQRGeneratorOptions, getQRTypeDefinition } from '@/config/qr-types';
import { QRFormValues, QRStateSnapshot } from '@/lib/types';
import { debounce } from '@/lib/utils';
import { sanitizeSnapshot } from '@/lib/presets';

export function useQRGenerator() {
  const [qrType, setQRType] = useState<QRType>('url');
  const [formValues, setFormValues] = useState<QRFormValues>({});
  const [options, setOptions] = useState<QRGeneratorOptions>(defaultQRGeneratorOptions);
  const [debouncedValue, setDebouncedValue] = useState<string>('');

  const qrDefinition = useMemo(() => getQRTypeDefinition(qrType), [qrType]);

  const debouncedSetValue = useMemo(
    () => debounce((value: string) => setDebouncedValue(value), 300),
    []
  );

  const updateFormValue = useCallback((key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    if (qrDefinition) {
      const tempValues = { ...formValues, [key]: value };
      const data = qrDefinition.buildData(tempValues);
      debouncedSetValue(data);
    }
  }, [formValues, qrDefinition, debouncedSetValue]);

  const updateOptions = useCallback((newOptions: Partial<QRGeneratorOptions>) => {
    setOptions((prev) => ({ ...prev, ...newOptions }));
  }, []);

  const changeQRType = useCallback((type: QRType) => {
    setQRType(type);
    setFormValues({});
    setDebouncedValue('');
  }, []);

  const clearForm = useCallback(() => {
    setFormValues({});
    setDebouncedValue('');
  }, []);

  const getSnapshot = useCallback((): QRStateSnapshot => {
    return sanitizeSnapshot({
      qrType,
      formValues,
      options,
    });
  }, [qrType, formValues, options]);

  const applySnapshot = useCallback((snapshot: QRStateSnapshot) => {
    const safeSnapshot = sanitizeSnapshot(snapshot);
    setQRType(safeSnapshot.qrType);
    setFormValues(safeSnapshot.formValues);
    setOptions(safeSnapshot.options);
  }, []);

  const qrData = useMemo(() => {
    if (!qrDefinition) return '';
    return qrDefinition.buildData(formValues);
  }, [qrDefinition, formValues]);

  return {
    qrType,
    qrDefinition,
    formValues,
    qrData,
    options,
    updateFormValue,
    updateOptions,
    changeQRType,
    clearForm,
    getSnapshot,
    applySnapshot,
  };
}
