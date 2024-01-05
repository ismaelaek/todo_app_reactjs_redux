import React from 'react';
import { useSelector } from 'react-redux'

const About = () => {
    const theme = useSelector(state => state.theme)
    return (
        <main className={theme==='dark' && 'dark'}>
            <h1>This is About page</h1>
        </main>
    );
};

export default About;