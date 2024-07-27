import { createSlice } from "@reduxjs/toolkit";

export const updateSlice = createSlice({
    name: 'update',
    initialState: null,
    reducers: {
        take: (state, action) => state = action.payload,
    },
});

export const { take } = updateSlice.actions;
export default updateSlice.reducer;