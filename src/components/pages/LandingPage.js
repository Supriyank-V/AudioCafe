import axios from 'axios';
import React, { useEffect } from 'react'
import { reducerCases } from '../../utils/Constants';
import { useStateProvider } from '../../utils/StateProvider'
import { Grid } from '@mui/material';
import { AlbumCards } from '../cards/AlbumCards';

export const LandingPage = () => {
    const [{ token, newAlbums }, dispatch] = useStateProvider();
    useEffect(() => {
        const getNewAlbums = async () => {
            const response = await axios.get(
                `https://api.spotify.com/v1/browse/new-releases`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json"
                    }
                })
            const newAlbums = response.data
            const listNewAlbums = newAlbums.albums.items
            dispatch({ type: reducerCases.SET_NEWALBUMS, listNewAlbums })
        }
        getNewAlbums();
    }, [token, dispatch])

    return (
        <div className='flex flex-col w-full overflow-auto items-center'>
            <label className='text-3xl my-4'>NEW RELEASES</label>
            <Grid
                container
                columns={{ xs: 4, md: 12 }}
                justifyContent="center"
            >
                {newAlbums?.map((item) => {
                    return (
                        <AlbumCards key={item.id} album={item}/>)
                })}
            </Grid>
        </div>
    )
}
