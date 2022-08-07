import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { reducerCases } from '../../utils/Constants';
import { useStateProvider } from '../../utils/StateProvider';

export const TrackCards = ({ track, image }) => {

    const[{}, dispatch] = useStateProvider();
    
    const msToMinutes = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    }

    const currentTrack = (id, image, name, artists) => {
        const currentlyPlaying = {
            id: id,
            name: name,
            artist: artists.map((artist) => artist.name ? artist.name : artist),
            image: image,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying })
    }
    return (
        <Card className='m-2' key={track.id} sx={{ maxWidth: { sx: 260, sm: 260, md: 240 } }} onClick={() => currentTrack(track.id, image, track.name, track.artists)} >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="120"
                    image={image}
                    alt={track.name}
                />
                <CardContent>
                    <Typography className='whitespace-nowrap overflow-hidden' variant='subtitle1' component="div">
                        <b>{track.name}</b>
                    </Typography>
                    <Typography className='whitespace-nowrap overflow-hidden' variant="subtitle2" color="text.secondary">
                        {track.artists.map((x, index) => (<label key={index}>{x.name ? x.name : x} </label>))}
                    </Typography>
                    <hr className='my-1' />
                    <Typography className='whitespace-nowrap overflow-hidden' variant="body2" color="text.secondary">
                        <b>Album:</b> {track.album.name ? track.album.name : track.album}
                    </Typography>
                    <Typography className='whitespace-nowrap overflow-hidden' variant="body2" color="text.secondary">
                        <b>Track Number:</b> {track.track_number}
                    </Typography>
                    <Typography className='whitespace-nowrap overflow-hidden' variant="body2" color="text.secondary">
                        <b>Duration:</b> {msToMinutes(track.duration_ms ? track.duration_ms  : track.duration)}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
