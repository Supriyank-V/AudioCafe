import axios from 'axios';
import React, { useEffect } from 'react'
import { reducerCases } from '../../utils/Constants';
import { useStateProvider } from '../../utils/StateProvider'
import { Grid } from '@mui/material';
import { PlayListCards } from '../cards/PlayListsCard';

export const FeaturedPage = () => {
  
  const [{ token, featured }, dispatch] = useStateProvider();

  useEffect(() => {
    const getFeatured = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/browse/featured-playlists`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
          }
        })
      const featured = response.data
      const listFeatured = featured.playlists.items
      dispatch({ type: reducerCases.SET_FEATURED, listFeatured })
    }
    getFeatured();
  }, [token, dispatch])

  return (
    <div className='flex flex-col w-full items-center overflow-auto'>
      <label className='text-3xl my-4'>TOP FEATURED</label>
      <Grid
        container
        columns={{ xs: 4, md: 12 }}
        justifyContent="center"
      >
        {featured?.map((item) => {
          return (
            <PlayListCards key={item.id} playlist={item}/>
            )
        })}
      </Grid>
    </div>
  )
}
