import Head from "next/head"

export const FanPlayList = ({ animeData }) => {
  return (
    <div className="w-full">
      <Head>
        <meta name="referrer" content="no-referrer" />
      </Head>
      <ul className="m-0 flex w-full list-none flex-wrap justify-between gap-[10px] p-[10px]">
        {animeData.map((anime, index) => (
          <li className="min-w-[350px] flex-[1] basis-0" key={index}>
            {/*// 为每个番剧创建一个链接*/}
            <a
              className="flex items-start overflow-hidden rounded-[15px] bg-[#f7f7f7] p-0"
              href={anime.epUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`${anime.title}\n第${anime.epStart}话-${anime.epTitle}`}>
              <img
                className="h-[120px] w-[200px] shrink-0 object-cover"
                src={anime.epCover}
                alt={`Cover for ${anime.title}`}
              />
              <div className="flex flex-[1_0_0] flex-col items-start justify-between self-stretch p-[15px]">
                <p className="line-clamp-2 self-stretch font-['Noto_Sans_SC','sans-serif'] text-[14px] font-[500] leading-[120%] text-black">
                  {anime.title}
                </p>
                <div className="flex flex-col gap-[5px] self-stretch font-['Noto_Sans_SC','sans-serif'] text-[12px] font-normal leading-[100%] text-[#383838]">
                  {/*// 看完的和没看完的显示不同的内容*/}
                  {anime.epStart < anime.epEnd ? (
                    <p className="line-clamp-1">
                      {anime.epNum}/
                      <span className="font-[800] text-[#ff7200]">
                        看到{anime.epStart}话{anime.epTime}
                      </span>
                    </p>
                  ) : (
                    <p className="line-clamp-1">已看完全部{anime.epStart}话</p>
                  )}
                  {/*鼠标指针滑过的时候显示完整的标题*/}
                  <p className="line-clamp-1">{anime.epTitle}</p>
                  {/* 添加进度条 */}
                  <div className="relative mt-[5px] h-[5px] w-full overflow-hidden rounded-[5px] bg-white">
                    <div
                      className="h-full bg-[#ff7200]"
                      style={{
                        width: `${(anime.epStart / anime.epEnd) * 100}%`
                      }}></div>
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
