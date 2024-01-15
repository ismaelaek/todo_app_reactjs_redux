import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { MdChecklist } from 'react-icons/md';
import { Spin, message, Popconfirm } from 'antd';
import AddTodo from './AddTodo';
import { getTodos } from '../features/todosSlice';
import TodoItem from './TodoItem';
import { FaTimes } from 'react-icons/fa';
import { deleteAll } from '../features/todosSlice';


const Home = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user);
    const theme = useSelector(state => state.theme)
    useEffect(() => {
        dispatch(getTodos(user.id))
    }, [dispatch, user])
    
    const { todos, isLoading , error} = useSelector(state => state.todos)

    const handleConfirm = () => {
        dispatch(deleteAll(user.id))
        message.success('All tasks were deleted');
    }
    // error ? console.log(error) : console.log('no errors')
    return (
        <main className={theme==='dark'? 'dark': undefined}>
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
            {todos.length !== 0 &&
                <Popconfirm
                    title="Delete All"
                    description="Are you sure to delete all tasks?"
                    onConfirm={handleConfirm}
                    okText="Yes"
                    cancelText="No"
                >
                    <button  className = 'logout' style={{display:'flex', gap:5, marginTop:20}}> Delete All <FaTimes /> </button>
                </Popconfirm>
            }
            
            <div className='container'>

                {isLoading ? <IsloadingComp />
                    : (
                        <div className="todos-list">
                            {todos.length === 0 ? <h3 style={{textAlign: 'center'}}>Nothing todo yet... </h3> : 
                                todos.map(item => {
                                    return <TodoItem key={item.id} todo={item} />
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