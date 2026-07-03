import Hls from 'hls.js'
import { useEffect, useRef } from 'react'

// 1. 将视频组件提取到外部，避免重复创建导致重新挂载
function HLSVideo({ src, poster }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let hls

    if (Hls.isSupported()) {
      // 如果支持 hls.js (如 Chrome, Firefox)
      hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(video)
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // 如果浏览器原生支持 HLS (如 Safari, iOS)
      video.src = src
    }

    // 🔴 关键优化：组件卸载时清理 HLS 实例，防止内存泄漏
    return () => {
      if (hls) {
        hls.destroy()
      }
    }
  }, [src]) // 当 src 改变时重新绑定

  return (
    <video
      ref={videoRef}
      className='pointer-events-none block h-full w-full object-cover'
      poster={poster}
      loop
      muted
      playsInline
      autoPlay
    />
  )
}

export function FullScreenMedia() {
  const handleScroll = e => {
    e.preventDefault()
    window.scrollTo({
      top: window.innerHeight - 64,
      behavior: 'smooth'
    })
  }

  return (
    <div className='absolute top-0 flex h-full w-full justify-center overflow-hidden will-change-transform'>
      <HLSVideo src='/videos/output.m3u8' poster='/images/thumbnail.jpg' />

      <button
        onClick={handleScroll}
        className='absolute bottom-8 z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/70 text-white/70 bg-transparent transition-all duration-300 hover:bg-white/20 hover:text-white hover:scale-110 animate-bounce cursor-pointer'
        aria-label='Scroll down'>
        ↓
      </button>
    </div>
  )
}
