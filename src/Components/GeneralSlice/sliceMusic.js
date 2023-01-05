import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    curSongID: null,
    infoSong: {},
    isPlaying: false
}
const sliceMusic = createSlice({
    name: 'music',
    initialState: initialState,
    reducers: {
        setIdMusicLocal: (state, action) => {
            state.curSongID = action.payload
        },
        setInfoSong: (state, action) => {
            state.infoSong = action.payload
        },
        setPlaying: (state, action) => {
            state.isPlaying = !action.payload
        }
    },
})

export const actionsPersistMusic = sliceMusic.actions
export const persistMusic = state => state.persistReducer
export default sliceMusic.reducer