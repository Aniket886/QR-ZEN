'use client';

import { useState, useCallback, useMemo } from 'react';
import { QRType, QRGeneratorOptions, defaultQRGeneratorOptions, getQRTypeDefinition } from '@/config/qr-types';
import { QRFormValues } from '@/lib/types';
import { debounce } from '@/lib/utils';

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
  };
}