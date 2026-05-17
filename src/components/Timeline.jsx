export default function Timeline({ events }) {
  return (
    <div className="timeline">
      {events.map((event, i) => (
        <div className="timeline-item" key={i}>
          <div className="tl-time">{event.time}</div>
          <div className="tl-line">
            <div className="tl-dot" />
          </div>
          <div className="tl-body">
            <div className="tl-event">{event.name}</div>
            <div className="tl-detail">{event.detail}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
