import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import CopyRightDate from '@/components/CopyRightDate'
import PoweredBy from '@/components/PoweredBy'
import { siteConfig } from '@/lib/config'
import SocialButton from './SocialButton'

/**
 * 页脚
 * @returns
 */
const Footer = () => {
  const BEI_AN = siteConfig('BEI_AN')
  const BIO = siteConfig('BIO')
  return (
    <footer
      className="relative m-auto w-full flex-shrink-0 justify-center bg-white text-center text-sm leading-6 text-gray-600 dark:bg-[#1a191d] dark:text-gray-100">
      {/* 颜色过度区 */}
      <div
        id="color-transition"
        className="h-32 bg-gradient-to-b from-[#f7f9fe] to-white dark:bg-[#1a191d] dark:from-inherit dark:to-inherit"
      />

      {/* 社交按钮 */}
      {/*<div className="h-24 w-full">*/}
      {/*  <SocialButton />*/}
      {/*</div>*/}

      <br />

      {/* 底部页面信息 */}
      <div
        id="footer-bottom"
        className="flex h-20 w-full flex-col items-center justify-between border-t bg-[#f1f3f7] p-3 px-6 dark:border-t-[#3D3D3F] dark:bg-[#21232A] lg:flex-row">
        <div id="footer-bottom-left" className="text-center lg:text-start">
          {/*<PoweredBy />*/}
          <div className="flex gap-x-1">
            暂时还没有想好写点啥
            <CopyRightDate />
            {/*<a*/}
            {/*  href={'/about'}*/}
            {/*  className="underline font-semibold dark:text-gray-300 ">*/}
            {/*  {siteConfig('AUTHOR')}*/}
            {/*</a>*/}
            {BIO && <span className="mx-1"> | {BIO}</span>}
          </div>
        </div>

        <div id="footer-bottom-right">
          {BEI_AN && (
            <>
              <i className="fas fa-shield-alt" />{' '}
              <a href="https://beian.miit.gov.cn/" className="mr-2">
                {siteConfig('BEI_AN')}
              </a>
            </>
          )}
          <BeiAnGongAn />

          <span className="busuanzi_container_site_pv hidden">
            <i className="fas fa-eye" />
            <span className="busuanzi_value_site_pv px-1"> </span>{' '}
          </span>
          <span className="busuanzi_container_site_uv hidden pl-2">
            <i className="fas fa-users" />{' '}
            <span className="busuanzi_value_site_uv px-1"> </span>{' '}
          </span>

          {/*<h1*/}
          {/*  className="text-xs pt-4 text-light-400 dark:text-gray-400">{siteConfig('BIO') && <>|</>} {siteConfig('BIO')}</h1>*/}
        </div>
      </div>
    </footer>
  )
}

export default Footer
