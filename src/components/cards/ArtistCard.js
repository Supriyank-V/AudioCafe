import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea} from '@mui/material';

export const ArtistCard = ({artist}) => {

  return (
    <Card className='m-2' key={artist.id} sx={{ maxWidth: { sx: 260, sm: 260, md: 240 } }} >
    <CardActionArea>
        <CardMedia
            component="img"
            height="120px"
            image={artist.images[0]?.url}
            alt={artist.name}
        />
        <CardContent>
            <Typography className='whitespace-nowrap overflow-hidden' variant='subtitle1' component="div">
                <b>{artist.name}</b>
            </Typography>
            <Typography className='whitespace-nowrap overflow-hidden' variant="subtitle2" color="text.secondary">
                {artist.genres.map((x) => (<label key={x}>{x} </label>))}
            </Typography>
            <hr className='my-1' />
            <Typography className='whitespace-nowrap overflow-hidden' variant="body2" color="text.secondary">
                <b>Followers:</b> {artist.followers.total}
            </Typography>
            <Typography className='whitespace-nowrap overflow-hidden' variant="body2" color="text.secondary">
                <b>Popularity:</b> {artist.popularity}
            </Typography>
            <Typography className='whitespace-nowrap overflow-hidden' variant="body2" color="text.secondary">
                <b>Type:</b> {artist.type}
            </Typography>
        </CardContent>
    </CardActionArea>
</Card>
  )
}
