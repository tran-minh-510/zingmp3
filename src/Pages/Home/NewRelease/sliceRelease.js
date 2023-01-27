import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newRelease: {
        title: '',
        items: []
    }
}
const sliceNewRelease = createSlice({
    name: 'new-release',
    initialState: initialState,
    reducers: {
        setNewRelease: (state, action) => {
            state.newRelease.title = action.payload.title
            state.newRelease.items = action.payload.items
        },
    },
})

export const actionsNewRelease = sliceNewRelease.actions
export const stateNewRelease = state => state.sliceNewRelease
export default sliceNewRelease.reducer