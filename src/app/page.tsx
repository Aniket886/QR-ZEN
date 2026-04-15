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
        <section className="container py-6 lg:py-8">
          <div className="space-y-6">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_360px] lg:items-end">
              <div className="max-w-3xl space-y-3 animate-fade-in">
                <p className="section-label">Editorial QR Suite</p>
                <h1
                  className="text-4xl leading-none tracking-tight sm:text-5xl"
                  style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
                >
                  Build polished QR codes in one clear workspace.
                </h1>
                <p className="max-w-2xl text-sm sm:text-base" style={{ color: 'var(--color-text-secondary)' }}>
                  Choose a QR type, tune the visual system, save reusable presets, and export instantly from a compact dashboard designed for laptop and desktop screens.
                </p>
              </div>

              <div className="rounded-[1.5rem] border px-4 py-4 sm:px-5" style={{ borderColor: 'var(--color-border)', backgroundColor: 'color-mix(in srgb, var(--color-panel) 88%, transparent)' }}>
                <p className="section-label">Workspace</p>
                <div className="mt-2 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      Compact single-dashboard layout
                    </p>
                    <p className="mt-1 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      Balanced specifically for laptop and desktop widths.
                    </p>
                  </div>
                  <div className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)' }}>
                    {qrType.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-4 sm:p-6 lg:p-7 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="space-y-6">
                <section className="rounded-[1.6rem] border p-4 sm:p-5" style={{ borderColor: 'var(--color-border)', backgroundColor: 'color-mix(in srgb, var(--color-panel) 82%, transparent)' }}>
                  <QRTypeSelector selectedType={qrType} onChange={changeQRType} />
                </section>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_360px] xl:grid-cols-[minmax(0,1.35fr)_400px]">
                  <div className="min-w-0 space-y-6">
                    <section className="rounded-[1.6rem] border p-4 sm:p-5 lg:p-6" style={{ borderColor: 'var(--color-border)', backgroundColor: 'color-mix(in srgb, var(--color-panel) 82%, transparent)' }}>
                      {qrDefinition && (
                        <InputForm
                          definition={qrDefinition}
                          values={formValues}
                          onChange={updateFormValue}
                          onClear={clearForm}
                        />
                      )}
                    </section>

                    <section className="rounded-[1.6rem] border p-4 sm:p-5" style={{ borderColor: 'var(--color-border)', backgroundColor: 'color-mix(in srgb, var(--color-panel) 82%, transparent)' }}>
                      <PresetsPanel
                        presets={presets}
                        onSavePreset={handleSavePreset}
                        onApplyPreset={handleApplyPreset}
                        onDeletePreset={handleDeletePreset}
                        onCopyShareLink={handleCopyShareLink}
                        embedded
                      />
                    </section>

                    <section className="rounded-[1.6rem] border p-4 sm:p-5" style={{ borderColor: 'var(--color-border)', backgroundColor: 'color-mix(in srgb, var(--color-panel) 82%, transparent)' }}>
                      <CustomizationPanel options={options} onChange={updateOptions} />
                    </section>
                  </div>

                  <div className="min-w-0 space-y-6 lg:sticky lg:top-24 lg:self-start">
                    <section className="rounded-[1.6rem] border p-4 sm:p-5" style={{ borderColor: 'var(--color-border)', backgroundColor: 'color-mix(in srgb, var(--color-panel) 82%, transparent)' }}>
                      <div className="mb-5 flex items-center justify-between gap-3">
                        <div>
                          <p className="section-label">Preview</p>
                          <h2 className="mt-2 text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                            Export-ready QR output
                          </h2>
                        </div>
                        <div className="rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)' }}>
                          Live
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
