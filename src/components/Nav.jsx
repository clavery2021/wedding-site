import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <a href="#ceremony">Ceremony</a>
      <a href="#schedule">Schedule</a>
      <a href="#travel">Travel</a>
      <a href="#day2">Day 2</a>
      <a href="#rsvp">RSVP</a>
    </nav>
  )
}
