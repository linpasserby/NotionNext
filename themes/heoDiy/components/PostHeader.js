import { HashTag } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import WordCount from '@/components/WordCount'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'
import Link from 'next/link'
import WavesArea from './WavesArea'

/**
 * 文章页头
 * @param {*} param0
 * @returns
 */
export default function PostHeader({ post, siteInfo, isDarkMode }) {
  if (!post) {
    return <></>
  }
  // 文章头图
  const headerImage = post?.pageCover ? post.pageCover : siteInfo?.pageCover
  const ANALYTICS_BUSUANZI_ENABLE = siteConfig('ANALYTICS_BUSUANZI_ENABLE')
  return (
    <div
      id='post-bg'
      className='relative z-10 -mb-5 h-[30rem] w-full overflow-hidden bg-cover bg-center bg-no-repeat md:mb-0 md:flex-shrink-0'>
      <style jsx>{`
        .coverdiv:after {
          position: absolute;
          content: '';
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          box-shadow: 110px -130px 500px 100px
            ${isDarkMode ? '#CA8A04' : '#0060e0'} inset;
        }
      `}</style>

      <div
        className={`${isDarkMode ? 'bg-[#CA8A04]' : 'bg-[#0060e0]'} absolute top-0 flex h-full w-full items-center justify-center py-10`}>
        {/* 文章背景图 */}
        <div
          id='post-cover-wrapper'
          style={{
            filter: 'blur(15px)'
          }}
          className='coverdiv lg:translate-x-96 lg:rotate-12 lg:opacity-50'>
          <LazyImage
            id='post-cover'
            className='h-full max-h-[50rem] min-h-[20rem] w-full min-w-[50vw] object-cover'
            src={headerImage}
          />
        </div>

        {/* 文章文字描述 */}
        <div
          id='post-info'
          className='absolute top-48 z-10 flex w-full max-w-[86rem] flex-col space-y-4 px-5 lg:-mt-12'>
          {/* 分类+标签 */}
          <div className='flex items-center justify-center gap-4 md:justify-start'>
            {post.category && (
              <>
                <Link
                  href={`/category/${post.category}`}
                  className='mr-4'
                  passHref
                  legacyBehavior>
                  <div className='font-sm cursor-pointer rounded-lg bg-blue-500 px-3 py-1 font-bold text-white duration-200 hover:bg-white hover:text-blue-500 dark:bg-yellow-500'>
                    {post.category}
                  </div>
                </Link>
              </>
            )}

            {post.tagItems && (
              <div className='hidden flex-nowrap justify-center overflow-x-auto md:flex'>
                {post.tagItems.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/tag/${encodeURIComponent(tag.name)}`}
                    passHref
                    className={
                      'inline-block cursor-pointer whitespace-nowrap px-1 py-0.5 text-gray-50 duration-200 hover:text-white'
                    }>
                    <div className='flex items-center font-light'>
                      <HashTag className='mr-0.5 h-3 w-3 stroke-2 text-gray-200' />{' '}
                      {tag.name + (tag.count ? `(${tag.count})` : '')}{' '}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 文章Title */}
          <div className='shadow-text-md flex max-w-5xl justify-center text-3xl font-bold text-white md:justify-start md:leading-snug lg:text-5xl'>
            {siteConfig('POST_TITLE_ICON') && (
              <NotionIcon icon={post.pageIcon} />
            )}
            {post.title}
          </div>

          {/* 标题底部补充信息 */}
          <section className='shadow-text-md mt-4 flex flex-wrap justify-center text-sm font-light leading-8 text-white text-opacity-70 dark:text-gray-200 md:justify-start'>
            <div className='flex justify-center'>
              <div className='mr-2'>
                <WordCount
                  wordCount={post.wordCount}
                  readTime={post.readTime}
                />
              </div>
            </div>

            {post?.type !== 'Page' && (
              <>
                <Link
                  href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
                  passHref
                  className='mr-2 cursor-pointer pl-1 hover:underline'>
                  <i className='fa-regular fa-calendar'></i> {post?.publishDay}
                </Link>
              </>
            )}

            <div className='mr-2 pl-1'>
              <i className='fa-regular fa-calendar-check'></i>{' '}
              {post.lastEditedDay}
            </div>

            {/* 阅读统计 */}
            {ANALYTICS_BUSUANZI_ENABLE && (
              <div className='busuanzi_container_page_pv mr-2 font-light'>
                <i className='fa-solid fa-fire-flame-curved'></i>{' '}
                <span className='busuanzi_value_page_pv mr-2' />
              </div>
            )}
          </section>
        </div>

        <WavesArea />
      </div>
    </div>
  )
}
