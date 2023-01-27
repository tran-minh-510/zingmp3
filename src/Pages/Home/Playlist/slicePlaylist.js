import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hArtistTheme: {
        title: '',
        items: []
    },
    hAutoTheme1: {
        title: '',
        items: []
    },
    hAutoTheme2: {
        title: '',
        items: []
    },
    hAlbum: {
        title: '',
        items: []
    },
    hXone: {
        title: '',
        items: []
    },
    h100: {
        title: '',
        items: []
    }
}
const slicePlaylist = createSlice({
    name: 'playlist',
    initialState: initialState,
    reducers: {
        setHArtistTheme: (state, action) => {
            state.hArtistTheme.title = action.payload.title
            state.hArtistTheme.items = action.payload.items
        },
        setHAutoTheme1: (state, action) => {
            state.hAutoTheme1.title = action.payload.title
            state.hAutoTheme1.items = action.payload.items
        },
        setHAutoTheme2: (state, action) => {
            state.hAutoTheme2.title = action.payload.title
            state.hAutoTheme2.items = action.payload.items
        },
        setHAlbum: (state, action) => {
            state.hAlbum.title = action.payload.title
            state.hAlbum.items = action.payload.items
        },
        setHXone: (state, action) => {
            state.hXone.title = action.payload.title
            state.hXone.items = action.payload.items
        },
        setH100: (state, action) => {
            state.h100.title = action.payload.title
            state.h100.items = action.payload.items
        }
    },
})

export const actionsPlaylist = slicePlaylist.actions
export const statePlaylistHArtistTheme = (state => state.slicePlaylist.hArtistTheme)
export const stateHAutoTheme1 = (state => state.slicePlaylist.hAutoTheme1)
export const stateHAutoTheme2 = (state => state.slicePlaylist.hAutoTheme2)
export const stateHAlbum = (state => state.slicePlaylist.hAlbum)
export const stateHXone = (state => state.slicePlaylist.hXone)
export const stateH100 = (state => state.slicePlaylist.h100)
export default slicePlaylist.reducer