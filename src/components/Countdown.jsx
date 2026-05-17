import { useState, useEffect } from 'react'

const TARGET = new Date('2026-09-03T12:00:00')

function getTimeLeft() {
  const total = Math.max(0, TARGET - Date.now())
  return {
    days: Math.floor(total / 86400000),
    hours: Math.floor((total % 86400000) / 3600000),
    mins: Math.floor((total % 3600000) / 60000),
    secs: Math.floor((total % 60000) / 1000),
  }
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { n: time.days, label: 'Days' },
    { n: time.hours, label: 'Hours' },
    { n: time.mins, label: 'Minutes' },
    { n: time.secs, label: 'Seconds' },
  ]

  return (
    <div className="countdown-section">
      <p className="countdown-eyebrow">Counting down to the big day</p>
      <div className="countdown-grid">
        {units.map(({ n, label }) => (
          <div className="countdown-item" key={label}>
            <span className="countdown-num">{String(n).padStart(2, '0')}</span>
            <span className="countdown-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
