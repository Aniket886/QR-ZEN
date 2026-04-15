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
          <div className="space-y-6 lg:space-y-8">
            <div className="max-w-3xl space-y-4 animate-fade-in">
              <p className="section-label">Free QR Generator</p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl" style={{ color: 'var(--color-text-primary)' }}>
                Make polished QR codes in seconds with a cleaner, faster workflow.
              </h1>
              <p className="max-w-2xl text-base sm:text-lg" style={{ color: 'var(--color-text-secondary)' }}>
                Pick a QR type, enter your content, customize the output, and export instantly. The entire experience stays client-side and ready for future backend expansion.
              </p>
            </div>

            <div className="card p-4 sm:p-6 lg:p-7 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="space-y-6">
                <QRTypeSelector selectedType={qrType} onChange={changeQRType} />

                <div
                  className="grid gap-6 border-t pt-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <div className="min-w-0 space-y-6">
                    <section className="space-y-6 rounded-[1.5rem] border p-4 sm:p-5" style={{ borderColor: 'var(--color-border)', backgroundColor: 'color-mix(in srgb, var(--color-panel) 72%, transparent)' }}>
                      {qrDefinition && (
                        <InputForm
                          definition={qrDefinition}
                          values={formValues}
                          onChange={updateFormValue}
                          onClear={clearForm}
                        />
                      )}

                      <div
                        className="border-t pt-6"
                        style={{ borderColor: 'var(--color-border)' }}
                      >
                        <PresetsPanel
                          presets={presets}
                          onSavePreset={handleSavePreset}
                          onApplyPreset={handleApplyPreset}
                          onDeletePreset={handleDeletePreset}
                          onCopyShareLink={handleCopyShareLink}
                          embedded
                        />
                      </div>
                    </section>

                    <section className="rounded-[1.5rem] border p-4 sm:p-5 xl:hidden" style={{ borderColor: 'var(--color-border)', backgroundColor: 'color-mix(in srgb, var(--color-panel) 72%, transparent)' }}>
                      <CustomizationPanel options={options} onChange={updateOptions} />
                    </section>
                  </div>

                  <div className="min-w-0 space-y-6">
                    <section className="hidden rounded-[1.5rem] border p-4 sm:p-5 xl:block" style={{ borderColor: 'var(--color-border)', backgroundColor: 'color-mix(in srgb, var(--color-panel) 72%, transparent)' }}>
                      <CustomizationPanel options={options} onChange={updateOptions} />
                    </section>

                    <section className="rounded-[1.5rem] border p-4 sm:p-5" style={{ borderColor: 'var(--color-border)', backgroundColor: 'color-mix(in srgb, var(--color-panel) 72%, transparent)' }}>
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
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
