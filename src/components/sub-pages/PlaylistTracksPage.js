import axios from 'axios';
import React, { useEffect} from 'react'
import { reducerCases } from '../../utils/Constants';
import { useStateProvider } from '../../utils/StateProvider'
import { Grid } from '@mui/material';
import { TrackCards } from '../cards/TrackCards';

export const PlaylistTracksPage = () => {
  const [{ token, selectedPlaylistId, selectedMusicList}, dispatch] = useStateProvider();
  
  useEffect(() => {
    const getInitialPlayList = async () => {
      let url = '';
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json"
            }
          })
        const selectedMusicList = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a") ? "" : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[0].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number
        }))
      }
      dispatch({ type: reducerCases.SET_SONGSLIST, selectedMusicList })
    }
    getInitialPlayList();
  }, [token, dispatch, selectedPlaylistId])

  return (
    <div className='w-full h-full overflow-auto m-2'>
      {selectedMusicList? (
          <>
            <div className='flex flex-row justify-start items-center'>
              <div className='ml-12 w-[40%] md:mr-10 md:w-[20%] m-2'>
                <img className='rounded-lg' src={selectedMusicList.image} alt="" />
              </div>
              <div className='flex flex-col'>
                <label className='text-4xl'>{selectedMusicList.name}</label>
                <label>{selectedMusicList.description}</label>
                <label>No. Of Songs: {selectedMusicList?.tracks?.length}</label>
              </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <div className='w-[90%] md:w-full'>
                <Grid 
                  container 
                  columns={{ xs: 4, md: 12 }}
                  justifyContent="center"
                  >
                  {selectedMusicList?.tracks?.map((song) => {
                    return (
                      <TrackCards key={song.id} track={song} image={song.image}/>)
                  })}
                </Grid>
              </div>
            </div>
          </>
        )
      :<></>}
    </div>
  )
}