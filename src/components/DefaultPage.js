import axios from 'axios';
import React,{useEffect} from 'react'
import { Navbar } from './Navbar'
import { PlayerBox } from './track-player/PlayerBox'
import { useStateProvider } from '../utils/StateProvider'
import { reducerCases } from '../utils/Constants';
import { LandingPage } from './pages/LandingPage';
import { SearchPage } from './pages/SearchPage';
import { FeaturedPage } from './pages/FeaturedPage'
import { CategoriesPage } from './pages/CategoriesPage';
import { MyPlaylistsPage } from './pages/MyPlaylistPage';
import { AlbumTracksPage } from './sub-pages/AlbumTracksPage';
import { PlaylistsPage } from './sub-pages/PlaylistsPage';
import { PlaylistTracksPage } from './sub-pages/PlaylistTracksPage'

function DefaultPage() {
    const [{token, screen}, dispatch] = useStateProvider();

    useEffect(()=>{
        const getUserInfo = async () => {
            const {data} = await axios.get(
                "https://api.spotify.com/v1/me",{
                    headers: {
                        Authorization: "Bearer " +token ,
                        "Content-Type": "application/json"
                    }
                })
            const userInfo = {
                userId : data.id,
                userName : data.display_name,
                email: data.email
            }
            dispatch({type:reducerCases.SET_USERS, userInfo});
        }
        getUserInfo();
    },[dispatch,token]);

    return (
        <div className='h-[100vh] w-[100vw] overflow-hidden flex flex-col justify-center items-center bg-slate-800'>
            <div className='flex flex-row h-[90%] w-full'>
                <div className='flex flex-col justify-start items-center w-full h-full'>
                    <div className='w-[95%] my-2'>
                        <Navbar />
                    </div >
                    { screen === "HomePage" ?
                        <LandingPage/>
                        :
                        screen ==="SearchPage"?
                        <SearchPage/>
                        :
                        screen ==="FeaturedPage"?
                        <FeaturedPage/>
                        :
                        screen ==="CategoryPage"?
                        <CategoriesPage/>
                        :
                        screen ==="MyPlaylistsPage"?
                        <MyPlaylistsPage/>
                        :
                        screen === "PlaylistsDetails"?
                        <PlaylistsPage/>
                        : 
                        screen === "PlaylistTracksPage"?
                        <PlaylistTracksPage/>
                        :
                        screen === "AlbumSongs"?
                        <AlbumTracksPage/>
                        :
                        <LandingPage/>
                    }
                </div>
            </div>
            <div className='flex flex-col h-[10%] w-full'>
                <PlayerBox />
            </div>
        </div>
    )
}

export default DefaultPage