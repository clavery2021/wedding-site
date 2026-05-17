import Timeline from './Timeline'

const DAY1_EVENTS = [
  { time: '12:00 pm', name: 'Ceremony', detail: 'Please be seated by 11:45am' },
  { time: '3:00 pm', name: 'Drinks Reception', detail: 'Canapes & Prosecco' },
  { time: '5:00 pm', name: 'Dinner', detail: 'Guests called to dinner' },
  { time: '8:00 pm', name: 'Speeches & Cake Cutting', detail: 'Words, toasts & cake' },
  { time: '9:15 pm', name: 'Dancing', detail: 'Let the celebrations begin' },
]

export default function Schedule() {
  return (
    <section className="section schedule-section" id="schedule">
      <div className="section-inner">
        <p className="section-label">The Day</p>
        <h2 className="section-title">
          Wedding <em>Schedule</em>
        </h2>
        <div className="divider" />
        <Timeline events={DAY1_EVENTS} />
      </div>
    </section>
  )
}
