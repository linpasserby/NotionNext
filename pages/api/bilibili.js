import colorConvert from "color-convert"
import getColors from "get-image-colors"
import { siteConfig } from "@/lib/config"
import CONFIG from "@/themes/heoDiy/config"

// 从字符串中提取数字
function extractNumberFromString(str) {
  const match = str.match(/\d+/)
  return match ? parseInt(match[0]) : null
}

// 从时间字符串中提取时间部分，格式为 HH:MM
function extractTimeFromProgress(str) {
  // 使用正则表达式提取时间部分，格式为 HH:MM
  const match = str.match(/\d+:\d+/)
  return match ? " " + match[0] : null
}

// 剔除时间部分，保留数字部分
function removeTimeFromProgress(str) {
  // 使用正则表达式替换时间部分为空字符串
  return str.replace(/\s*\d+:\d+\s*/, "")
}

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
    siteConfig("BILIBILI_CONFIG", null, CONFIG)
  if (req.method === "GET") {
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
          const ColorJpg = await getDarkenedHexColorJpg(program.new_ep.cover)
          const ColorPng = await getDarkenedHexColorPng(program.new_ep.cover)
          return {
            title: program.title,
            epNum: program.new_ep.index_show,
            epTitle: program.new_ep.long_title,
            cover: program.cover,
            epUrl: program.url,
            epProgress: removeTimeFromProgress(program.progress),
            epTime: extractTimeFromProgress(program.progress),
            epStart: extractNumberFromString(program.progress),
            epEnd: extractNumberFromString(program.new_ep.index_show),
            epDarkenedColor: ColorJpg || ColorPng,
            summary: program.summary,
            season_type_name: program.season_type_name,
            areas_name: program.areas.map(item => item.name).join(","),
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
      console.error("获取数据时出错:", error)
      res.status(500).json({ error: "获取数据时出错" })
    }
  } else {
    // 如果不是 GET 请求，返回错误
    res.status(405).json({ error: "方法不允许" })
  }
}

// 异步函数：获取降低明度后的 HEX 颜色值（PNG 格式）
async function getDarkenedHexColorPng(coverUrl) {
  try {
    const response = await fetch(coverUrl, {
      headers: {
        Referer: "https://www.bilibili.com",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    })
    if (!response.ok) {
      throw new Error("无法获取图片")
    }
    const buffer = await response.buffer()

    const colors = await getColors(buffer, "image/png") // 根据图片类型进行调整
    const rgbColor = colors[0].rgb()

    // 降低明度并将颜色转换为 HEX 格式
    const darkenedRgbColor = [
      Math.round(rgbColor[0] * 0.5), // 降低 30% 红色分量并四舍五入到整数
      Math.round(rgbColor[1] * 0.5), // 降低 30% 绿色分量并四舍五入到整数
      Math.round(rgbColor[2] * 0.5) // 降低 30% 蓝色分量并四舍五入到整数
    ]
    const darkenedHexColor = colorConvert.rgb.hex(
      darkenedRgbColor[0],
      darkenedRgbColor[1],
      darkenedRgbColor[2]
    )

    return `#${darkenedHexColor}` // 在前面添加 #
  } catch (error) {
    console.error("获取图片颜色时出错:", error)
    return null
  }
}

// 异步函数：获取降低明度后的 HEX 颜色值（JPG 格式）
async function getDarkenedHexColorJpg(coverUrl) {
  try {
    const response = await fetch(coverUrl, {
      headers: {
        Referer: "https://www.bilibili.com",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    })
    if (!response.ok) {
      throw new Error("无法获取图片")
    }
    const buffer = await response.buffer()

    const colors2 = await getColors(buffer, "image/jpeg") // 根据图片类型进行调整
    const rgbColor2 = colors2[0].rgb()

    // 降低明度并将颜色转换为 HEX 格式
    const darkenedRgbColor2 = [
      Math.round(rgbColor2[0] * 0.5), // 降低 30% 红色分量并四舍五入到整数
      Math.round(rgbColor2[1] * 0.5), // 降低 30% 绿色分量并四舍五入到整数
      Math.round(rgbColor2[2] * 0.5) // 降低 30% 蓝色分量并四舍五入到整数
    ]
    const darkenedHexColor2 = colorConvert.rgb.hex(
      darkenedRgbColor2[0],
      darkenedRgbColor2[1],
      darkenedRgbColor2[2]
    )

    return `#${darkenedHexColor2}` // 在前面添加 #
  } catch (error) {
    console.error("获取图片颜色时出错:", error)
    return null
  }
}
