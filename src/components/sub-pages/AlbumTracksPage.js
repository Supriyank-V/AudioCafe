import axios from 'axios';
import React, { useEffect } from 'react'
import { reducerCases } from '../../utils/Constants';
import { useStateProvider } from '../../utils/StateProvider'
import { Grid } from '@mui/material';
import {AlbumTrackCards} from '../cards/AlbumTracksCards'

export const AlbumTracksPage = () => {
    const [{ token, albumId, selectedAlbumTracks, selectedAlbumDetails }, dispatch] = useStateProvider();

    useEffect(() => {
        const getAlbumTrackList = async () => {
            const response = await axios.get(
                `https://api.spotify.com/v1/albums/${albumId}/tracks`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json"
                    }
                })

            const selectedAlbumTracks = {
                tracks: response.data.items.map((track) => ({
                    id: track.id,
                    name: track.name,
                    artists: track.artists.map((artist) => artist.name),
                    duration: track.duration_ms,
                    context_uri: track.uri,
                    track_number: track.track_number
                }))
            }
            dispatch({ type: reducerCases.SET_ALBUMTRACKS, selectedAlbumTracks })
        }
        getAlbumTrackList();
    }, [token, dispatch, albumId])

    return (
        <div className='flex flex-col overflow-auto items-center'>
            <label className='text-3xl py-2'>{selectedAlbumDetails.album_name} Tracks</label>
            <Grid
                container
                columns={{ xs: 4, md: 12 }}
                justifyContent="center"
            >
                {selectedAlbumTracks?.tracks?.map((song) => {
                    return (
                        <AlbumTrackCards key={song.id} track={song} trackDetails={selectedAlbumDetails} />)
                })}
            </Grid>

        </div>
    )
}
