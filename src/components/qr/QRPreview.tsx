'use client';

import { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { downloadImage, copyToClipboard } from '@/lib/utils';
import { QRGeneratorOptions } from '@/config/qr-types';
import { Download, Copy, Check, QrCode } from 'lucide-react';

interface QRPreviewProps {
  data: string;
  options: QRGeneratorOptions;
}

export function QRPreview({ data, options }: QRPreviewProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [copied, setCopied] = useState(false);
  const previewDisplaySize = Math.min(options.size, 320);

  const handleDownloadPNG = () => {
    const svg = svgRef.current;
    if (!svg || !data) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = options.size * 2;
    canvas.width = size;
    canvas.height = size;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = options.bgColor;
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);
      
      const pngUrl = canvas.toDataURL('image/png');
      downloadImage(pngUrl, `qr-code-${Date.now()}.png`);
    };
    img.src = url;
  };

  const handleDownloadSVG = () => {
    if (!data) return;
    const svg = svgRef.current;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    downloadImage(url, `qr-code-${Date.now()}.svg`);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(data);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!data) {
    return (
      <div className="relative flex min-h-[360px] flex-col items-center justify-center overflow-hidden rounded-[1.75rem] panel-muted">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute left-12 top-12 h-28 w-28 rounded-full" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))', filter: 'blur(46px)' }} />
          <div className="absolute bottom-8 right-10 h-24 w-24 rounded-full" style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-primary))', filter: 'blur(36px)' }} />
        </div>
        <div className="relative flex flex-col items-center gap-4 text-center p-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl" style={{ backgroundColor: 'var(--color-panel)', boxShadow: 'var(--shadow-md)' }}>
            <QrCode className="h-10 w-10" style={{ color: 'var(--color-primary)' }} />
          </div>
          <div>
            <h3 className="mb-1 text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
              Your QR Code
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Enter data to generate your QR code
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-col items-center gap-6">
      <div className="relative w-full overflow-hidden rounded-[1.75rem] p-4 sm:p-6" style={{ background: 'linear-gradient(180deg, color-mix(in srgb, var(--color-bg-tertiary) 88%, transparent), color-mix(in srgb, var(--color-panel) 98%, transparent))', border: '1px solid var(--color-border)' }}>
        <div className="mx-auto flex w-full max-w-full flex-col items-center gap-4">
          <div className="rounded-[1.75rem] p-4 animate-pulse-glow" style={{ background: 'linear-gradient(135deg, rgb(109 94 252 / 0.12), rgb(25 194 201 / 0.12))' }}>
            <div className="rounded-[1.4rem] p-5" style={{ backgroundColor: 'var(--color-panel)', boxShadow: 'var(--shadow-lg)' }}>
              <div className="rounded-[1.1rem] p-4" style={{ backgroundColor: options.bgColor }}>
            <QRCodeSVG
              ref={svgRef}
              value={data}
              size={options.size}
              style={{ width: previewDisplaySize, maxWidth: '100%', height: 'auto' }}
              fgColor={options.fgColor}
              bgColor={options.bgColor}
              level="H"
              includeMargin={false}
              imageSettings={
                options.includeLogo && options.logoUrl
                  ? {
                      src: options.logoUrl,
                      x: undefined,
                      y: undefined,
                      height: options.size * 0.2,
                      width: options.size * 0.2,
                      excavate: true,
                    }
                  : undefined
              }
            />
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
              Live preview
            </p>
            <p className="mt-1 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              Exports stay client-side. Nothing is uploaded.
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-wrap justify-center gap-3">
        <button
          onClick={handleDownloadPNG}
          className="btn-primary flex min-w-[112px] items-center justify-center gap-2 px-5 py-3"
        >
          <Download className="w-4 h-4" />
          PNG
        </button>
        <button
          onClick={handleDownloadSVG}
          className="flex min-w-[112px] items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold transition-transform duration-200 hover:scale-[1.02]"
          style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
        >
          <Download className="w-4 h-4" />
          SVG
        </button>
        <button
          onClick={handleCopy}
          className="flex min-w-[112px] items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold transition-transform duration-200 hover:scale-[1.02]"
          style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" style={{ color: '#10b981' }} />
              <span style={{ color: '#10b981' }}>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}
