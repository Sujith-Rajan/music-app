import React from 'react'
import { FaPlayCircle } from "react-icons/fa";

interface Item {
    playPause: boolean;
}

const Playing = ({playPause}: Item) => {
    
  return (
    <div className='relative'>
    <div className={`w-12 h-12 border-white border-4
     border-t-red-500 border-opacity-45  rounded-full
     ${playPause ? 'animate-spin' : 'animate-none'}`} style={{ animationDuration: '2s' }}>
        
    </div>
    <div className='absolute top-3 left-3'>
    <FaPlayCircle size={25} className='text-white'/>
    </div>
    </div>
  )
}

export default Playing