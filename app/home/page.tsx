"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Prograssbar from "../component/Prograssbar";
import Controls from "../component/Controls";
import AudioPlaer from "../component/AudioPlaer";
import Title from "../component/Title";
import Favorite from "../component/Favorite";



type Props = {
  songs: Array<{
    title: string;
    subtitle: string;
    image: string;
    audio: string;
  }>;
}

export default function LandingPage({ songs }: Props) {

  const [musicList, setMusicList] = useState<Array<{
    title: string,
    subtitle: string,
    image: string,
    audio: string
  }>>([])

  useEffect(() => {
    if (songs && songs.length > 0) {
      const newMusicList = songs.map((item) => {
        return {
          title: item.title,
          subtitle: item.subtitle,
          image: item.image,
          audio: item.audio,
        };
      });
      setMusicList(newMusicList);
    }
  }, [songs]);

  const [playlist, setPlayList] = useState<Array<{
    title: string,
    subtitle: string,
    image: string,
    audio: string
  }>>(musicList)
  const [currentSong, setCurrentSong] = useState<number>(0)

  useEffect(() => {
    if (musicList.length > 0) {
      setPlayList(musicList);
    }
  }, [musicList]);


  const [open, setOpen] = useState<boolean>(false)
  const [dark, setDark] = useState<boolean>(false)
  const [repeatSong, setRepeatSong] = useState<boolean>(false)
  const [duration, setDuration] = useState<number>()
  const [time, setTime] = useState<number>()
  const [playPause, setPlayPause] = useState<boolean>(false)

  const audioPlayer = useRef<HTMLAudioElement | null>(null)
  const playAnimationRef = useRef<any>()
  const progressBarRef = useRef<any>()


  const repeat = useCallback(() => {
    const currentTimeNow = audioPlayer.current?.currentTime;
    setTime(currentTimeNow)
    if (duration) {
      progressBarRef.current.value = currentTimeNow;
      progressBarRef.current.style.setProperty(
        '--range-progress',
        `${(progressBarRef.current.value / duration) * 100} %`
      )
      if (duration === audioPlayer.current?.currentTime) {
        if (repeatSong) {
          setCurrentSong(currentSong)
        }
        else {
          if (currentSong != musicList.length - 1) {
            setCurrentSong(currentSong + 1)

          }
          else {
            setCurrentSong(0)
          }
        }
      }
    }
    playAnimationRef.current = requestAnimationFrame(repeat)
  }, [audioPlayer, duration, musicList, currentSong, repeatSong])

  useEffect(() => {
    if (audioPlayer.current && playPause === true) {
      audioPlayer.current.play()
    }
    if (audioPlayer.current && playPause === false) {
      audioPlayer.current.pause()
    }
    playAnimationRef.current = requestAnimationFrame(repeat)
  }, [playPause, audioPlayer, repeat])

  const isPlayMusic = () => {
    setPlayPause(!playPause)
  }

  const onLoadedMetadata = () => {
    const seconds = audioPlayer.current?.duration;
    setDuration(seconds)
    progressBarRef.current.max = seconds
  }



  return (
    <div className="h-screen w-full flex items-center justify-center relative">
      <Image src={playlist[currentSong]?.image} alt="background image" fill objectFit="cover"
        className=" blur-md" ></Image> 
       
    
      <Title open={open}
        setOpen={setOpen}
        playlist={playlist}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        playPause={playPause} />

      

      <div className="w-full h-2/3  lg:w-1/2 lg:h-2/3 shadow-black 
              border-b-8 border-r-4 border
        border-gray-500 border-opacity-50 rounded-2xl 
        absolute  top-auto bottom-auto  flex justify-center">

       <div className="absolute top-8 right-1/3">
       <Favorite playlist={playlist[currentSong]}/>
       </div>
       
        <div className="flex flex-col gap-4 items-center">
       
            <div className="md:w-40 md:h-40 w-24 h-24 relative mt-8 vibrate-image">
              <Image src={playlist[currentSong]?.image} alt="player image" fill objectFit="cover"
                className="rounded-full scale-105 " loading="lazy" ></Image>
            </div>
            
           

          <div className="flex flex-col items-center">
            <span className="text-lg font-bold">{playlist[currentSong]?.title}</span>
            <span className="font-bold">{playlist[currentSong]?.subtitle}</span>
          </div>

          <div className="w-full">

            <AudioPlaer audioPlayer={audioPlayer}
              src={playlist[currentSong]?.audio}
              onLoadedMetadata={onLoadedMetadata} />

            <Prograssbar
              progressBarRef={progressBarRef}
              audioPlayer={audioPlayer}
              musicList={musicList}
              setPlayList={setPlayList}
              repeatSong={repeatSong}
              setCurrentSong={setCurrentSong}
              currentSong={currentSong}
              playAnimationRef={playAnimationRef}
              setRepeatSong={setRepeatSong}
              duration={duration}
              setTime={setTime}
              time={time}
              small
            />

            <Controls
              playPause={playPause}
              isPlayMusic={isPlayMusic}
              audioPlayer={audioPlayer}
              currentSong={currentSong}
              setCurrentSong={setCurrentSong}
              musicList={musicList}
            />
          </div>
        </div>


        {
          open ?
            (
              <div className="fixed inset-x-0 bottom-0 h-24 flex flex-col items-center rounded-t-[50px] border-x
      border-t border-white bg-white bg-opacity-30 pb-5 backdrop-blur-sm  dark:bg-black 
      dark:border-none dark:bg-opacity-80 ">
                <div className="mt-4 h-[5px] w-1/2 rounded-full bg-black bg-opacity-50 backdrop-blur-sm
        dark:bg-white dark:bg-opacity-70">
                  <div className="mt-2 mb-4 flex w-full items-center justify-between px-12 ">
                    <div className="flex flex-col items-start dark:text-white ">
                      <span className="text-lg font-bold">{playlist[currentSong]?.title}</span>
                      <span className="font-bold">{playlist[currentSong]?.subtitle}</span>
                    </div>
                    <div className="w-16 h-16 relative">
                      <Image src={playlist[currentSong]?.image} alt="player image" fill objectFit="cover"
                        className="rounded-full scale-105" loading="lazy" />
                    </div>
                  </div>
                </div>
              </div>
            )
            :
            (<div></div>)
        }

      </div>
      </div>
      
  );
}




