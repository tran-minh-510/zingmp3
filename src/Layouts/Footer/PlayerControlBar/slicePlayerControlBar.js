import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bodyAppRef: <p>hihi</p>,
    songVip: false
}
const slicePlayerControlBar = createSlice({
    name: 'bodyAppRef',
    initialState: initialState,
    reducers: {
        setBodyAppRef: (state, action) => {
            state.bodyAppRef = action.payload
        }
    },
})

export const actionsBodyAppRef = slicePlayerControlBar.actions
export const getStatePlayerControlBar = state => state.slicePlayerControlBar
export default slicePlayerControlBar.reducer