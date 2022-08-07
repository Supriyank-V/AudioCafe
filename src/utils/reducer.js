import { reducerCases } from "./Constants";

export const initialState = {
    token: null,
    playlists :[],
    userInfo:[],
    selectedPlaylistId: '',
    selectedMusicList: [],
    currentlyPlaying: null,
    screen: "HomePage",
    artistList : [],
    albumList : [],
    trackList : [],
    categories : [],
    featured : [],
    newAlbums : [],
    albumId:'',
    selectedAlbumTracks: [],
    selectedAlbumDetails: [],
    featuredId:'',
    selectedId:'',
    playstate : false,
};

export const reducer = (state, action) =>{
    switch(action.type) {
        case reducerCases.SET_TOKEN : {
            return{
                ...state,token : action.token,
            }
        }
        case reducerCases.SET_PLAYLISTID: {
            return {
                ...state,
                selectedPlaylistId: action.selectedPlaylistId
            }
        }
        case reducerCases.SET_PLAYLISTS: {
            return {
                ...state,
                playlists : action.playlists,
            }
        }
        case reducerCases.SET_USERS:{
            return{
                ...state,
                userInfo : action.userInfo,
            }
        }
        case reducerCases.SET_SONGSLIST: {
            return {
                ...state,
                selectedMusicList : action.selectedMusicList
            }
        }
        case reducerCases.SET_ARTISTLIST:{
            return{
                ...state,
                artistList : action.artistList
            }
        }
        case reducerCases.SET_ALBUMLIST:{
            return{
                ...state,
                albumList : action.albumList
            }
        }
        case reducerCases.SET_TRACKLIST:{
            return{
                ...state,
                trackList : action.trackList
            }
        }
        case reducerCases.SET_PLAYING: {
            return{
                ...state,
                currentlyPlaying : action.currentlyPlaying
            }
        }
        case reducerCases.SET_SCREEN: {
            return{
                ...state,
                screen: action.screen
            }
        }
        case reducerCases.SET_CATEGORIES: {
            return{
                ...state,
                categories: action.listCategories
            }
        }
        case reducerCases.SET_FEATURED:{
            return{
                ...state,
                featured: action.listFeatured
            }
        }
        case reducerCases.SET_NEWALBUMS: {
            return {
                ...state,
                newAlbums : action.listNewAlbums
            }
        }
        case reducerCases.SET_ALBUMID: {
            return {
                ...state,
                albumId : action.selectedAlbumID
            }
        }
        case reducerCases.SET_ALBUMTRACKS: {
            return {
                ...state,
                selectedAlbumTracks : action.selectedAlbumTracks
            }
        }
        case reducerCases.SET_ALBUMDETAILS: {
            return {
                ...state,
                selectedAlbumDetails: action.selectedAlbumDetails
            }
        }
        case reducerCases.SET_FEATUREDID: {
            return {
                ...state,
                featuredId: action.selectedFeaturedId
            }
        }

        case reducerCases.SET_SELECTEDID: {
            return {
                ...state,
                selectedId : action.selectedId
            }
        }
        case reducerCases.SET_PLAYSTATE: {
            return {
                ...state,
                playstate : action.playstate
            }
        }
        default : return state;
    }
}