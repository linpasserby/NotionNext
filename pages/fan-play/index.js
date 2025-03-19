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

  // 获取全局数据
  const globalData = await getGlobalData({ from: "fan-play", locale }) || {}

  // 获取番剧数据
  let animeData = []
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/bilibili`)
    animeData = await response.json()
  } catch (error) {
    console.error('Failed to fetch anime data:', error)
  }

  return {
    props: {
      ...globalData,
      animeData
    }
  }
}

export default FanPlay
