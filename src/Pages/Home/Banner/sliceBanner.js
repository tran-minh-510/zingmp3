import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    banner: []
}
const sliceBanner = createSlice({
    name: 'banner',
    initialState: initialState,
    reducers: {
        setBanner: (state, action) => {
            state.banner = action.payload
        }
    },
})

export const actionsBanner = sliceBanner.actions
export const banner = (state => state.sliceBanner)
export default sliceBanner.reducer