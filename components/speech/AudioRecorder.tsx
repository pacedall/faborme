'use client'

import { useState, useRef, useCallback } from 'react'

interface AudioRecorderProps { onRecordingComplete: (blob: Blob) => void; maxSeconds?: number }

export default function AudioRecorder({ onRecordingComplete, maxSeconds = 120 }: AudioRecorderProps) {
  const [state, setState] = useState<'idle' | 'recording' | 'recorded'>('idle')
  const [duration, setDuration] = useState(0)
  const [bars, setBars] = useState<number[]>(Array(32).fill(4))
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const animRef = useRef<number>(0)

  const stopRecording = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    cancelAnimationFrame(animRef.current)
    if (mediaRecorder.current?.state === 'recording') mediaRecorder.current.stop()
    setState('recorded')
    setBars(Array(32).fill(4))
  }, [])

  const startRecording = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const audioCtx = new AudioContext()
    const source = audioCtx.createMediaStreamSource(stream)
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 64
    source.connect(analyser)

    const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
    mediaRecorder.current = recorder
    chunks.current = []
    recorder.ondataavailable = (e) => chunks.current.push(e.data)
    recorder.onstop = () => {
      const blob = new Blob(chunks.current, { type: 'audio/webm' })
      onRecordingComplete(blob)
      stream.getTracks().forEach((t) => t.stop())
    }
    recorder.start(100)
    setState('recording'); setDuration(0)

    timerRef.current = setInterval(() => {
      setDuration((d) => { if (d + 1 >= maxSeconds) { stopRecording(); return d } return d + 1 })
    }, 1000)

    const updateBars = () => {
      const data = new Uint8Array(analyser.frequencyBinCount)
      analyser.getByteFrequencyData(data)
      setBars(Array.from({ length: 32 }, (_, i) => {
        const idx = Math.floor(i * data.length / 32)
        return Math.max(4, (data[idx] / 255) * 48)
      }))
      animRef.current = requestAnimationFrame(updateBars)
    }
    animRef.current = requestAnimationFrame(updateBars)
  }, [maxSeconds, onRecordingComplete, stopRecording])

  const mins = Math.floor(duration / 60)
  const secs = duration % 60

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-2xl border" style={{ background: 'var(--lilac)' }}>
      <div className="flex items-center gap-1 h-16">
        {bars.map((h, i) => (
          <div key={i} className="rounded-full transition-all duration-75"
            style={{ width: 3, height: h, background: state === 'recording' ? 'var(--purple)' : 'var(--line)', opacity: state === 'recording' ? 0.7 + (h / 48) * 0.3 : 1 }} />
        ))}
      </div>
      <div className="font-mono text-2xl font-medium" style={{ color: 'var(--purple)' }}>
        {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        <span className="text-sm ml-2" style={{ color: 'var(--muted)' }}>/ {Math.floor(maxSeconds / 60)}:{String(maxSeconds % 60).padStart(2, '0')}</span>
      </div>
      <div className="flex gap-3">
        {state === 'idle' && (
          <button onClick={startRecording} className="btn-primary flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400 inline-block animate-pulse" /> Start recording
          </button>
        )}
        {state === 'recording' && (
          <button onClick={stopRecording} className="btn-secondary flex items-center gap-2">
            <span className="w-3 h-3 inline-block" style={{ background: 'var(--purple)' }} /> Stop
          </button>
        )}
        {state === 'recorded' && (
          <div className="flex gap-3">
            <button onClick={() => setState('idle')} className="btn-secondary">Record again</button>
            <div className="px-4 py-3 rounded-lg text-sm font-medium" style={{ background: '#e8f5e9', color: '#2e7d32' }}>✓ Recording ready — uploading…</div>
          </div>
        )}
      </div>
    </div>
  )
}
