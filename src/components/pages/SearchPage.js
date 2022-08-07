import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useStateProvider } from '../../utils/StateProvider'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { reducerCases } from '../../utils/Constants';
import { Grid } from '@mui/material';
import { TrackCards } from '../cards/TrackCards';
import { AlbumCards } from '../cards/AlbumCards';
import { ArtistCard } from '../cards/ArtistCard';

export const SearchPage = () => {
    const [{ token, trackList, artistList, albumList }, dispatch] = useStateProvider();
    const [search, setSearch] = useState();
    const [type, setType] = useState();

    useEffect(() => {
        if (type !== undefined && search !== undefined) {
            if (search.length > 0 && type.length > 0) {
                const searchItem = async () => {
                    const response = await axios.get(
                        `https://api.spotify.com/v1/search?q=${search}&type=${type}`, {
                        headers: {
                            Authorization: "Bearer " + token,
                            "Content-Type": "application/json"
                        }
                    }).then(res => res.data)
                    if (type === "artist") {
                        const artistList = response.artists.items;
                        dispatch({ type: reducerCases.SET_ARTISTLIST, artistList })
                    }
                    else if (type === "album") {
                        const albumList = response.albums.items;
                        dispatch({ type: reducerCases.SET_ALBUMLIST, albumList })
                    }
                    else if (type === "track") {
                        const trackList = response.tracks.items;
                        dispatch({ type: reducerCases.SET_TRACKLIST, trackList })
                    }
                    else { }
                }
                searchItem();
            }
        }
    }, [token, search, type])

    return (
        <div className='w-full h-full flex flex-col'>
            <div className='w-full flex flex-col justify-center items-center'>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel value="track" onClick={e => setType(e.target.value)} control={<Radio />} label="Tracks" />
                    <FormControlLabel value="album" onClick={e => setType(e.target.value)} control={<Radio />} label="Albums" />
                    <FormControlLabel value="artist" onClick={e => setType(e.target.value)} control={<Radio />} label="Artists" />
                </RadioGroup>
                <input
                    placeholder='Search For Tracks / Albums / Artists'
                    className='py-2 px-6 mt-2 text-black rounded-full w-[70%]'
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <div className='flex flex-col justify-center items-center w-full h-[70%] overflow-auto mt-4'>
                <div className='w-[90%] h-full md:w-full'>
                    <Grid
                        container
                        columns={{ xs: 4, md: 12 }}
                        justifyContent="center"
                        className='transition-all duration-500 ease-in-out'
                    >
                        {
                            type === "track" ? <>
                                {trackList.map((track) => {
                                    return (
                                        <TrackCards key={track.id} track={track} image={track.album.images[0].url} />
                                    )
                                })
                                }</> :
                                type === "album" ? <>
                                    {albumList.map((album) => {
                                        return (
                                            <AlbumCards key={album.id} album={album} />
                                        )
                                    })
                                    }</>
                                    : type === "artist" ? <>
                                        {artistList.map((artist) => {
                                            return (
                                                <ArtistCard key={artist.id} artist={artist} />
                                            )
                                        })
                                        }</>
                                        : <></>
                        }
                    </Grid>
                </div>
            </div>
        </div>
    )
}
