// import Image from 'next/image'
import { ArrowSmallRight, PlusSmall } from "@/components/HeroIcons"
import LazyImage from "@/components/LazyImage"
import { siteConfig } from "@/lib/config"
import { useGlobal } from "@/lib/global"
import Link from "next/link"
import { useRouter } from "next/router"
import { useImperativeHandle, useRef, useState } from "react"
import CONFIG from "../config"

/**
 * 顶部英雄区
 * 左右布局，
 * 左侧：banner组
 * 右侧：今日卡牌遮罩
 * @returns
 */
const Hero = props => {
  const HEO_HERO_REVERSE = siteConfig("HEO_HERO_REVERSE", false, CONFIG)
  return (
    <div
      id="hero-wrapper"
      className="recent-top-post-group mb-4 w-full select-none overflow-hidden px-5">
      <div
        id="hero"
        style={{ zIndex: 1 }}
        className={`${HEO_HERO_REVERSE ? "xl:flex-row-reverse" : ""} recent-post-top recent-top-post-group relative mx-auto flex w-full max-w-[86rem] flex-row flex-nowrap overflow-x-scroll rounded-[12px] 2xl:px-5`}>
        {/* 左侧banner组 */}
        <BannerGroup {...props} />

        {/* 中间留白 */}
        <div className="h-full px-1.5"></div>

        {/* 右侧置顶文章组 */}
        <TopGroup {...props} />
      </div>
    </div>
  )
}

/**
 * 英雄区左侧banner组
 * @returns
 */
function BannerGroup(props) {
  return (
    // 左侧英雄区
    <div
      id="bannerGroup"
      className="mr-2 flex max-w-[42rem] flex-1 flex-col justify-between">
      {/* 动图 */}
      <Banner {...props} />
      {/* 导航分类 */}
      <GroupMenu />
    </div>
  )
}

/**
 * 英雄区左上角banner动图
 * @returns
 */
function Banner(props) {
  const router = useRouter()
  const { allNavPages } = props

  /**
   * 随机跳转文章
   */
  function handleClickBanner() {
    const randomIndex = Math.floor(Math.random() * allNavPages.length)
    const randomPost = allNavPages[randomIndex]
    router.push(`${siteConfig("SUB_PATH", "")}/${randomPost?.slug}`)
  }

  // 遮罩文字
  const coverTitle = siteConfig("HEO_HERO_COVER_TITLE")

  return (
    <div
      id="banners"
      onClick={handleClickBanner}
      className="group relative mb-3 hidden h-full overflow-hidden rounded-xl border bg-white dark:border-gray-700 dark:bg-[#1e1e1e] xl:flex xl:flex-col">
      <div
        id="banner-title"
        className="absolute left-10 top-10 z-10 flex flex-col">
        <div className="mb-3 text-4xl font-bold dark:text-white">
          {siteConfig("HEO_HERO_TITLE_1", null, CONFIG)}
          <br />
          {siteConfig("HEO_HERO_TITLE_2", null, CONFIG)}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-200">
          {siteConfig("HEO_HERO_TITLE_3", null, CONFIG)}
        </div>
      </div>

      {/* 斜向滚动的图标 */}
      <TagsGroupBar />

      {/* 遮罩 */}
      <div
        id="banner-cover"
        style={{ backdropFilter: "blur(15px)" }}
        className={
          "absolute top-0 z-20 flex h-full w-full cursor-pointer items-center justify-start overflow-hidden rounded-xl bg-[#4259efdd] opacity-0 transition-all duration-300 group-hover:opacity-100 dark:bg-[#dca846] dark:text-white"
        }>
        <div className="ml-12 -translate-x-32 transition-all duration-300 ease-in group-hover:translate-x-0">
          <div className="text-7xl font-extrabold text-white">{coverTitle}</div>
          <div className="-ml-3 text-gray-300">
            <ArrowSmallRight className={"h-24 w-24 stroke-2"} />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 图标滚动标签组
 * 英雄区左上角banner条中斜向滚动的图标
 */
function TagsGroupBar() {
  let groupIcons = siteConfig("HEO_GROUP_ICONS", null, CONFIG)
  if (groupIcons) {
    groupIcons = groupIcons.concat(groupIcons)
  }
  return (
    <div className="tags-group-all flex h-full -rotate-[30deg]">
      <div className="tags-group-wrapper absolute top-16 flex flex-nowrap">
        {groupIcons?.map((g, index) => {
          return (
            <div key={index} className="tags-group-icon-pair ml-6 select-none">
              <div
                style={{ background: g.color_1 }}
                className={
                  "tags-group-icon flex h-28 w-28 items-center justify-center rounded-3xl text-lg font-bold text-white shadow-md"
                }>
                <LazyImage
                  priority={true}
                  src={g.img_1}
                  title={g.title_1}
                  className="hidden w-2/3 xl:block"
                />
              </div>
              <div
                style={{ background: g.color_2 }}
                className={
                  "tags-group-icon mt-5 flex h-28 w-28 items-center justify-center rounded-3xl text-lg font-bold text-white shadow-md"
                }>
                <LazyImage
                  priority={true}
                  src={g.img_2}
                  title={g.title_2}
                  className="hidden w-2/3 xl:block"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * 英雄区左下角3个指定分类按钮
 * @returns
 */
function GroupMenu() {
  const url_1 = siteConfig("HEO_HERO_CATEGORY_1", {}, CONFIG)?.url || ""
  const title_1 = siteConfig("HEO_HERO_CATEGORY_1", {}, CONFIG)?.title || ""
  const url_2 = siteConfig("HEO_HERO_CATEGORY_2", {}, CONFIG)?.url || ""
  const title_2 = siteConfig("HEO_HERO_CATEGORY_2", {}, CONFIG)?.title || ""
  const url_3 = siteConfig("HEO_HERO_CATEGORY_3", {}, CONFIG)?.url || ""
  const title_3 = siteConfig("HEO_HERO_CATEGORY_3", {}, CONFIG)?.title || ""

  return (
    <div className="flex h-[165px] w-28 select-none flex-col justify-between lg:w-48 xl:h-20 xl:w-full xl:flex-row xl:flex-nowrap xl:space-x-3 xl:space-y-0">
      <Link
        href={url_1}
        className="group relative flex h-20 items-center justify-start overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 text-white transition-all duration-500 ease-in xl:w-1/3 xl:hover:w-1/2">
        <div className="relative -mt-2 pl-5 font-bold lg:text-lg">
          {title_1}
          <span className="absolute -bottom-0.5 left-5 h-0.5 w-5 rounded-full bg-white"></span>
        </div>
        <div className="absolute right-6 hidden translate-y-6 rotate-12 scale-[2] opacity-20 transition-all duration-700 ease-in-out group-hover:translate-y-0 group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-80 lg:block">
          <i className="fa-solid fa-star text-4xl"></i>
        </div>
      </Link>
      <Link
        href={url_2}
        className="group relative flex h-20 items-center justify-start overflow-hidden rounded-xl bg-gradient-to-r from-red-500 to-yellow-500 text-white transition-all duration-500 ease-in xl:w-1/3 xl:hover:w-1/2">
        <div className="relative -mt-2 pl-5 font-bold lg:text-lg">
          {title_2}
          <span className="absolute -bottom-0.5 left-5 h-0.5 w-5 rounded-full bg-white"></span>
        </div>
        <div className="absolute right-6 hidden translate-y-6 rotate-12 scale-[2] opacity-20 transition-all duration-700 ease-in-out group-hover:translate-y-0 group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-80 lg:block">
          <i className="fa-solid fa-fire-flame-curved text-4xl"></i>
        </div>
      </Link>
      {/* 第三个标签在小屏上不显示 */}
      <Link
        href={url_3}
        className="group relative hidden h-20 items-center justify-start overflow-hidden rounded-xl bg-gradient-to-r from-teal-300 to-cyan-300 text-white transition-all duration-500 ease-in xl:flex xl:w-1/3 xl:hover:w-1/2">
        <div className="relative -mt-2 pl-5 text-lg font-bold">
          {title_3}
          <span className="absolute -bottom-0.5 left-5 h-0.5 w-5 rounded-full bg-white"></span>
        </div>
        <div className="absolute right-6 translate-y-6 rotate-12 scale-[2] opacity-20 transition-all duration-700 ease-in-out group-hover:translate-y-0 group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-80">
          <i className="fa-solid fa-book-bookmark text-4xl"></i>
        </div>
      </Link>
    </div>
  )
}

/**
 * 置顶文章区域
 */
function TopGroup(props) {
  const { latestPosts, allNavPages, siteInfo } = props
  const { locale } = useGlobal()
  const todayCardRef = useRef()

  function handleMouseLeave() {
    todayCardRef.current.coverUp()
  }

  // 获取置顶推荐文章
  const topPosts = getTopPosts({ latestPosts, allNavPages })

  return (
    <div
      id="hero-right-wrapper"
      onMouseLeave={handleMouseLeave}
      className="relative w-full flex-1">
      {/* 置顶推荐文章 */}
      <div
        id="top-group"
        className="flex w-full space-x-3 xl:grid xl:h-[342px] xl:grid-cols-3 xl:gap-3 xl:space-x-0">
        {topPosts?.map((p, index) => {
          return (
            <Link href={`${siteConfig("SUB_PATH", "")}/${p?.slug}`} key={index}>
              <div className="group relative flex h-[164px] w-52 cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow dark:bg-black dark:text-white xl:w-full">
                <LazyImage
                  priority={index === 0}
                  className="h-24 object-cover"
                  alt={p?.title}
                  src={p?.pageCoverThumbnail || siteInfo?.pageCover}
                />
                <div className="m-2 line-clamp-2 overflow-hidden font-semibold group-hover:text-indigo-600 dark:group-hover:text-yellow-600">
                  {p?.title}
                </div>
                {/* hover 悬浮的 ‘荐’ 字 */}
                <div className="absolute -left-2 -top-2 -translate-x-4 overflow-hidden rounded-xl bg-indigo-600 pb-2 pl-4 pr-2 pt-4 text-xs text-white opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 dark:bg-yellow-600">
                  {locale.COMMON.RECOMMEND_BADGES}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      {/* 一个大的跳转文章卡片 */}
      <TodayCard cRef={todayCardRef} siteInfo={siteInfo} />
    </div>
  )
}

/**
 * 获取推荐置顶文章
 */
function getTopPosts({ latestPosts, allNavPages }) {
  // 默认展示最近更新
  if (
    !siteConfig("HEO_HERO_RECOMMEND_POST_TAG", null, CONFIG) ||
    siteConfig("HEO_HERO_RECOMMEND_POST_TAG", null, CONFIG) === ""
  ) {
    return latestPosts
  }

  // 显示包含‘推荐’标签的文章
  let sortPosts = []

  // 排序方式
  if (
    JSON.parse(
      siteConfig("HEO_HERO_RECOMMEND_POST_SORT_BY_UPDATE_TIME", null, CONFIG)
    )
  ) {
    sortPosts = Object.create(allNavPages).sort((a, b) => {
      const dateA = new Date(a?.lastEditedDate)
      const dateB = new Date(b?.lastEditedDate)
      return dateB - dateA
    })
  } else {
    sortPosts = Object.create(allNavPages)
  }

  const topPosts = []
  for (const post of sortPosts) {
    if (topPosts.length === 6) {
      break
    }
    // 查找标签
    if (
      post?.tags?.indexOf(
        siteConfig("HEO_HERO_RECOMMEND_POST_TAG", null, CONFIG)
      ) >= 0
    ) {
      topPosts.push(post)
    }
  }
  return topPosts
}

/**
 * 英雄区右侧，今日卡牌
 * @returns
 */
function TodayCard({ cRef, siteInfo }) {
  const router = useRouter()
  const link = siteConfig("HEO_HERO_TITLE_LINK", null, CONFIG)
  const { locale } = useGlobal()
  // 卡牌是否盖住下层
  const [isCoverUp, setIsCoverUp] = useState(true)

  /**
   * 外部可以调用此方法
   */
  useImperativeHandle(cRef, () => {
    return {
      coverUp: () => {
        setIsCoverUp(true)
      }
    }
  })

  /**
   * 查看更多
   * @param {*} e
   */
  function handleClickShowMore(e) {
    e.stopPropagation()
    setIsCoverUp(false)
  }

  /**
   * 点击卡片跳转的链接
   * @param {*} e
   */
  function handleCardClick(e) {
    router.push(link)
  }

  return (
    <div
      id="today-card"
      className={`${
        isCoverUp ? " " : "pointer-events-none"
      } absolute top-0 hidden h-full w-full flex-1 flex-col overflow-hidden xl:flex`}>
      <div
        id="card-body"
        onClick={handleCardClick}
        className={`${
          isCoverUp
            ? "cursor-pointer opacity-100"
            : "pointer-events-none scale-110 transform opacity-0"
        } today-card relative flex h-full items-end overflow-hidden rounded-xl bg-black shadow transition-all duration-200`}>
        {/* 卡片文字信息 */}
        <div
          id="today-card-info"
          className="relative flex w-full items-center justify-between p-10 text-white">
          <div className="flex flex-col">
            <div className="text-xs font-light">
              {siteConfig("HEO_HERO_TITLE_4", null, CONFIG)}
            </div>
            <div className="text-xl font-bold">
              {siteConfig("HEO_HERO_TITLE_5", null, CONFIG)}
            </div>
          </div>
          {/* 查看更多的按钮 */}
          <div
            onClick={handleClickShowMore}
            className={`'${isCoverUp ? "" : "pointer-events-none hidden"} glassmorphism group z-10 flex h-10 items-center justify-center rounded-3xl px-3 transition-colors duration-100`}>
            <PlusSmall
              className={
                "mr-2 h-6 w-6 rounded-full bg-white stroke-black transition-all duration-500 group-hover:rotate-180"
              }
            />
            <div id="more" className="select-none">
              {locale.COMMON.RECOMMEND_POSTS}
            </div>
          </div>
        </div>

        {/* 封面图 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={siteInfo?.pageCover}
          id="today-card-cover"
          className={`${
            isCoverUp ? "" : "pointer-events-none"
          } today-card-cover absolute top-0 h-full w-full cursor-pointer object-cover duration-1000 hover:scale-110`}
        />
      </div>
    </div>
  )
}

export default Hero
