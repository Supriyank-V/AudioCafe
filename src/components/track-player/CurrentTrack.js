import axios from "axios"
import React, { useEffect } from 'react'
import { reducerCases } from "../../utils/Constants";
import { useStateProvider } from '../../utils/StateProvider';

export const CurrentTrack = () => {

    const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
    useEffect(() => {
        const getCurrentTrack = async () => {
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
        }
        getCurrentTrack();
    }, [token, dispatch])

    return (
        <div className="h-full">
            {currentlyPlaying && (
                <div className="flex flex-row justify-start w-full h-full">
                    <div className="w-14">
                        <img src={currentlyPlaying.image}  alt=""/>
                    </div>
                    <div className="flex flex-col text-xs md:text-sm ml-2">
                        <label>{currentlyPlaying.name}</label>
                        <label>{currentlyPlaying.artist.map((artist)=>(<label>{artist}</label>))}</label>
                    </div>
                </div>
            )}
        </div>
    )
}
