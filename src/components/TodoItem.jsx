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
    const btnStyle = {
        color: 'red',
        fontSize: 20,
        cursor: 'pointer'
    }

    return (
        <div className='todo-item'>
            <div className="todo-title" >
                <input type="checkbox" className='checkbox' onChange={handleCheck} checked={todo.completed } />
                <p className={todo.completed && 'done'}>{todo.title}</p>
            </div>
            <div className="todo-actions">
                {todo.completed ? (<FaTimes style={btnStyle} onClick={handleConfirm} />
                    ) : (
                        <Popconfirm
                            title="Task is not done yet"
                            description="Are you sure to delete it anyway?"
                            onConfirm={handleConfirm}
                            okText="Yes"
                            cancelText="No"
                            >
                            <FaTimes style={btnStyle}/>
                        </Popconfirm>
                    )}
            </div>
        </div>
    );
};

export default TodoItem;