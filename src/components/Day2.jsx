import Timeline from './Timeline'

const DAY2_EVENTS = [
  { time: '5:00 pm', name: 'Doors Open', detail: 'Join us to continue the celebrations' },
  { time: '7:30 pm', name: 'Buffet', detail: 'Casual food & drinks' },
  { time: 'Late', name: 'Live Music & Dancing', detail: 'Keep the party going' },
]

export default function Day2() {
  return (
    <section className="section day2-section" id="day2">
      <div className="section-inner">
        <p className="section-label">Friday 4th September</p>
        <h2 className="section-title">
          Day 2 <em>Party</em>
        </h2>
        <div className="divider" />
        <Timeline events={DAY2_EVENTS} />
      </div>
    </section>
  )
}
