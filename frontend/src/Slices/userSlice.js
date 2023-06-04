import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        user: undefined,
        authenticated: 'uninit',
    },
    reducers:{
        setUser: (state, action) => {
            state.user = action?.payload
        },
        setAuthenticated: (state, action) => {
            state.authenticated = action?.payload
        }
    }
})

export const { setUser, setAuthenticated } = userSlice.actions;
export default userSlice.reducer;