import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea} from '@mui/material';
import { reducerCases } from '../../utils/Constants';
import { useStateProvider } from '../../utils/StateProvider';

export const PlayListCards = ({playlist}) => {
    
    const [{},dispatch] = useStateProvider();

    const clickedCard = (selectedPlaylistId) =>{
        const screen = "PlaylistTracksPage";
        dispatch({type:reducerCases.SET_PLAYLISTID, selectedPlaylistId })
        dispatch({type:reducerCases.SET_SCREEN, screen})
    }

  return (
    <Card className='m-2' key={playlist.id} sx={{ maxWidth: { sx: 260, sm: 260, md: 240 } }} onClick={() => clickedCard(playlist.id)}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="120"
                  image={playlist.images[0].url}
                  alt={playlist.name}
                />
                <CardContent>
                  <Typography className='whitespace-nowrap overflow-hidden' variant='subtitle1' component="div">
                    <b>{playlist.name}</b>
                  </Typography>
                  <Typography className='whitespace-nowrap overflow-hidden' variant="subtitle2" color="text.secondary">
                    {playlist.owner.display_name}
                  </Typography>
                  <hr className='my-1' />
                  <Typography className='whitespace-nowrap overflow-hidden' variant="body2" color="text.secondary">
                    <b>Total Tracks:</b> {playlist.tracks.total}
                  </Typography>
                  <hr/>
                  <Typography variant="body2" color="text.secondary">
                    {playlist.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
  )
}
