import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { gsap } from 'gsap';

const Statistics = () => {
    const { todos } = useSelector(state => state.todos);
    const total = todos.length;
    const todoNum = todos.filter(item => item.completed === false).length;

    const done = (total - todoNum) / total * 100;
    const doneRounded = done ? done.toFixed(2) : 0;
    const completionBarRef = useRef(null);
    const percentageTextRef = useRef(null);

    useEffect(() => {
        gsap.to(completionBarRef.current, {
            width: `${doneRounded}%`,
            duration: 0.5,
            ease: 'power2.inOut',
        });

        gsap.to(percentageTextRef.current, {
            textContent: `${doneRounded} %`,
            duration: 0.5,
            ease: 'power2.inOut',
        });
    }, [doneRounded]);

    return (
        <div className='statistics'>
            <div>
                <h3>Total</h3>
                <h2>
                    <span>{total}</span> {total === 1 ? 'task' : 'tasks'}
                </h2>
            </div>
            <div>
                <h3>To Do </h3>
                <h2>
                    <span>{todoNum}</span> {todoNum === 1 ? 'task' : 'tasks'}
                </h2>
            </div>
            <div>
                <h3> Completed </h3>
                <div
                    style={{
                        width: '80%',
                        height: '20px',
                        backgroundColor: '#ec4848',
                        borderRadius: '5px',
                        overflow: 'hidden',
                        position: 'relative',
                        marginTop: 5,
                    }}
                >
                    <div
                        ref={completionBarRef}
                        className='animated'
                        style={{
                            width: '0%',
                            height: '100%',
                            backgroundColor: '#f9d749',
                        }}
                    />
                    <h5
                        ref={percentageTextRef}
                        className='done-percentage'
                        style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}
                    >
                        {doneRounded} %
                    </h5>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
