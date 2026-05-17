export default function PhotoBreak({ src, alt = '', objectPosition = 'center 50%', height = '60vh' }) {
  return (
    <div className="photo-break" style={{ height }}>
      <img src={src} alt={alt} style={{ objectPosition }} />
    </div>
  )
}
