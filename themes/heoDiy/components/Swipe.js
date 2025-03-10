import { isBrowser } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

/**
 * 一个swipe组件
 * 垂直方向，定时滚动
 * @param {*} param0
 * @returns
 */
export function Swipe({ items }) {
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(0)

  const handleClick = item => {
    if (isBrowser) {
      router.push('/moments')
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex + 1) % items.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [activeIndex, items.length])

  return (
    <div className='relative h-full w-full overflow-hidden'>
      {items.map((item, index) => (
        <div
          onClick={() => handleClick(item)}
          key={index}
          className={`absolute bottom-0 top-0 line-clamp-1 flex h-full w-full transform items-center whitespace-nowrap transition-transform duration-500 sm:justify-center ${
            index === activeIndex
              ? 'slide-in translate-y-0'
              : 'slide-out translate-y-full'
          }`}>
          {item.title}
        </div>
      ))}

      <style jsx>{`
        .slide-in {
          animation-name: slide-in;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
        }

        .slide-out {
          animation-name: slide-out;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
        }

        @keyframes slide-in {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes slide-out {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-100%);
          }
        }
      `}</style>
    </div>
  )
}

export default Swipe
