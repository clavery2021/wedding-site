export default function Ceremony() {
  return (
    <section className="section ceremony-section" id="ceremony">
      <div className="section-inner">
        <p className="section-label">The Ceremony</p>
        <h2 className="section-title">
          <em>St. Peter&apos;s</em> Parish
        </h2>
        <div className="divider" />
        <div className="ceremony-rows">
          <div className="ceremony-row">
            <span className="ceremony-row-label">Address</span>
            <span className="ceremony-row-value">North Street, Lurgan</span>
          </div>
          <div className="ceremony-divider" />
          <div className="ceremony-row">
            <span className="ceremony-row-label">Time</span>
            <span className="ceremony-row-value">12:00 pm</span>
          </div>
          <div className="ceremony-divider" />
          <div className="ceremony-row">
            <span className="ceremony-row-label">Note</span>
            <span className="ceremony-row-value muted">
              Please be seated by 11:45 am
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
