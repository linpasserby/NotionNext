import { getGlobalData } from "@/lib/db/getSiteData"
import { DynamicLayout } from "@/themes/theme"
import { siteConfig } from "@/lib/config"
import BLOG from "@/blog.config"

const FanPlay = props => {
  const theme = siteConfig("THEME", BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName="LayoutFanPlay" {...props} />
}

export async function getServerSideProps(context) {
  const { locale } = context
  const protocol = process.env.VERCEL_ENV === "production" ? "https" : "http"
  const baseUrl = context.req ? `${protocol}://${context.req.headers.host}` : ""
  console.log("baseUrl:", baseUrl)
  console.log("Request URL:", `${baseUrl}/api/bilibili`)

  // 获取全局数据
  const globalData = (await getGlobalData({ from: "fan-play", locale })) || {}

  // 获取番剧数据
  let animeData = []
  try {
    const response = await fetch(`${baseUrl}/api/bilibili`)
    animeData = await response.json()
  } catch (error) {
    console.error("Failed to fetch anime data:", error)
  }

  return {
    props: {
      ...globalData,
      animeData
    }
  }
}

export default FanPlay
