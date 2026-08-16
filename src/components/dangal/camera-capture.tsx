'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Check, X, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * Reusable photo-upload component.
 * Upload-only — no webcam/camera access. Reads the selected file via
 * FileReader → base64 data URL → captured preview → Retake/Confirm flow.
 * On mobile the file input opens the device camera (capture="environment").
 */
export function CameraCapture({
  onCapture,
  onClose,
  title = 'Upload a photo',
  subtitle,
  cta = 'Confirm',
}: {
  onCapture: (base64: string) => void
  onClose: () => void
  title?: string
  subtitle?: string
  cta?: string
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [captured, setCaptured] = useState<string | null>(null)

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setCaptured(reader.result as string)
      setError(null)
    }
    reader.onerror = () => setError('Could not read the file.')
    reader.readAsDataURL(file)
  }

  function retake() {
    setCaptured(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  function confirm() {
    if (captured) {
      onCapture(captured)
    }
  }

  function close() {
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/90 p-4 backdrop-blur"
      onClick={close}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-card/95 backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/8 p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[oklch(0.66_0.16_55)]">
              <Upload className="h-4 w-4 text-black" />
            </span>
            <div>
              <div className="font-display text-sm font-700 uppercase tracking-tight text-foreground">{title}</div>
              {subtitle && <div className="text-[11px] text-muted-foreground">{subtitle}</div>}
            </div>
          </div>
          <button onClick={close} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Upload area / preview */}
        <div className="relative aspect-[4/3] w-full bg-black">
          {captured ? (
            <img src={captured} alt="Captured" className="h-full w-full object-cover" />
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center transition-colors hover:bg-white/5"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                <Upload className="h-7 w-7 text-primary" />
              </span>
              <div>
                <div className="font-600 text-foreground">Click to upload a photo</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {error || 'JPG, PNG up to 10MB'}
                </div>
              </div>
            </button>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 p-4">
          {captured ? (
            <>
              <Button onClick={retake} variant="outline" className="rounded-full border-white/15 bg-white/5 text-foreground hover:bg-white/10">
                <RefreshCw className="mr-1.5 h-4 w-4" /> Retake
              </Button>
              <Button onClick={confirm} className="rounded-full bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] text-black hover:opacity-90 glow-gold-sm">
                <Check className="mr-1.5 h-4 w-4" /> {cta}
              </Button>
            </>
          ) : (
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="rounded-full bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] px-8 text-black hover:opacity-90 glow-gold-sm"
            >
              <Upload className="mr-1.5 h-4 w-4" /> Choose photo
            </Button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={onFileChange}
          className="hidden"
        />
      </motion.div>
    </motion.div>
  )
}
