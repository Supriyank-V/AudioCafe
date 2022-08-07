import axios from "axios"
import React from 'react'
import { reducerCases } from "../../utils/Constants";
import { BsFillPlayFill,BsPause,BsShuffle,BsArrowRepeat} from 'react-icons/bs'
import { BiSkipPrevious,BiSkipNext} from 'react-icons/bi'
import { useStateProvider } from '../../utils/StateProvider'

export const PlayerControls = () => {
  const [{token, playstate}, dispatch] = useStateProvider();
  
  const changeTrack = async (type) =>{
    try { await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
          headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json"
          }
      })
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            }
        })
        if(response.data !== "") {
            const {item} = response.data;
            const currentlyPlaying = {
                id: item.id,
                name: item.name,
                artist : item.artists.map((artist) => artist.name),
                image: item.album.images[0].url,
            };
            dispatch({type:reducerCases.SET_PLAYING,currentlyPlaying})
        }
      else {
        dispatch({type:reducerCases.SET_PLAYING,currentlyPlaying:null})
      }
    }
    catch (err) {
      alert("Requires a Premium Account")
    }
  }

  const changeState = async () => {
    const state = playstate ? "pause" : "play"
    
    dispatch({type:reducerCases.SET_PLAYSTATE , playstate : !playstate })
    
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`, {},
      {
          headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json"
          }
      }).catch((err) =>{
        if(err.message.includes("403"))
        {
          alert("Requires a Premium Account")
        }
      })
  }
  return (
    <div className='flex flex-row text-3xl md:text-4xl'>
      <div className='cursor-pointer hidden md:block md:pr-4 hover:text-slate-300'><BsShuffle/></div>
      <div onClick={() => changeTrack("previous")} className='cursor-pointer hover:text-slate-300'><BiSkipPrevious/></div>
      <div onClick={() => changeState()} className='cursor-pointer hover:text-slate-300'>{playstate ? <BsPause/> :<BsFillPlayFill/>}</div>
      <div onClick={() => changeTrack("next")} className='cursor-pointer hover:text-slate-300'><BiSkipNext/></div>
      <div className='cursor-pointer hidden md:block md:pl-4 hover:text-slate-300'><BsArrowRepeat/></div>
    </div>
  )
}
