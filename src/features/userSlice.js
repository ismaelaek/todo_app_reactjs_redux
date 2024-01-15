import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import bcrypt from 'bcryptjs'

const initialState = {
    user: '',
    isLoading: false,
    error: null
}

export const login = createAsyncThunk('login', async (loginInfo, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:3006/users');
        const user = response.data.find(item => item.username === loginInfo.username && 
                                        bcrypt.compare(loginInfo.password, item.password)
        )
        if (!user) {
            throw new Error('Username or password incorrect')
        } 
        return user
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})
export const addUser = createAsyncThunk('addUser', async (userInfo, thunkAPI) => {
    try {
        const post = await axios.post('http://localhost:3006/users', userInfo);

        const response = await axios.get('http://localhost:3006/users');
        const user = response.data.find(item => item.username === userInfo.username && 
                                                item.password === userInfo.password
        )
        if (!user) {
            throw new Error('Username or password incorrect')
        } 
        return user
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: state => {
            state.user = ''
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [login.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        [login.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        [addUser.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [addUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        [addUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        
    }
})
export const { logout } = userSlice.actions;
export default userSlice.reducer;
