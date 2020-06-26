import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: "",
        points: 0,
    },
    reducers: {
        incrementPoint : state => {state.points += 1},
        resetPoints: state => {
            return {
                ...state,
                points: 0
            }
        },
        setName: (state,action) => {state.name = action.payload}
    }
});

export const {incrementPoint, resetPoints, setName} = userSlice.actions;
export const selectName = state => state.user.name;
export const selectPoints = state => state.user.points;

export default userSlice.reducer;