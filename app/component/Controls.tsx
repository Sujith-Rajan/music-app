import { useRef } from "react"
import { TbRewindBackward10,TbRewindForward10} from "react-icons/tb";
import { MdSkipNext ,MdSkipPrevious} from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";



interface Item {
    playPause: boolean;
    isPlayMusic: any;
    audioPlayer: any;
    currentSong: any;
    setCurrentSong: any;
    musicList: Array<{
        title:string,
        subtitle:string,
        image:string;
        audio:string;
    }>
}

const Controls = (item: Item) => {
    const handleTime = (direct:string)=>{
        if(item.audioPlayer?.current.currentTime != undefined){
            if(direct === 'back'){
                item.audioPlayer.current.currentTime = item.audioPlayer.current.currentTime - 10;

            }
           else{
                item.audioPlayer.current.currentTime = item.audioPlayer.current.currentTime + 10;
            }
        }
    }

    const handleMusic = (direct:string) => {
        if(direct === 'next'){
            if(item.currentSong != item.musicList.length - 1){
                item.setCurrentSong(item.currentSong + 1)
            }else{
                item.currentSong(0)
            }
        }
        else if(direct ==="back"){
            if(item.currentSong != 0){
                item.setCurrentSong(item.currentSong - 1)
            }
            else{
                item.setCurrentSong(item.musicList.length - 1)
            }
        }
    }

  return (
    <div className="mt-3 flex w-full items-center justify-between text-neutral-900">
        <div onClick={()=>handleTime("back")} >
        <TbRewindBackward10 size={20} />
        </div>
        <div onClick={()=>handleMusic("next")}>
        <MdSkipNext size={25}/>
        </div>
        <div>
        {item.playPause ?
         (
         <div onClick={item.isPlayMusic} className="border border-opacity-20 border-white p-2 rounded-full">
         <FaPause size={20}/>
         </div>
         ) 
         : 
         (
            <div  onClick={item.isPlayMusic} className="border border-opacity-20 border-black p-2 rounded-full">
         <FaPlay size={20} />
         </div>
         )
         }
         </div>
          <div onClick={()=>handleMusic("back")}>
        <MdSkipPrevious size={25}/>
        </div>
        <div onClick={()=>handleTime("next")} >
        <TbRewindForward10 size={20} />
        </div>
    </div>
  )
}

export default Controls
