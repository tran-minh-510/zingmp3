import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPrivated: true,
    infoUser: {}
}
const sliceUser = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setIsPrivated: (state, action) => {
            state.isPrivated = action.payload
        }
    },
})

export const actionsSliceUser = sliceUser.actions
export const getStateUser = state => state.sliceUser
export default sliceUser.reducer