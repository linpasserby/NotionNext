import { siteConfig } from '@/lib/config'
import CONFIG from '@/themes/heoDiy/config'

export function MomentsCard() {
  let notices = siteConfig('HEO_NOTICE_BAR', null, CONFIG)
  console.log(notices)

  return (
    <div className='px-5 md:px-0'>
      <div className='relative h-[380px] overflow-hidden rounded-3xl bg-[url(/images/momentsBg.jpg)] bg-cover bg-center bg-no-repeat px-[20px] py-[40px] md:bg-[left_top_28%]'>
        <div className='absolute left-0 top-0 h-full w-full'>
          {Array.from({ length: 40 }).map((_, index) => (
            <span
              key={index}
              className='bubble'
              style={{
                '--bubble-size': `${Math.random() * 40 + 10}px`,
                '--bubble-left': `${Math.random() * 100}%`,
                '--bubble-delay': `${Math.random() * 10}s`,
                '--bubble-duration': `${Math.random() * 4 + 4}s`,
                '--bubble-opacity': `${Math.random() * 0.5 + 0.2}`,
                '--bubble-translateY': `-${Math.random() * 250 + 200}px`
              }}
            />
          ))}
        </div>
        <div className='absolute left-0 top-0 flex h-full w-full flex-col justify-between px-10 py-5 text-white'>
          <div className='flex flex-col gap-3'>
            <p className='text-xs opacity-80'>即刻短文</p>
            <p className='text-4xl font-bold'>分享生活的小确幸</p>
          </div>
          <p className='text-base'>人生唯一的不幸，就是自己无能</p>
        </div>
      </div>
      <div className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
        {notices.map(item => {
          return (
            <div
              key={item.title}
              className='flex flex-col gap-2 rounded-xl border bg-white p-5 text-black transition duration-500 ease-in-out hover:border-[#425aef]'>
              <p className='text-lg font-bold'>{item.title}</p>
              <hr className='relative my-2 flex w-full border border-dashed border-[#425aef23]' />
              <p className='text-sm'>{item.time}</p>
            </div>
          )
        })}
      </div>
      {/* 添加内联样式 */}
      <style jsx>{`
        .bubble {
          position: absolute;
          bottom: -50px;
          width: var(--bubble-size);
          height: var(--bubble-size);
          background: rgba(255, 255, 255, var(--bubble-opacity));
          border-radius: 50%;
          animation: float-up var(--bubble-duration) infinite ease-in;
          left: var(--bubble-left);
          animation-delay: var(--bubble-delay);
        }

        @keyframes float-up {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          20% {
            opacity: var(--bubble-opacity);
          }
          80% {
            opacity: var(--bubble-opacity);
          }
          100% {
            transform: translateY(var(--bubble-translateY));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
