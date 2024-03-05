import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import Image from 'next/image'
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { removeFavorite } from '../redux/favoriteSlice';


interface Song{
    title: string;
    subtitle: string;
    image: string;
    audio: string
}

interface Modal {
    setOpenModal: ()=> void;
}

const FavoriteModal = ({setOpenModal}: Modal) => {
    const {playlist} = useSelector((state:RootState) => state.favorite)

    const dispatch = useDispatch()

    const removeFromFovorite = (song:Song) => {
        dispatch(removeFavorite(song))
    }
 
    if(playlist.length === 0){
        setOpenModal()
    }

  return (
    <div className='w-1/3 z-50 p-8   bg-white backdrop-blur-sm bg-opacity-45
    absolute top-5 right-10 rounded-xl flex flex-col gap-2 overflow-hidden'>
        {playlist.map((song,index)=> (
            <div key={index} className='flex justify-between'>
                <div className='flex gap-2'>
        <div className='w-12 h-12 rounded-md relative'>
            <Image src={song.image} alt='song image' fill objectFit='contain'></Image>
        </div>
        <div className='flex flex-col gap-1'>
        <span className='font-bold truncate'>{song.title}</span>
        <span className=''>{song.subtitle}</span>
        </div>
        </div>
        <IoCloseCircleOutline onClick={()=>removeFromFovorite(song)}/>

        </div>
        ))}
        <IoIosCloseCircle className='absolute top-0 left-1' size={25} onClick={()=>setOpenModal()}/>

    </div>
  )
}

export default FavoriteModal