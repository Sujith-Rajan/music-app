import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface PlayList {
    title: string;
    subtitle: string;
    image: string;
    audio: string
}

export interface PlayListArray {
    playlist: PlayList[]
}


const initialState: PlayListArray = {
    playlist:[],
}

export const favoriteSlice = createSlice({
    name: 'favorite',
    
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<PlayList>) => {
            const existingItem = state.playlist.find((item)=>item.title === action.payload.title)
            if(!existingItem){
                state.playlist.push(action.payload)
            }
           
        },
        removeFavorite:(state, action: PayloadAction<PlayList>) => {
            const removeItem = state.playlist.findIndex((item)=>item.title === action.payload.title)
            if(removeItem !== -1){
                state.playlist.splice(removeItem,1)
            }
            
        }
    }
})

export const { addFavorite,removeFavorite } = favoriteSlice.actions
export default favoriteSlice.reducer