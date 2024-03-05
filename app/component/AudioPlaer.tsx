import React from 'react'

interface Item {
   audioPlayer: React.RefObject<HTMLAudioElement>;
   onLoadedMetadata: () => void;
   src: string;
}

const AudioPlaer = (item:Item) => {
  return (
    <div className='w-full'>
      <audio src={item.src} ref={item.audioPlayer} onLoadedMetadata={item.onLoadedMetadata} ></audio>
    </div>
  )
}

export default AudioPlaer
