import Image from 'next/image';
import React from 'react'
import Favorite from './Favorite';

interface Item {
    playlist: Array<{title:string,subtitle:string,image:string,audio:string}>;
    setCurrentSong: any;
    currentSong: number;
}

const MusicList = (item: Item) => {
  return (
    <div className='mt-3 flex flex-col space-y-6 overflow-y-scroll px-12 w-1/2'>
      {item.playlist.map((song,index)=>(
        <div key={song.title}
        className='flex items-center space-x-4 flex-col sm:flex-row justify-start relative'
        onClick={()=> item.setCurrentSong(index)}
        >
            <div className='w-20 h-20 relative '>
            <Image src={song.image} alt="album image" fill objectFit='cover' className='rounded-lg'
            loading='lazy'/>
            </div>
            <div className='flex flex-col text-left text-white '>
                <span className='font-bold'>{song.title}</span>
                <span>{song.subtitle}</span>
            </div>
            <div className='absolute top-0 right-0'>
              <Favorite playlist={song}/>
            </div>
        </div>
      ))}
    </div>
  )
}

export default MusicList
