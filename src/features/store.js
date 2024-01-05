import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice'
import todosSlice from './todosSlice';
import themeSlice from './themeSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        todos: todosSlice,
        theme: themeSlice
    }
})
export default store;
