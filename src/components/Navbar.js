import React from 'react'
import { reducerCases } from '../utils/Constants';
import { useStateProvider } from '../utils/StateProvider'

export const Navbar = () => {
  const [{screen }, dispatch] = useStateProvider();

  const setChange = (value) => {
    const screen = value;
    dispatch({ type: reducerCases.SET_SCREEN, screen })
  }

  const LogOut = () =>{
    const token = null
    dispatch({type:reducerCases.SET_TOKEN, token});
    window.location.hash = null;
  }

  return (
    <div className='flex flex-row justify-between items-center w-full bg-slate-900 p-3 rounded-lg'>
      <span onClick={() => setChange("HomePage")} className={`text-2xl md:text-lg cursor-pointer hover:text-blue-400 ml-6 ${screen ==="HomePage" ? 'text-orange-500' :''} transition-all ease-in-out duration-500`}>
        <ion-icon name="home-sharp"></ion-icon>
        <button className='ml-2 hidden md:inline '>Home</button>
      </span>
      <span onClick={() => setChange("SearchPage")} className={`text-2xl md:text-lg cursor-pointer hover:text-blue-400 ${screen ==="SearchPage" ? 'text-orange-500' :''} transition-all ease-in-out duration-500`}>
        <ion-icon name="search-sharp"></ion-icon>
        <button className='ml-2 hidden md:inline ' >Search</button>
      </span>
      <span onClick={() => setChange("FeaturedPage")} className={`text-2xl md:text-lg cursor-pointer hover:text-blue-400 ${screen ==="FeaturedPage" ? 'text-orange-500' :''} transition-all ease-in-out duration-500`}>
      <ion-icon name="star-sharp"></ion-icon>
        <button className='ml-2 hidden md:inline '>Featured</button>
      </span>
      <span onClick={() => setChange("CategoryPage")} className={`text-2xl md:text-lg cursor-pointer hover:text-blue-400 ${screen ==="CategoryPage" ? 'text-orange-500' :''} transition-all ease-in-out duration-500`}>
        <ion-icon name="copy-sharp"></ion-icon>
        <button className='ml-2 hidden md:inline '>Categories</button>
      </span>
      <span onClick={() => setChange("MyPlaylistsPage")} className={`text-2xl md:text-lg cursor-pointer hover:text-blue-400 ${screen ==="MyPlaylistsPage" ? 'text-orange-500' :''} transition-all ease-in-out duration-500`}>
        <ion-icon name="musical-notes-sharp"></ion-icon>
        <button className='ml-2 hidden md:inline '>Your Playlist</button>
      </span>
      <span onClick={() => LogOut()} className={`text-2xl md:text-lg cursor-pointer hover:text-blue-400 mr-6 transition-all ease-in-out duration-500`}>
        <ion-icon name="log-out-sharp"></ion-icon>
        <button className='ml-2 hidden md:inline '>LogOut</button>
      </span>
    </div>
  )
}
