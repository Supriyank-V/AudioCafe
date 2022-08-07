import axios from 'axios';
import React, { useEffect } from 'react'
import { reducerCases } from '../../utils/Constants';
import { useStateProvider } from '../../utils/StateProvider'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, Grid } from '@mui/material';

export const CategoriesPage = () => {
    const [{token, categories}, dispatch] = useStateProvider();
    useEffect(() => {
        const getCategories = async () => {
          const response = await axios.get(
            `https://api.spotify.com/v1/browse/categories`,
            {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
              }
            })
            const categories = response.data
            const listCategories = categories.categories.items
            dispatch({type:reducerCases.SET_CATEGORIES, listCategories})
        }
        getCategories();
    },[token, dispatch])

    const clickedCard = (selectedId) =>{
        const screen = "PlaylistsDetails";
        dispatch({type:reducerCases.SET_SELECTEDID, selectedId })
        dispatch({type:reducerCases.SET_SCREEN, screen})
    }
    
  return (
    <div className='flex flex-col w-full overflow-auto items-center'>
        <label className='text-3xl my-4'>ALL CATEGORIES</label>
            <Grid
                container
                columns={{ xs: 4, md: 12 }}
                justifyContent="center" 
            >
                {categories?.map((item) => {
                    return (
                        <Card className='m-2' key={item.id} sx={{ maxWidth: { sx: 260, sm: 260, md: 240 } }} onClick={() => clickedCard(item.id)}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="120"
                                    image={item.icons[0].url}
                                    alt={item.name}
                                />
                                <CardContent>
                                    <Typography className='whitespace-nowrap overflow-hidden' variant='subtitle1' component="div">
                                        <b>{item.name}</b>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>)
                    })}
                </Grid>
            </div>
  )
}
