'use client';

import { useState } from 'react';
import { Copy, Link2, Save, Trash2 } from 'lucide-react';
import { QRPreset } from '@/lib/types';
import { Input } from '@/components/ui/Input';

interface PresetsPanelProps {
  presets: QRPreset[];
  onSavePreset: (name: string) => boolean;
  onApplyPreset: (preset: QRPreset) => void;
  onDeletePreset: (id: string) => void;
  onCopyShareLink: (preset: QRPreset) => Promise<boolean>;
  embedded?: boolean;
}

export function PresetsPanel({
  presets,
  onSavePreset,
  onApplyPreset,
  onDeletePreset,
  onCopyShareLink,
  embedded = false,
}: PresetsPanelProps) {
  const [presetName, setPresetName] = useState('');
  const [copiedPresetId, setCopiedPresetId] = useState<string | null>(null);

  const handleSave = () => {
    const saved = onSavePreset(presetName);
    if (saved) {
      setPresetName('');
    }
  };

  const handleCopyLink = async (preset: QRPreset) => {
    const copied = await onCopyShareLink(preset);
    if (!copied) return;
    setCopiedPresetId(preset.id);
    window.setTimeout(() => setCopiedPresetId(null), 1800);
  };

  return (
    <div className={embedded ? 'space-y-3.5' : 'space-y-4'}>
      <div>
        <p className="section-label">Presets</p>
        <h2 className={embedded ? 'mt-2 text-lg font-semibold' : 'mt-2 text-xl font-semibold'} style={{ color: 'var(--color-text-primary)' }}>
          Save and share your favorite styles
        </h2>
      </div>

      <div className="panel-muted p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            placeholder="Preset name (e.g. Brand Dark)"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            maxLength={40}
          />
          <button
            type="button"
            onClick={handleSave}
            className="btn-primary inline-flex h-[46px] shrink-0 items-center justify-center gap-2 px-4"
          >
            <Save className="h-4 w-4" />
            Save Preset
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {presets.length === 0 ? (
          <div className="panel-muted rounded-2xl p-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            No presets yet. Save your current setup and reuse it instantly.
          </div>
        ) : (
          presets.map((preset) => (
            <div key={preset.id} className="panel-muted rounded-2xl p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {preset.name}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {new Date(preset.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
                  <button
                    type="button"
                    onClick={() => onApplyPreset(preset)}
                    className="inline-flex items-center justify-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold transition"
                    style={{ backgroundColor: 'var(--color-panel)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                  >
                    <Link2 className="h-3.5 w-3.5" />
                    Apply
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleCopyLink(preset)}
                    className="inline-flex items-center justify-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold transition"
                    style={{ backgroundColor: 'var(--color-panel)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                  >
                    <Copy className="h-3.5 w-3.5" />
                    {copiedPresetId === preset.id ? 'Copied' : 'Share'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeletePreset(preset.id)}
                    className="inline-flex items-center justify-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold transition"
                    style={{ backgroundColor: 'var(--color-panel)', color: '#ef4444', border: '1px solid var(--color-border)' }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
