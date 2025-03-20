import Head from "next/head"

export const FanPlayList = ({ animeData }) => {
  return (
    <div className="w-full px-5 md:px-0">
      <Head>
        <meta name="referrer" content="no-referrer" />
      </Head>
      <div className="flex w-full flex-col gap-3">
        {animeData.map((anime, index) => (
          <div className="flex gap-4 border-b py-8" key={index}>
            <img
              className="rounded-lg object-cover max-[560px]:h-[146px] max-[560px]:w-[110px] min-[560px]:h-[205px] min-[560px]:w-[154px]"
              src={anime.cover}
              alt={anime.title}
            />
            <div className="flex flex-1 flex-col">
              <div className="mb-4">
                <a
                  href={anime.epUrl}
                  target="_blank"
                  className="border-b-2 border-dotted border-[#425aef] px-1 text-xl font-bold transition-all duration-500 hover:rounded-lg hover:bg-[#425aef] hover:text-white">
                  {anime.title}
                </a>
              </div>
              <div className="flex items-center divide-x divide-[#f2b94b]">
                <div className="flex flex-col items-center text-xs max-[560px]:w-[49%] min-[560px]:w-[32%] min-[600px]:w-[24%] min-[640px]:w-[19%] min-[680px]:w-[15%] md:w-[13%]">
                  <div className="mt-1 font-bold text-[#f2b94b]">
                    {anime.epNum}
                  </div>
                </div>
                <div className="flex flex-col items-center text-xs max-[560px]:w-[49%] min-[560px]:w-[32%] min-[600px]:w-[24%] min-[640px]:w-[19%] min-[680px]:w-[15%] md:w-[13%]">
                  <div className="font-medium text-[#f2b94b]">
                    {anime.areas_name}
                  </div>
                  <div className="mt-1 font-bold text-[#f2b94b]">
                    {anime.season_type_name}
                  </div>
                </div>
                <div className="hidden flex-col items-center text-xs min-[600px]:flex min-[600px]:w-[24%] min-[640px]:w-[19%] min-[680px]:w-[15%] md:w-[13%]">
                  <div className="font-medium text-[#f2b94b]">总播放</div>
                  <div className="mt-1 font-bold text-[#f2b94b]">
                    {anime.play_count}万
                  </div>
                </div>
                <div className="hidden flex-col items-center text-xs min-[640px]:flex min-[640px]:w-[19%] min-[680px]:w-[15%] md:w-[13%]">
                  <div className="font-medium text-[#f2b94b]">追番人数</div>
                  <div className="mt-1 font-bold text-[#f2b94b]">
                    {anime.follow_count}万
                  </div>
                </div>
                <div className="hidden flex-col items-center text-xs min-[680px]:flex min-[680px]:w-[15%] md:w-[13%]">
                  <div className="font-medium text-[#f2b94b]">硬币数</div>
                  <div className="mt-1 font-bold text-[#f2b94b]">
                    {anime.coin_count}万
                  </div>
                </div>
                <div className="hidden flex-col items-center text-xs md:flex md:w-[13%]">
                  <div className="font-medium text-[#f2b94b]">弹幕总数</div>
                  <div className="mt-1 font-bold text-[#f2b94b]">
                    {anime.danmaku_count}万
                  </div>
                </div>
                <div className="hidden flex-col items-center text-xs min-[560px]:flex min-[560px]:w-[32%] min-[600px]:w-[24%] min-[640px]:w-[19%] min-[680px]:w-[15%] md:w-[13%]">
                  <div className="font-medium text-[#f2b94b]">评分</div>
                  <div className="mt-1 font-bold text-[#f2b94b]">
                    {anime.score}
                  </div>
                </div>
              </div>
              <div className="mt-4 line-clamp-3 font-medium leading-6 text-gray-600">
                {anime.summary}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
