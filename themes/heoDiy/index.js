/**
 *   HEO 主题说明
 *  > 主题设计者 [张洪](https://zhheo.com/)
 *  > 主题开发者 [tangly1024](https://github.com/tangly1024)
 *  1. 开启方式 在blog.config.js 将主题配置为 `HEO`
 *  2. 更多说明参考此[文档](https://docs.tangly1024.com/article/notionnext-heo)
 */

import Comment from "@/components/Comment"
import { AdSlot } from "@/components/GoogleAdsense"
import { HashTag } from "@/components/HeroIcons"
import LazyImage from "@/components/LazyImage"
import LoadingCover from "@/components/LoadingCover"
import replaceSearchResult from "@/components/Mark"
import NotionPage from "@/components/NotionPage"
import ShareBar from "@/components/ShareBar"
import WWAds from "@/components/WWAds"
import { siteConfig } from "@/lib/config"
import { useGlobal } from "@/lib/global"
import { loadWowJS } from "@/lib/plugins/wow"
import { isBrowser } from "@/lib/utils"
import { Transition } from "@headlessui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import BlogPostArchive from "./components/BlogPostArchive"
import BlogPostListPage from "./components/BlogPostListPage"
import BlogPostListScroll from "./components/BlogPostListScroll"
import CategoryBar from "./components/CategoryBar"
import FloatTocButton from "./components/FloatTocButton"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Hero from "./components/Hero"
import LatestPostsGroup from "./components/LatestPostsGroup"
import { NoticeBar } from "./components/NoticeBar"
import PostAdjacent from "./components/PostAdjacent"
import PostCopyright from "./components/PostCopyright"
import PostHeader from "./components/PostHeader"
import { PostLock } from "./components/PostLock"
import PostRecommend from "./components/PostRecommend"
import SearchNav from "./components/SearchNav"
import SideRight from "./components/SideRight"
import CONFIG from "./config"
import { Style } from "./style"
import AISummary from "@/components/AISummary"
import { FullScreenMedia } from "./components/FullScreenMedia"
import { MomentsCard } from "./components/MomentsCard"
import { FanPlayList } from "./components/FanPlayList"

/**
 * 基础布局 采用上中下布局，移动端使用顶部侧边导航栏
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { children, slotTop, className } = props

  // 全屏模式下的最大宽度
  const { fullWidth, isDarkMode } = useGlobal()
  const router = useRouter()

  const headerSlot = (
    <header className={`relative ${router.route === "/" ? "h-screen" : ""}`}>
      {/* 顶部导航 */}
      <Header {...props} />

      {/* 首页视频 */}
      {router.route === "/" ? (
        <>
          <FullScreenMedia />
        </>
      ) : null}
      {fullWidth ? null : <PostHeader {...props} isDarkMode={isDarkMode} />}
    </header>
  )

  const recommendSlot = (
    <div>
      {/* 通知横幅 */}
      {router.route === "/" ? (
        <>
          <NoticeBar />
          <Hero {...props} />
        </>
      ) : null}
    </div>
  )

  // 右侧栏 用户信息+标签列表
  const slotRight =
    router.route === "/404" ||
      router.route === "/moments" ||
      router.route === "/fan-play" ||
      fullWidth ? null : (
      <SideRight {...props} />
    )

  const maxWidth = fullWidth ? "max-w-[96rem] mx-auto" : "max-w-[86rem]" // 普通最大宽度是86rem和顶部菜单栏对齐，留空则与窗口对齐

  const HEO_HERO_BODY_REVERSE = siteConfig(
    "HEO_HERO_BODY_REVERSE",
    false,
    CONFIG
  )
  const HEO_LOADING_COVER = siteConfig("HEO_LOADING_COVER", true, CONFIG)

  // 加载wow动画
  useEffect(() => {
    loadWowJS()
  }, [])

  return (
    <div
      id="theme-heo"
      className={`${siteConfig("FONT_STYLE")} flex h-full min-h-screen flex-col scroll-smooth bg-[#f7f9fe] dark:bg-[#18171d]`}>
      <Style />

      {/* 顶部嵌入 导航栏，首页放hero，文章页放文章详情 */}
      {headerSlot}

      {recommendSlot}

      {/* 主区块 */}
      <main
        id="wrapper-outer"
        className={`w-full flex-grow ${maxWidth} relative mx-auto md:p-5`}>
        <div
          id="container-inner"
          className={`${HEO_HERO_BODY_REVERSE ? "flex-row-reverse" : ""} relative z-10 mx-auto w-full justify-center lg:flex`}>
          <div className={`h-auto w-full ${className || ""}`}>
            {/* 主区上部嵌入 */}
            {slotTop}
            {children}
          </div>

          {router.route !== "/moments" && router.route !== "/fan-play" && (
            <div className="lg:px-2"></div>
          )}

          <div className="hidden xl:block">
            {/* 主区快右侧 */}
            {slotRight}
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <Footer />

      {HEO_LOADING_COVER && <LoadingCover />}
    </div>
  )
}

/**
 * 首页
 * 是一个博客列表，嵌入一个Hero大图
 * @param {*} props
 * @returns
 */
const LayoutIndex = props => {
  return (
    <div id="post-outer-wrapper" className="px-5 md:px-0">
      {/* 文章分类条 */}
      <CategoryBar {...props} />
      {siteConfig("POST_LIST_STYLE") === "page" ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}
    </div>
  )
}

/**
 * 博客列表
 * @param {*} props
 * @returns
 */
const LayoutPostList = props => {
  return (
    <div id="post-outer-wrapper" className="px-5 md:px-0">
      {/* 文章分类条 */}
      <CategoryBar {...props} />
      {siteConfig("POST_LIST_STYLE") === "page" ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}
    </div>
  )
}

/**
 * 搜索
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s

  useEffect(() => {
    // 高亮搜索结果
    if (currentSearch) {
      setTimeout(() => {
        replaceSearchResult({
          doms: document.getElementsByClassName("replace"),
          search: currentSearch,
          target: {
            element: "span",
            className: "text-red-500 border-b border-dashed"
          }
        })
      }, 100)
    }
  }, [])
  return (
    <div currentSearch={currentSearch}>
      <div id="post-outer-wrapper" className="px-5 md:px-0">
        {!currentSearch ? (
          <SearchNav {...props} />
        ) : (
          <div id="posts-wrapper">
            {siteConfig("POST_LIST_STYLE") === "page" ? (
              <BlogPostListPage {...props} />
            ) : (
              <BlogPostListScroll {...props} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * 归档
 * @param {*} props
 * @returns
 */
const LayoutArchive = props => {
  const { archivePosts } = props

  // 归档页顶部显示条，如果是默认归档则不显示。分类详情页显示分类列表，标签详情页显示当前标签

  return (
    <div className="w-full max-w-6xl rounded-xl border bg-white p-5 dark:border-gray-600 dark:bg-[#1e1e1e]">
      {/* 文章分类条 */}
      <CategoryBar {...props} border={false} />

      <div className="px-3">
        {Object.keys(archivePosts).map(archiveTitle => (
          <BlogPostArchive
            key={archiveTitle}
            posts={archivePosts[archiveTitle]}
            archiveTitle={archiveTitle}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * 文章详情
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const { locale, fullWidth } = useGlobal()

  const [hasCode, setHasCode] = useState(false)

  useEffect(() => {
    const hasCode = document.querySelectorAll('[class^="language-"]').length > 0
    setHasCode(hasCode)
  }, [])

  const commentEnable =
    siteConfig("COMMENT_TWIKOO_ENV_ID") ||
    siteConfig("COMMENT_WALINE_SERVER_URL") ||
    siteConfig("COMMENT_VALINE_APP_ID") ||
    siteConfig("COMMENT_GISCUS_REPO") ||
    siteConfig("COMMENT_CUSDIS_APP_ID") ||
    siteConfig("COMMENT_UTTERRANCES_REPO") ||
    siteConfig("COMMENT_GITALK_CLIENT_ID") ||
    siteConfig("COMMENT_WEBMENTION_ENABLE")

  const router = useRouter()
  const waiting404 = siteConfig("POST_WAITING_TIME_FOR_404") * 1000
  useEffect(() => {
    // 404
    if (!post) {
      setTimeout(() => {
        if (isBrowser) {
          const article = document.querySelector(
            "#article-wrapper #notion-article"
          )
          if (!article) {
            router.push("/404").then(() => {
              console.warn("找不到页面", router.asPath)
            })
          }
        }
      }, waiting404)
    }
  }, [post])
  return (
    <>
      <div
        className={`article h-full w-full ${fullWidth ? "" : "xl:max-w-5xl"} ${hasCode ? "xl:w-[73.15vw]" : ""} rounded-2xl bg-white dark:border-gray-600 dark:bg-[#18171d] lg:border lg:px-2 lg:py-4 lg:hover:shadow`}>
        {/* 文章锁 */}
        {lock && <PostLock validPassword={validPassword} />}

        {!lock && post && (
          <div className="mx-auto md:w-full md:px-5">
            {/* 文章主体 */}
            <article
              id="article-wrapper"
              itemScope
              itemType="https://schema.org/Movie">
              {/* Notion文章主体 */}
              <section
                className="wow fadeInUp mx-auto justify-center p-5"
                data-wow-delay=".2s">
                <AISummary aiSummary={post.aiSummary} />
                <WWAds orientation="horizontal" className="w-full" />
                {post && <NotionPage post={post} />}
                <WWAds orientation="horizontal" className="w-full" />
              </section>

              {/* 上一篇\下一篇文章 */}
              <PostAdjacent {...props} />

              {/* 分享 */}
              <ShareBar post={post} />
              {post?.type === "Post" && (
                <div className="px-5">
                  {/* 版权 */}
                  {/*<PostCopyright {...props} />*/}
                  {/* 文章推荐 */}
                  <PostRecommend {...props} />
                </div>
              )}
            </article>

            {/* 评论区 */}
            {fullWidth ? null : (
              <div className={`${commentEnable && post ? "" : "hidden"}`}>
                <hr className="my-4 border-dashed" />
                {/* 评论区上方广告 */}
                <div className="py-2">
                  <AdSlot />
                </div>
                {/* 评论互动 */}
                <div className="overflow-x-auto px-5 duration-200">
                  <div className="text-2xl dark:text-white">
                    <i className="fas fa-comment mr-1" />
                    {locale.COMMON.COMMENTS}
                  </div>
                  <Comment frontMatter={post} className="" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <FloatTocButton {...props} />
    </>
  )
}

/**
 * 404
 * @param {*} props
 * @returns
 */
const Layout404 = props => {
  // const { meta, siteInfo } = props
  const { onLoading, fullWidth } = useGlobal()
  return (
    <>
      {/* 主区块 */}
      <main
        id="wrapper-outer"
        className={`flex-grow ${fullWidth ? "" : "max-w-4xl"} mx-auto w-screen px-5`}>
        <div id="error-wrapper" className={"mx-auto w-full justify-center"}>
          <Transition
            show={!onLoading}
            appear={true}
            enter="transition ease-in-out duration-700 transform order-first"
            enterFrom="opacity-0 translate-y-16"
            enterTo="opacity-100"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-16"
            unmount={false}>
            {/* 404卡牌 */}
            <div className="error-content mt-12 flex h-[30rem] w-full flex-col items-center justify-center rounded-3xl border bg-white dark:border-gray-800 dark:bg-[#1B1C20] md:h-96 md:flex-row">
              {/* 左侧动图 */}
              <LazyImage
                className="error-img h-60 p-4 md:h-full"
                src={
                  "https://bu.dusays.com/2023/03/03/6401a7906aa4a.gif"
                }></LazyImage>

              {/* 右侧文字 */}
              <div className="error-info flex flex-1 flex-col items-center justify-center space-y-4">
                <h1 className="error-title text-7xl font-extrabold dark:text-white md:text-9xl">
                  404
                </h1>
                <div className="dark:text-white">请尝试站内搜索寻找文章</div>
                <Link href="/">
                  <button className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow transition-all duration-200 hover:bg-blue-600 hover:shadow-md">
                    回到主页
                  </button>
                </Link>
              </div>
            </div>

            {/* 404页面底部显示最新文章 */}
            <div className="mt-12">
              <LatestPostsGroup {...props} />
            </div>
          </Transition>
        </div>
      </main>
    </>
  )
}

/**
 * 分类列表
 * @param {*} props
 * @returns
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  const { locale } = useGlobal()

  return (
    <div id="category-outer-wrapper" className="mt-8 px-5 md:px-0">
      <div className="mb-5 text-4xl font-extrabold dark:text-gray-200">
        {locale.COMMON.CATEGORY}
      </div>
      <div
        id="category-list"
        className="m-10 flex flex-wrap justify-center duration-200">
        {categoryOptions?.map(category => {
          return (
            <Link
              key={category.name}
              href={`/category/${category.name}`}
              passHref
              legacyBehavior>
              <div
                className={
                  "group mb-5 mr-5 flex cursor-pointer flex-nowrap items-center rounded-xl border bg-white px-4 py-3 text-2xl transition-all duration-150 hover:scale-110 hover:bg-indigo-600 hover:text-white dark:hover:text-white"
                }>
                <HashTag className={"h-5 w-5 stroke-gray-500 stroke-2"} />
                {category.name}
                <div className="ml-1 rounded-lg bg-[#f1f3f8] px-2 group-hover:text-indigo-600">
                  {category.count}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

/**
 * 标签列表
 * @param {*} props
 * @returns
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  const { locale } = useGlobal()

  return (
    <div id="tag-outer-wrapper" className="mt-8 px-5 md:px-0">
      <div className="mb-5 text-4xl font-extrabold dark:text-gray-200">
        {locale.COMMON.TAGS}
      </div>
      <div
        id="tag-list"
        className="m-10 flex flex-wrap justify-center space-x-5 space-y-5 duration-200">
        {tagOptions.map(tag => {
          return (
            <Link
              key={tag.name}
              href={`/tag/${tag.name}`}
              passHref
              legacyBehavior>
              <div
                className={
                  "group flex cursor-pointer flex-nowrap items-center rounded-xl border bg-white px-4 py-3 text-2xl transition-all duration-150 hover:scale-110 hover:bg-indigo-600 hover:text-white dark:hover:text-white"
                }>
                <HashTag className={"h-5 w-5 stroke-gray-500 stroke-2"} />
                {tag.name}
                <div className="ml-1 rounded-lg bg-[#f1f3f8] px-2 group-hover:text-indigo-600">
                  {tag.count}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

const LayoutMoments = props => {
  return <MomentsCard />
}

const LayoutFanPlay = props => {
  return <FanPlayList animeData={props.animeData} />
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  LayoutMoments,
  LayoutFanPlay,
  CONFIG as THEME_CONFIG
}
