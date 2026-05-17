function HomeIcon() {
  return (
    <svg className="travel-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function DirectionIcon() {
  return (
    <svg className="travel-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="travel-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.18 2 2 0 012.1 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.3 7.68a16 16 0 006.06 6.06l1.05-1.05a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}

export default function Travel() {
  return (
    <section className="section travel-section" id="travel">
      <div className="section-inner wide">
        <p className="section-label">Getting Here</p>
        <h2 className="section-title">
          Travel &amp; <em>Accommodation</em>
        </h2>
        <div className="divider" />
        <div className="travel-cards">
          <div className="travel-card">
            <HomeIcon />
            <h3>Accommodation</h3>
            <p>
              Rooms are available to book at Four Seasons Carlingford.
              Alternatively, there are surrounding Airbnbs for larger groups.
            </p>
          </div>
          <div className="travel-card">
            <DirectionIcon />
            <h3>Getting There</h3>
            <p>
              The journey from the ceremony to the reception venue takes roughly
              one hour. Plenty of parking is available on site for all guests.
            </p>
          </div>
          <div className="travel-card">
            <PhoneIcon />
            <h3>Questions?</h3>
            <p>
              If you have any questions about travel or logistics, don&apos;t
              hesitate to reach out. We want to make sure everyone can celebrate
              with us.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
