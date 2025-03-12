import { siteConfig } from "@/lib/config"

/**
 * 驱动版权
 * @returns
 */
export default function PoweredBy(props) {
  return (
    <div className={`inline font-serif text-sm ${props.className || ""}`}>
      <span className="mr-1">啦啦啦啦啦</span>
      {/*<a*/}
      {/*  href="https://github.com/tangly1024/NotionNext"*/}
      {/*  className="justify-start underline">*/}
      {/*  NotionNext {siteConfig("VERSION")}*/}
      {/*</a>*/}
      {/*.*/}
    </div>
  )
}
