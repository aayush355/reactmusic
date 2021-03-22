import React,{useRef,useState,} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay,faAngleLeft, faAngleRight,faPause} from "@fortawesome/free-solid-svg-icons"

const Player = ({currentSong,isPlaying,setIsPlaying,songs,setCurrentSong}) => {
 //ref
 const audioRef=useRef(null);
  //event handler
  const playSongHandler=()=>{
    if (isPlaying){
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    }else{
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  }
  const timeUpdateHandler=(e)=>{
    const current=e.target.currentTime;
    const duration=e.target.duration||0;
    setSongInfo({...songInfo,currentTime:current,duration})
  }
   const getTime=(time)=>{
     return( Math.floor(time/60)+":"+("0"+Math.floor(time%60)).slice(-2)
     );
   }
   const dragHandler=(e)=>{
     audioRef.current.currentTime=e.target.value;
     setSongInfo({...songInfo,currentTime:e.target.value})
   }

   const autoPlayHandler=()=>{
       if (isPlaying) {
      audioRef.current.play();
    }
  }
   const skipTrackHandler = (direction) => {
    let currentIndex = songs.indexOf(currentSong);
    if(direction==="forward"){
      setCurrentSong(songs[currentIndex+1]||songs[0])
    }else{
       setCurrentSong(songs[currentIndex-1]||songs[songs.length-1])
    }
  }

   
  //state
  const [songInfo, setSongInfo] = useState({currentTime:0,
    duration:0});


  return (
    <div className="player">
     <div className="time-control">
       <p>{getTime(songInfo.currentTime)}</p>
          <input min={0}
           onChange={dragHandler}
           max={songInfo.duration||0} 
           value={songInfo.currentTime} 
           type="range"/>
       <p>{getTime(songInfo.duration)}</p>
     </div>
     <div className="play-control">
      <FontAwesomeIcon onClick={()=>skipTrackHandler("back")} className="skip-back" size="2x" icon={faAngleLeft}/>
      <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying?faPause: faPlay}/>
      <FontAwesomeIcon onClick={()=>skipTrackHandler("forward")}className="skip-forward" size="2x" icon={faAngleRight}/>
     </div>
    <audio onEnded={()=>skipTrackHandler("forward")} onLoadedMetadata={timeUpdateHandler}
     onTimeUpdate={timeUpdateHandler} 
     onLoadedData={autoPlayHandler}
     ref={audioRef}
     src={currentSong.audio}>
    </audio>
   </div>
 )
}

export default Player
