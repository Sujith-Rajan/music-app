"use client"
import React, { useEffect, useState } from 'react'
import { FaRepeat } from "react-icons/fa6";
import { FaShuffle } from "react-icons/fa6";

interface Item {
    progressBarRef: any;
    audioPlayer: any;
    musicList: Array<{
        title:string,
        subtitle:string,
        image:string,
        audio:string}>;
    setPlayList: any;
    repeatSong: boolean;
    setCurrentSong: any;
    currentSong: number;
    playAnimationRef: any;
    setRepeatSong: any;
    duration:any;
    setTime:any;
    time: any;
    small?: boolean;
}

const Prograssbar = (item:Item) => {
    

    const handleProgressChange = () => {
        if(item.audioPlayer.current?.currentTime != undefined){
            item.audioPlayer.current.currentTime = item.progressBarRef.current?.value
        }
    }

    const formatTime = (time: any) => {
        if(time && !isNaN(time)){
            const minute = Math.floor(time/60)
            const formatMinute = minute < 10 ? `0${minute}`:`${minute}`
            const second = Math.floor(time % 60)
            const formatSecond = second < 10 ? `0${second}`:`${second}`
            return `${formatMinute}:${formatSecond}`
        }
            return "00:00"
    }

    

     

  return  (
   <div className='mt-1 flex w-full flex-col space-y items-center justify-center gap-4'>
      {item.small && (
        <div className='w-full flex justify-start  text-gray-400'>
            <div onClick={()=> item.setRepeatSong(!item.repeatSong)}>
            <FaRepeat size={20} 
             className='cursor-pointer'/>
            </div>
           
        </div>
      )
    }
    <input 
    id='myinput'
    type='range'
    ref={item.progressBarRef}
    defaultValue="0"
    onChange={handleProgressChange} 
    className='accent-rose-600 w-full reduced-height'/>
    <div className='flex justify-between font-semibold dark:text-white w-full'>
        <span>{formatTime(item.time)}</span>
        <span>{formatTime(item.duration)}</span>
    </div>
    </div>
  )
  
}

export default Prograssbar
