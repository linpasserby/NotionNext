import { getGlobalData } from "@/lib/db/getSiteData"
import { DynamicLayout } from "@/themes/theme"
import { siteConfig } from "@/lib/config"
import BLOG from "@/blog.config"

const FanPlay = props => {
  const theme = siteConfig("THEME", BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName="LayoutFanPlay" {...props} />
}

export async function getStaticProps(req) {
  const { locale } = req

  const props = (await getGlobalData({ from: "fan-play", locale })) || {}
  return { props }
}

export default FanPlay
