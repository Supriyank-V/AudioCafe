import React from 'react'

function Login() {

  const connectSpotify = () => {
    const client_id = 'b7c95361a5f347df90c38b94beee6170';
    const redirect_uri = 'http://localhost:3000/';
    const api_url = 'https://accounts.spotify.com/authorize';
    const scope = [
      'user-read-email',
      'user-read-private',
      'user-modify-playback-state',
      'user-read-playback-state',
      'user-read-currently-playing',
      'user-read-recently-played',
      'user-read-playback-position',
      'user-top-read',
      ];

    window.location.href = `${api_url}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(" ")}&response_type=token&show_daialog=true`;
  }

  return (
    <div className='flex flex-col items-center justify-between h-[100vh]'>
      <div className='flex flex-col justify-center items-center h-[80%]'>
        <div className='bg-slate-900 m-2 p-3 flex flex-col justify-center items-center rounded-lg'>
        <label className='text-4xl '>Audio Cafe : Music Library</label>
        <label className='flex flex-row items-center mt-2'>Using <img className='w-24 ml-2' src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png' alt='spotify' /> API </label>
      <div className='flex flex-col justify-center items-center h-[20%] mt-4'>
        <button
          className='px-4 py-2 mt-6 bg-green-700 rounded-full hover:bg-green-400 transition-all duration-500 cursor-pointer'
          onClick={connectSpotify}
        >
          Connect with Spotify</button>
      </div>
      </div>
      </div>
      <div className='flex flex-col h-[5%] pb-2 w-full justify-end items-center bg-slate-900'>
        <label> @AbertonStudio 2022. Built using React</label>
      </div>
    </div>
  )
}

export default Login