import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { reducerCases } from '../../utils/Constants';
import { useStateProvider } from '../../utils/StateProvider';

export const AlbumCards = ({ album }) => {
    const [{ }, dispatch] = useStateProvider();

    const clickedCard = (selectedAlbumID, albumURL, albumName) => {
        const screen = "AlbumSongs";
        dispatch({ type: reducerCases.SET_ALBUMID, selectedAlbumID })
        dispatch({ type: reducerCases.SET_SCREEN, screen })
        const selectedAlbumDetails = {
            id: selectedAlbumID,
            image_url: albumURL,
            album_name: albumName
        }
        dispatch({ type: reducerCases.SET_ALBUMDETAILS, selectedAlbumDetails })
    }

    return (
        <Card className='m-2' key={album.id} sx={{ maxWidth: { sx: 260, sm: 260, md: 240 } }} onClick={() => clickedCard(album.id, album.images[0].url, album.name)}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="120"
                    image={album.images[0].url}
                    alt={album.name}
                />
                <CardContent>
                    <Typography className='whitespace-nowrap overflow-hidden' variant='subtitle1' component="div">
                        <b>{album.name}</b>
                    </Typography>
                    <Typography className='whitespace-nowrap overflow-hidden' variant="subtitle2" color="text.secondary">
                        {album.artists.map((x) => (<label key={x.id}>{x.name} </label>))}
                    </Typography>
                    <hr className='my-1' />
                    <Typography className='whitespace-nowrap overflow-hidden' variant="body2" color="text.secondary">
                        <b>Released:</b> {album.release_date}
                    </Typography>
                    <Typography className='whitespace-nowrap overflow-hidden' variant="body2" color="text.secondary">
                        <b>Total Tracks:</b> {album.total_tracks}
                    </Typography>
                    <Typography className='whitespace-nowrap overflow-hidden' variant="body2" color="text.secondary">
                        <b>Type:</b> {album.album_type}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
