import { ArrowRightCircle } from "@/components/HeroIcons"
import LazyImage from "@/components/LazyImage"
import { siteConfig } from "@/lib/config"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback, useEffect, useRef, useState } from "react"
import CONFIG from "../config"
import Announcement from "./Announcement"
import Card from "./Card"

/**
 * 社交信息卡
 * @param {*} props
 * @returns
 */
export function InfoCard(props) {
  const { siteInfo, notice } = props
  const router = useRouter()
  // 在文章详情页特殊处理
  const isSlugPage = router.pathname.indexOf("/[prefix]") === 0
  const url1 = siteConfig("HEO_INFO_CARD_URL1", null, CONFIG)
  const icon1 = siteConfig("HEO_INFO_CARD_ICON1", null, CONFIG)
  const url2 = siteConfig("HEO_INFO_CARD_URL2", null, CONFIG)
  const icon2 = siteConfig("HEO_INFO_CARD_ICON2", null, CONFIG)

  const [activePanel, setActivePanel] = useState(null)
  const panelRefs = useRef([]) // 存储每个面板内容的 ref

  const panels = [
    {
      title: "最喜欢的动漫 📺",
      content: "命运石之门、进击的巨人、魔法少女小圆、CLANNAD、Angel Beats!..."
    },
    {
      title: "最喜欢的女孩子们 🥰",
      content: "凉宫春日、牧濑红莉栖、鹿目圆、古河渚、立华奏..."
    },
    {
      title: "最喜欢玩的游戏 🎮",
      content: "塞尔达传说、只狼、艾尔登法环、女神异闻录5、异度神剑3..."
    }
  ]

  // 动态设置 ref
  useEffect(() => {
    panelRefs.current = panelRefs.current.slice(0, panels.length)
  }, [panels.length])

  // 处理切换的回调，避免重复创建函数
  const togglePanel = useCallback(index => {
    setActivePanel(prev => (prev === index ? null : index))
  }, [])

  return (
    <Card className="fadeInUp relative flex w-72 flex-col overflow-hidden bg-white !p-0 text-white dark:bg-[#1e1e1e]">
      {/* 信息卡牌第一行 */}
      <div className="flex justify-center p-4">
        {/* 问候语 */}
        <GreetingsWords />
      </div>
      {/* 头像 */}
      <div className="relative my-6">
        <div
          className={`${isSlugPage ? "absolute right-0 -mr-6 -mt-8 blur hover:scale-150 hover:opacity-0" : ""} flex transform items-center justify-center transition-all duration-200 dark:text-gray-100`}>
          <div className="relative origin-bottom transition-all duration-300">
            <LazyImage
              src={siteInfo?.icon}
              className="rounded-full border-[5px] dark:border-black"
              width={isSlugPage ? 100 : 118}
              alt={siteConfig("AUTHOR")}
            />
            <div className="absolute bottom-1 right-1">
              <LazyImage
                src="/images/avatar.gif"
                className="rounded-full"
                width={33}
                alt={siteConfig("AUTHOR")}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center p-4 text-sm text-[#9ca3af] dark:text-gray-100">
        没有BUG的代码是不完美的
      </div>
      <div className="w-full">
        {panels.map((panel, index) => (
          <div key={index} className="w-full border-t border-gray-100">
            <button
              onClick={() => togglePanel(index)}
              className="flex w-full items-center justify-between p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-50/10">
              <div className="text-sm text-gray-600 dark:text-gray-100">
                {panel.title}
              </div>
              <span
                className={`relative inline-block h-3 w-3 before:absolute before:h-2 before:w-2 before:origin-center before:border-b-2 before:border-r-2 before:border-[#9ca3af] before:transition-[transform_0.3s_ease-in-out] before:content-[''] dark:before:border-gray-100 ${activePanel === index ? "before:left-[2px] before:top-[1px] before:rotate-45" : "before:left-0 before:top-[2px] before:-rotate-45"}`}
              />
            </button>
            <div
              ref={el => (panelRefs.current[index] = el)}
              className={`overflow-hidden opacity-0 transition-[height_0.3s_ease-in-out,opacity_0.3s_ease-in-out] ${activePanel === index ? "opacity-100" : ""}`}
              style={{
                height:
                  activePanel === index
                    ? `${panelRefs.current[index]?.scrollHeight || 0}px`
                    : "0px"
              }}>
              <div className="p-3">
                <p className="text-sm text-gray-500 dark:text-gray-100">
                  {panel.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/*<h2 className='text-3xl font-extrabold mt-3'>{siteConfig('AUTHOR')}</h2>*/}

      {/* 公告栏 */}
      {/*<Announcement post={notice} style={{ color: 'white !important' }} />*/}

      {/*<div className="flex justify-between">*/}
      {/*  <div className="flex space-x-3 hover:text-black dark:hover:text-white">*/}
      {/*    /!* 两个社交按钮 *!/*/}
      {/*    {url1 && (*/}
      {/*      <div className="w-10 rounded-full bg-indigo-400 p-2 text-center transition-colors duration-200 hover:bg-white dark:bg-yellow-500 dark:hover:bg-black">*/}
      {/*        <Link href={url1}>*/}
      {/*          <i className={icon1} />*/}
      {/*        </Link>*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*    {url2 && (*/}
      {/*      <div className="flex w-10 items-center justify-center rounded-full bg-indigo-400 p-2 transition-colors duration-200 hover:bg-white dark:bg-yellow-500 dark:hover:bg-black">*/}
      {/*        <Link href={url2}>*/}
      {/*          <i className={icon2} />*/}
      {/*        </Link>*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*  /!* 第三个按钮 *!/*/}
      {/*  /!*<MoreButton />*!/*/}
      {/*</div>*/}
    </Card>
  )
}

/**
 * 了解更多按鈕
 * @returns
 */
function MoreButton() {
  const url3 = siteConfig("HEO_INFO_CARD_URL3", null, CONFIG)
  const text3 = siteConfig("HEO_INFO_CARD_TEXT3", null, CONFIG)
  if (!url3) {
    return <></>
  }
  return (
    <Link href={url3}>
      <div
        className={
          "group flex items-center space-x-1 rounded-full bg-indigo-400 px-3 py-2 transition-colors duration-200 hover:bg-white hover:text-black dark:bg-yellow-500 dark:hover:bg-black dark:hover:text-white"
        }>
        <ArrowRightCircle
          className={
            "h-6 w-6 transition-all duration-100 group-hover:stroke-black dark:group-hover:stroke-white"
          }
        />
        <div className="font-bold">{text3}</div>
      </div>
    </Link>
  )
}

/**
 * 欢迎语
 */
function GreetingsWords() {
  const greetings = siteConfig("HEO_INFOCARD_GREETINGS", null, CONFIG)
  const [greeting, setGreeting] = useState(greetings[0])
  // 每次点击，随机获取greetings中的一个
  const handleChangeGreeting = () => {
    const randomIndex = Math.floor(Math.random() * greetings.length)
    setGreeting(greetings[randomIndex])
  }

  return (
    <div
      onClick={handleChangeGreeting}
      className="cursor-pointer select-none rounded-lg bg-indigo-400 px-2 py-1 text-sm transition-colors duration-200 hover:bg-indigo-50 hover:text-indigo-950 dark:bg-yellow-500 dark:hover:bg-black dark:hover:text-white">
      {greeting}
    </div>
  )
}
