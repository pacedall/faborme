interface ScoreRingProps { score: number; size?: number; label?: string; colour?: string }

export default function ScoreRing({ score, size = 80, label, colour }: ScoreRingProps) {
  const radius = (size - 10) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const ringColour = colour ?? (score >= 75 ? '#2e7d32' : score >= 50 ? '#f57f17' : '#c62828')

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--line)" strokeWidth={6} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={ringColour} strokeWidth={6}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: 'stroke-dashoffset 0.8s ease-out' }} />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize={size * 0.22} fontWeight="600" fill="var(--text)" fontFamily="var(--font-mono)">
          {Math.round(score)}
        </text>
      </svg>
      {label && <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>{label}</span>}
    </div>
  )
}
