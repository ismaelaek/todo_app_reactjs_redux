import React from 'react';
import { useDispatch } from 'react-redux'
import { message, Popconfirm } from 'antd';
import { deletTodo } from '../features/todosSlice';
import { handleComplete } from '../features/todosSlice';
import { FaTimes } from 'react-icons/fa';
const TodoItem = ({ todo }) => {
    const dispatch = useDispatch();
    const handleConfirm = () => {
        dispatch(deletTodo(todo.id))
        message.success('Todo was deleted');
    };
    const handleCheck = () => {
        dispatch(handleComplete({ ...todo, completed: !todo.completed }));
    };


    return (
        <div className='todo-item'>
            <div className="todo-title" >
                <input type="checkbox" className='checkbox' onChange={handleCheck} checked={todo.completed } />
                <p className={todo.completed && 'done'}>{todo.title}</p>
            </div>
            <div className="todo-actions">
                <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={handleConfirm}
                    okText="Yes"
                    cancelText="No"
                >
                    <FaTimes style={{color: 'red', fontSize: 20, cursor: 'pointer'}}/>
                </Popconfirm>
            </div>
        </div>
    );
};

export default TodoItem;