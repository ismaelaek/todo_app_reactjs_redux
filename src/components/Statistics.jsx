import React from 'react';
import { useSelector } from 'react-redux'

const Statistics = () => {
    const { todos} = useSelector(state => state.todos)
    const total = todos.length;
    const todoNum = todos.filter(item => {
        return item.completed === false
    }).length;

    const done = (total - todoNum) / total * 100;
    let doneRounded;
    done ? doneRounded = done.toFixed(2) : doneRounded = 0;
    return (
        <div className='statistics'>
            <div>
                <h3>Total</h3>
                <h2><span>{ total }</span> {total === 1 ?'task': 'tasks'}  </h2>
            </div>
            <div>
                <h3>To Do </h3>
                <h2><span>{ todoNum }</span> {todoNum === 1 ?'task': 'tasks'} </h2>
            </div>
            <div>
                <h3>Done</h3>
                <div style={{
                    width: '80%',
                    height: '20px',
                    backgroundColor:'#ec4848',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    position: 'relative',
                    marginTop: 5
                }}> 
                    <div style={{
                        width: doneRounded + '%',
                        height:'100%',
                        backgroundColor: '#f9d749'
                    }}>
                        <h5 className='done-percentage'>
                            {doneRounded} %
                        </h5>
                    </div>
                    
                </div>
                
            </div>
        </div>
    );
};

export default Statistics;