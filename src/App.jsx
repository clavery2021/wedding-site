import Nav from './components/Nav'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import Ceremony from './components/Ceremony'
import PhotoBreak from './components/PhotoBreak'
import Schedule from './components/Schedule'
import Travel from './components/Travel'
import Day2 from './components/Day2'
import Rsvp from './components/Rsvp'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Countdown />
      <Ceremony />
      <PhotoBreak
        src="/assets/photo-walking.jpg"
        alt="Cormac &amp; Maria walking"
        objectPosition="center 30%"
      />
      <Schedule />
      <PhotoBreak
        src="/assets/photo-dancing.jpg"
        alt="Cormac &amp; Maria dancing"
        objectPosition="center 40%"
      />
      <Travel />
      <PhotoBreak
        src="/assets/photo-rocks.jpg"
        alt="Cormac &amp; Maria on the rocks"
        objectPosition="center 50%"
      />
      <Day2 />
      <PhotoBreak
        src="/assets/photo-beach.jpg"
        alt="Cormac &amp; Maria on the beach"
        objectPosition="center 40%"
        height="55vh"
      />
      <Rsvp />
      <Footer />
    </>
  )
}
