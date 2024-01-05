import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { MdChecklist } from 'react-icons/md';
import { Spin } from 'antd';
import AddTodo from './AddTodo';
import { getTodos } from '../features/todosSlice';
import TodoItem from './TodoItem';


const Home = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user);
    const theme = useSelector(state => state.theme)
    useEffect(() => {
        dispatch(getTodos(user.id))
    }, [dispatch, user])
    
    const {todos, isLoading} = useSelector(state=> state.todos)
    return (
        <main className={theme==='dark' && 'dark'}>
            <h1 style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
            }}>
                <MdChecklist style={{ color: 'blue' }} />
                {user.name}'s todos
            </h1>
            <div className="add-todo">
                <AddTodo />
            </div >
            <div className='container'>
                {isLoading ? <IsloadingComp />
                    : (
                        <div className="todos-list">
                            {todos.length === 0 ? <h3>Nothing todo yet</h3> : 
                                todos.map(item => {
                                    return <TodoItem todo={item} />
                                })
                            }
                        </div>
                    )
                }
            </div>
        </main>
    );
};

export default Home;

const IsloadingComp = () => (
    <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '300px',
                gap: '20px'
            }}>
        <Spin size="large" className='spinner'/>
        <h3> Loading... Please wait </h3>
    </div>
);