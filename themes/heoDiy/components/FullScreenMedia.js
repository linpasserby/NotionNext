export function FullScreenMedia(props) {
  const handleScroll = e => {
    e.preventDefault()
    window.scrollTo({
      top: window.innerHeight - 64,
      behavior: 'smooth'
    })
  }

  return (
    <div className='flex justify-center w-full h-full absolute top-0 overflow-hidden will-change-transform'>
      <video
        className='block object-cover w-full h-full pointer-events-none'
        src='/videos/home.mp4'
        loop
        muted
        playsInline
        webkit-playsinline
        autoPlay
      />
      <a
        onClick={handleScroll}
        className='scroll-btn absolute text-white/70 bottom-8 z-20 cursor-pointer'>
        ↓
      </a>
    </div>
  )
}
