import axios from 'axios';
import React, { useEffect } from 'react'
import { reducerCases } from '../../utils/Constants';
import { useStateProvider } from '../../utils/StateProvider'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';

export const MyPlaylistsPage = () => {

    const [{ token, playlists }, dispatch] = useStateProvider();

    useEffect(() => {
        const getPlaylistData = async () => {
            try {
                const response = await axios.get(
                    "https://api.spotify.com/v1/me/playlists",
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                            "Content-Type": "application/json",
                        }
                    });
                const { items } = response.data
                const playlists = items

                dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
            }
            catch (err) {
                console.log(err)
            }
        }
        getPlaylistData();
    }, [token, dispatch])

    const clickedCard = (selectedPlaylistId) =>{
        const screen = "PlaylistTracksPage";
        dispatch({type:reducerCases.SET_PLAYLISTID, selectedPlaylistId })
        dispatch({type:reducerCases.SET_SCREEN, screen})
    }

    return (
        <div className='flex flex-col w-full overflow-auto items-center'>
            <label className='text-3xl my-4'>MY PLAYLISTS</label>
            <Grid
                container
                columns={{ xs: 4, md: 12 }}
                justifyContent="center"
            >
                {playlists?.map((item) => {
                    return (
                        <Card className='m-2' key={item.id} sx={{ maxWidth: { sx: 260, sm: 260, md: 240 } }} onClick={() => clickedCard(item.id)}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="120"
                                    image={item.images[0].url}
                                    alt={item.name}
                                />
                                <CardContent>
                                    <Typography className='whitespace-nowrap overflow-hidden' variant='subtitle1' component="div">
                                        <b>{item.name}</b>
                                    </Typography>
                                    <Typography className='whitespace-nowrap overflow-hidden' variant="subtitle2" color="text.secondary">
                                        {item.owner.display_name}
                                    </Typography>
                                    <hr className='my-1' />
                                    <Typography className='whitespace-nowrap overflow-hidden' variant="body2" color="text.secondary">
                                        <b>Total Tracks:</b> {item.tracks.total}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>)
                    })}
                </Grid>
            </div>
        )
    }
