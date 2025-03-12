import Live2D from "@/components/Live2D"
import dynamic from "next/dynamic"
import { AnalyticsCard } from "./AnalyticsCard"
import Card from "./Card"
import Catalog from "./Catalog"
import { InfoCard } from "./InfoCard"
import LatestPostsGroupMini from "./LatestPostsGroupMini"
import TagGroups from "./TagGroups"
import TouchMeCard from "./TouchMeCard"

const FaceBookPage = dynamic(
  () => {
    let facebook = <></>
    try {
      facebook = import("@/components/FacebookPage")
    } catch (err) {
      console.error(err)
    }
    return facebook
  },
  { ssr: false }
)

/**
 * Hexo主题右侧栏
 * @param {*} props
 * @returns
 */
export default function SideRight(props) {
  const { post, tagOptions, currentTag, rightAreaSlot } = props

  // 只摘取标签的前60个，防止右侧过长
  const sortedTags = tagOptions?.slice(0, 60) || []

  return (
    <div id="sideRight" className="hidden h-full w-72 space-y-4 xl:block">
      <InfoCard {...props} className="wow fadeInUp w-72" />

      <div className="sticky top-20 space-y-4">
        {/* 文章页显示目录 */}
        {post && post.toc && post.toc.length > 0 && (
          <Card className="wow fadeInUp bg-white dark:bg-[#1e1e1e]">
            <Catalog toc={post.toc} />
          </Card>
        )}

        {/* 联系交流群 */}
        {/*<div className='wow fadeInUp'>*/}
        {/*  <TouchMeCard />*/}
        {/*</div>*/}

        {/* 最新文章列表 */}
        <div
          className={
            "wow fadeInUp hidden rounded-xl border bg-white p-4 duration-200 hover:border-indigo-600 dark:border-gray-700 dark:bg-[#1e1e1e] dark:text-white dark:hover:border-yellow-600 lg:block lg:p-6"
          }>
          <LatestPostsGroupMini {...props} />
        </div>

        {rightAreaSlot}

        <FaceBookPage />
        <Live2D />

        {/* 标签和成绩 */}
        <Card
          className={
            "bg-white duration-200 hover:border-indigo-600 dark:bg-[#1e1e1e] dark:text-white dark:hover:border-yellow-600"
          }>
          <TagGroups tags={sortedTags} currentTag={currentTag} />
          <hr className="relative mx-1 my-4 flex border-dashed" />
          <AnalyticsCard {...props} />
        </Card>
      </div>
    </div>
  )
}
