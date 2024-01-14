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
        if (!todo.title || todo.title.trim() ==='' ) {
            message.warning("Field can not be empty!!")
            return;
        }
        dispatch(addTodo(todo))
        setTodo({...todo, title: ''});
        
    }
    return (
        <form className="addTodo-form" onSubmit={handleSubmit}>
            <input type="text" className="input" name="title" placeholder="What should be done ?"  value={todo.title} onChange={handleChenge}/>
            <input className="button--submit" value="Add" type="submit"/>
        </form>
        
    );
};

export default AddTodo;