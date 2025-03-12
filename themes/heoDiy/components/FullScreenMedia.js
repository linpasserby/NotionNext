export function FullScreenMedia() {
  const handleScroll = e => {
    e.preventDefault()
    window.scrollTo({
      top: window.innerHeight - 64,
      behavior: "smooth"
    })
  }

  return (
    <div className="absolute top-0 flex h-full w-full justify-center overflow-hidden will-change-transform">
      <video
        className="pointer-events-none block h-full w-full object-cover"
        src="https://easyaistorageaccount.blob.core.windows.net/easyai/uploadFiles/2025-01-04/首页3 (1).mp4"
        loop
        muted
        playsInline
        autoPlay
      />
      <a
        onClick={handleScroll}
        className="scroll-btn absolute bottom-8 z-20 cursor-pointer text-white/70">
        ↓
      </a>
    </div>
  )
}
