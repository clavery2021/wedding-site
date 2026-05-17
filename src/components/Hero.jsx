export default function Hero() {
  return (
    <section className="hero" id="home">
      <img
        className="hero-img"
        src="/assets/photo-hero.jpg"
        alt="Cormac &amp; Maria"
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="hero-eyebrow">We&apos;re getting married</p>
        <h1 className="hero-names">
          Cormac <em>&amp;</em> Maria
        </h1>
        <p className="hero-date">3rd September 2026</p>
      </div>
      <div className="scroll-hint">
        <div className="scroll-line" />
      </div>
    </section>
  )
}
