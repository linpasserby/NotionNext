import { siteConfig } from '@/lib/config'
import CONFIG from '@/themes/heoDiy/config'

// 格式化数字为万或亿
function formatNumber(num) {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(1) + '亿'
  } else if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万'
  }
  return num.toString()
}

// 从 Bilibili API 获取番剧列表
export default async function handler(req, res) {
  let { uuid, buvid3, sid, DedeUserID, DedeUserID_ckMd5, SESSDATA, bili_jct } =
    siteConfig('BILIBILI_CONFIG', null, CONFIG)
  if (req.method === 'GET') {
    // 从环境变量中获取用户 ID，构建 API 请求 URL
    const apiUrl = `https://api.bilibili.com/x/space/bangumi/follow/list?type=1&vmid=${DedeUserID}`

    // 发送 API 请求
    try {
      // 从 Bilibili API 获取番剧列表
      const response = await fetch(apiUrl, {
        headers: {
          Cookie: `uuid=${uuid}; buvid3=${buvid3}; sid=${sid}; DedeUserID=${DedeUserID}; DedeUserID__ckMd5=${DedeUserID_ckMd5}; SESSDATA=${SESSDATA}; bili_jct=${bili_jct}`
        }
      })

      // 如果 API 请求失败，抛出错误
      if (!response.ok) {
        throw new Error(
          `Bilibili API 请求失败: ${response.status} ${response.statusText}`
        )
      }

      // 从 API 响应中提取 JSON 数据
      const data = await response.json()
      const programList = data.data.list

      // 从 API 响应中提取所需的数据
      const programs = await Promise.all(
        programList.map(async program => {
          return {
            title: program.title,
            epNum: program.new_ep.index_show,
            epTitle: program.new_ep.long_title,
            cover: program.cover,
            epUrl: program.url,
            summary: program.summary,
            season_type_name: program.season_type_name,
            areas_name: program.areas.map(item => item.name).join(','),
            play_count: formatNumber(program.stat.view),
            follow_count: formatNumber(program.stat.follow),
            coin_count: formatNumber(program.stat.coin),
            danmaku_count: formatNumber(program.stat.danmaku),
            score: program.rating.score
          }
        })
      )

      // 将数据作为 JSON 响应发送
      res.status(200).json(programs)
    } catch (error) {
      // 如果出错，将错误作为 JSON 响应发送
      console.error('获取数据时出错:', error)
      res.status(500).json({ error: '获取数据时出错' })
    }
  } else {
    // 如果不是 GET 请求，返回错误
    res.status(405).json({ error: '方法不允许' })
  }
}
