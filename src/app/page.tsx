'use client';

import { useEffect, useRef, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { QRTypeSelector } from '@/components/qr/QRTypeSelector';
import { InputForm } from '@/components/qr/InputForms/InputForm';
import { QRPreview } from '@/components/qr/QRPreview';
import { CustomizationPanel } from '@/components/qr/CustomizationPanel';
import { PresetsPanel } from '@/components/qr/PresetsPanel';
import { useQRGenerator } from '@/hooks/useQRGenerator';
import { copyToClipboard } from '@/lib/utils';
import { decodeSnapshot, encodeSnapshot, loadPresets, savePresets } from '@/lib/presets';
import { QRPreset } from '@/lib/types';

export default function Home() {
  const {
    qrType,
    qrDefinition,
    formValues,
    qrData,
    options,
    updateFormValue,
    updateOptions,
    changeQRType,
    clearForm,
    applySnapshot,
    getSnapshot,
  } = useQRGenerator();
  const [presets, setPresets] = useState<QRPreset[]>([]);
  const hasHydratedFromUrlRef = useRef(false);

  useEffect(() => {
    setPresets(loadPresets());
  }, []);

  useEffect(() => {
    if (hasHydratedFromUrlRef.current) return;
    const params = new URLSearchParams(window.location.search);
    const token = params.get('preset');
    if (!token) {
      hasHydratedFromUrlRef.current = true;
      return;
    }
    const snapshot = decodeSnapshot(token);
    if (!snapshot) {
      hasHydratedFromUrlRef.current = true;
      return;
    }
    applySnapshot(snapshot);
    hasHydratedFromUrlRef.current = true;
  }, [applySnapshot]);

  const handleSavePreset = (name: string): boolean => {
    const normalizedName = name.trim();
    if (!normalizedName) return false;

    const newPreset: QRPreset = {
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}`,
      name: normalizedName,
      createdAt: new Date().toISOString(),
      snapshot: getSnapshot(),
    };

    const updated = [newPreset, ...presets];
    setPresets(updated);
    savePresets(updated);
    return true;
  };

  const handleApplyPreset = (preset: QRPreset) => {
    applySnapshot(preset.snapshot);
  };

  const handleDeletePreset = (id: string) => {
    const updated = presets.filter((preset) => preset.id !== id);
    setPresets(updated);
    savePresets(updated);
  };

  const handleCopyShareLink = async (preset: QRPreset): Promise<boolean> => {
    const token = encodeSnapshot(preset.snapshot);
    const shareUrl = `${window.location.origin}${window.location.pathname}?preset=${token}`;
    return copyToClipboard(shareUrl);
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container py-6 lg:py-10">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] xl:items-start">
            <div className="min-w-0 space-y-6">
              <div className="space-y-4 animate-fade-in">
                <p className="section-label">Free QR Generator</p>
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl" style={{ color: 'var(--color-text-primary)' }}>
                  Make polished QR codes in seconds with a cleaner, faster workflow.
                </h1>
                <p className="max-w-2xl text-base sm:text-lg" style={{ color: 'var(--color-text-secondary)' }}>
                  Pick a QR type, enter your content, customize the output, and export instantly. The entire experience stays client-side and ready for future backend expansion.
                </p>
              </div>

              <div className="card p-4 sm:p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <QRTypeSelector selectedType={qrType} onChange={changeQRType} />
              </div>

              <div className="grid items-start gap-6 2xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                <div className="space-y-6">
                  <div className="card p-5 sm:p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    {qrDefinition && (
                      <InputForm
                        definition={qrDefinition}
                        values={formValues}
                        onChange={updateFormValue}
                        onClear={clearForm}
                      />
                    )}
                  </div>

                  <div className="card p-5 sm:p-6 animate-fade-in" style={{ animationDelay: '0.35s' }}>
                    <PresetsPanel
                      presets={presets}
                      onSavePreset={handleSavePreset}
                      onApplyPreset={handleApplyPreset}
                      onDeletePreset={handleDeletePreset}
                      onCopyShareLink={handleCopyShareLink}
                    />
                  </div>
                </div>

                <div className="card p-5 sm:p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <CustomizationPanel options={options} onChange={updateOptions} />
                </div>
              </div>
            </div>

            <div className="min-w-0 xl:sticky xl:top-24 xl:self-start">
              <div className="card p-5 sm:p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="section-label">Preview</p>
                    <h2 className="mt-2 text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      Export-ready QR output
                    </h2>
                  </div>
                  <div className="rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)' }}>
                    {qrType.toUpperCase()}
                  </div>
                </div>
                <QRPreview data={qrData} options={options} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
