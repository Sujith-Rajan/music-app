import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { FaHeart } from "react-icons/fa";
import MusicList from './MusicList';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Playing from './Playing';
import FavoriteModal from '../modal/FavoriteModal';

interface Item {
    playlist: Array<{
        title:string,
        subtitle:string,
        image:string;
        audio:string;
    }>;
    open: any;
    setOpen:any;
    currentSong: any;
    setCurrentSong: any;
    playPause: boolean;
}

const Title = (item:Item) => {

    const {playlist} = useSelector((state:RootState) => state.favorite)
    const[openModal,setOpenModal] = useState(false)

  return (
    <div className='w-full'>

       <motion.div
        transition={{ duration: 0.3 }}
        animate={item.open ? { height: 640 } : { height: 100 }}
        initial={{ height: 100 }}
        className="fixed inset-x-0 top-0 flex flex-col items-center
           rounded-b-[50px] border-x border-b border-white bg-white opacity-80
            pb-8 backdrop-blur-sm dark:bg-black dark:border-none dark:bg-opacity-80 z-50"
      >
        <div className="flex w-full items-center justify-evenly px-7">
          <div className="flex h-14 items-center justify-center rounded-full 
               m-4 cursor-pointer">

            <Playing playPause={item.playPause}/>

          </div>
          <div className="mt-4 flex flex-col items-center dark:text-white">
            <span className="text-shadow text-xl font-medium truncate">{item.playlist[item.currentSong]?.title}</span>
            <span className="text-base font-medium opacity-70 truncate">{item.playlist[item.currentSong]?.subtitle}</span>
          </div>

          <div className="flex  items-center 
                  justify-center 
                 m-4 cursor-pointer bg-gray-400 p-2 rounded-full 
                 bg-opacity-25 relative" onClick={()=>setOpenModal(true)}>
           <FaHeart size={20} className='text-red-600' title="My Favorite"/>
           {playlist.length > 0 && 
            <span className='absolute -top-2 -right-2 text-white'>{playlist.length}</span> 
           }
          </div>
           
          

        </div>
        {item.open &&
          (
            <MusicList playlist={item.playlist} currentSong={item.currentSong} setCurrentSong={item.setCurrentSong} />
          )
        }
        <div className="absolute bottom-0" onClick={() => item.setOpen(!item.open)}>
          {
            item.open
              ?
              <FaChevronUp size={20} className="text-white" />
              :
              <FaChevronDown size={20} className="text-white" />
          }


        </div>
      </motion.div>
      {openModal && <FavoriteModal setOpenModal={() => setOpenModal(false)}/>}
    </div>
  )
}

export default Title
