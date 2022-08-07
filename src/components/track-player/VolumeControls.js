import axios from "axios";
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import {BsFillVolumeUpFill, BsFillVolumeOffFill} from 'react-icons/bs'
import { useStateProvider } from '../../utils/StateProvider';

export const VolumeControls = () => {
  const [value, setValue] = useState(30);
  const [{token}] = useStateProvider();

  const handleChange = async (event, newValue) => {
    setValue(newValue);
    await axios.put(
      `https://api.spotify.com/v1/me/player/volume`,
      {},
      {
          params:{
            volume_percent:parseInt(event.target.value)
          },
          headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json"
          }
      });

    
  };
  return (
    <Box sx={{ width: 200 }} className='text-4xl'>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <BsFillVolumeOffFill className='hidden md:block'/>
        <Slider aria-label="Volume" value={value} onChange={handleChange} />
        <BsFillVolumeUpFill className='hidden md:block'/>
      </Stack>
    </Box>
  )
}
