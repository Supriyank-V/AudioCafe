import React from 'react'
import { CurrentTrack } from './CurrentTrack'
import {PlayerControls} from './PlayerControls'
import {VolumeControls} from './VolumeControls'

export const PlayerBox = () => {
  return (
    <div className='w-full h-full bg-black flex flex-row justify-between items-center p-2'>
      <div className='w-[33%] flex items-center justify-start whitespace-nowrap  overflow-hidden'><CurrentTrack/></div>
      <div className='w-[33%] flex items-center justify-center'><PlayerControls/></div>
      <div className='w-[33%] flex items-center justify-end'><VolumeControls/></div>
      </div>
  )
}
