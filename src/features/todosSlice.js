import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    todos : [],
    isLoading: false,
    error: null,

};
export const getTodos = createAsyncThunk('todos/getTodos', async (id, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:3006/todos');
        const todos = response.data.filter(item => item.userId === id);
        if (!todos) {
            throw new Error('Something went wrong');
        }
        return todos;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const addTodo = createAsyncThunk('todos/addTodo', async (todoInfo, thunkAPI) => {
    try {
        const respo = await axios.post('http://localhost:3006/todos', todoInfo);
        return respo.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})
export const deletTodo = createAsyncThunk('todos/deleteTodo', async (id, thunkAPI) => {
    try {
        const respo = await axios.delete(`http://localhost:3006/todos/${id}`);
        return id;
    } catch (error) {
        console.log(error.message)
        return thunkAPI.rejectWithValue(error.message)
    }
})
export const handleComplete = createAsyncThunk('todos/handleComplete', async (todo, thunkAPI) => {
    try {
        const response = await axios.put(`http://localhost:3006/todos/${todo.id}`, todo);
        return todo; 
    } catch (error) {
        console.log(error.message);
        return thunkAPI.rejectWithValue(error.message);
    }
});

// I tried deleting all in one request ´url/todos?userId=${id}´ but idk why it doesnt work 
// so I made this instead :
export const deleteAll = createAsyncThunk('todos/deleteAll', async (id, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:3006/todos');
        const todos = response.data.filter(item => item.userId === id);
        todos.map( async (item) => {
            await axios.delete(`http://localhost:3006/todos/${item.id}`)
        })
        if (!todos) {
            throw new Error('Something went wrong');
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
});

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
    },
    extraReducers: {
        [getTodos.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [getTodos.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.todos = action.payload;
        },
        [getTodos.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        [addTodo.pending]: (state) => {
            // state.isLoading = true;
            state.error = null;
        },
        [addTodo.fulfilled]: (state, action) => {
            // state.isLoading = false;
            state.todos.push(action.payload);
        },
        [addTodo.rejected]: (state, action) => {
            // state.isLoading = false;
            state.error = action.payload;
        },

        [deletTodo.pending]: (state) => {
            // state.isLoading = true;
            state.error = null;
        },
        [deletTodo.fulfilled]: (state, action) => {
            // state.isLoading = false;
            state.todos= state.todos.filter(item=> item.id !== action.payload);
        },
        [deletTodo.rejected]: (state, action) => {
            // state.isLoading = false;
            state.error = action.payload;
        },

        [handleComplete.pending]: (state) => {
            // state.isLoading = true;
            state.error = null;
        },
        [handleComplete.fulfilled]: (state, action) => {
            // state.isLoading = false;
            state.todos = state.todos.map(todo =>
            todo.id === action.payload.id ? { ...todo, completed: action.payload.completed } : todo
        );
        },
        [handleComplete.rejected]: (state, action) => {
            // state.isLoading = false;
            state.error = action.payload;
        },
        
        [deleteAll.pending]: (state) => {
            // state.isLoading = true;
            state.error = null;
        },
        [deleteAll.fulfilled]: (state) => {
            // state.isLoading = false;
            state.todos = [];
        },
        [deleteAll.rejected]: (state, action) => {
            // state.isLoading = false;
            state.error = action.payload;
        },
        
    }
});


export default todoSlice.reducer;

