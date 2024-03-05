import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/favoriteSlice';
import { RootState } from '../redux/store';

interface Item {
    playlist:{title:string,subtitle:string,image:string,audio:string};
}

const Favorite = (item:Item) => {
    const dispatch = useDispatch()
    const {playlist} = useSelector((state:RootState) => state.favorite)
    const existngItem = playlist.find((reduxItem) => reduxItem.title === item.playlist?.title)
    const addFavoriteList = () => {
        
         dispatch(addFavorite(item.playlist))
    }

    const removeFovoriteList = () => {
        dispatch(removeFavorite(item.playlist))
    }

  return (
    <div>
        {
        !existngItem 
        ?
        <span className=" text-white" onClick={addFavoriteList}><FaHeart size={20}/></span>
        :
        <span className=" text-yellow-500" onClick={removeFovoriteList}><FaHeart size={20}/></span>
         }
    </div>
  )
}

export default Favorite
