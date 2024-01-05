import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from '../features/todosSlice';
import { message } from 'antd';

const AddTodo = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user) 
    const [todo, setTodo] = useState({
        "userId": user.id,
        "title": "",
        "completed": false
    })
    const handleChenge = (e) => {
        setTodo({...todo, [e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!todo.title) {
            message.warning("Please enter a title")
            return;
        }
        dispatch(addTodo(todo))
        setTodo({
            "userId": user.id,
            "title": "",
            "completed": false
        });
        
    }
    return (
        <form className="addTodo-form" onSubmit={handleSubmit}>
            <input type="text" className="input" name="title" placeholder="New Task"  value={todo.title} onChange={handleChenge}/>
            <input className="button--submit" value="Add" type="submit"/>
        </form>
        
    );
};

export default AddTodo;