import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    curSongID: null,
    infoSong: {},
    isPlaying: false,
    isLoading: false
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
            const { type, isPlaying } = action.payload
            if (type === 1) {
                state.isPlaying = isPlaying
            }
            if (type === 0) {
                state.isPlaying = !isPlaying
            }
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        }
    },
})

export const actionsPersistMusic = sliceMusic.actions
export const persistMusic = state => state.persistReducer
export default sliceMusic.reducer