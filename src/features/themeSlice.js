import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: 'theme',
    initialState: 'light',
    reducers: {
        toggleTheme(state) {
            return state === 'dark' ? 'light' : 'dark';
        },
    },
})

export default themeSlice.reducer;
export const { toggleTheme } = themeSlice.actions;