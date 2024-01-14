import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { addUser } from '../features/userSlice';
import { message } from 'antd';
const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
        name: '',
        username: '',
        email: '',
        password: ''

    })
    const { user, isLoading, error } = useSelector(state => state.user);
    const handleChange = (e) => {
        setUserInfo({...userInfo, [e.target.name]: e.target.value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userInfo.name || !userInfo.username || !userInfo.password || !userInfo.email) {
            message.warning("Please Don't leave any fields blank")
        }
        else {
            dispatch(addUser(userInfo))
        }
    }
    useEffect(() => {
        if (user && !isLoading) {
            navigate('/');
        }
    }, [user, isLoading, navigate]);

    return (
        <div style={{backgroundColor: '#101010', height: '100vh'}}>
        <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
        </div>
        <form onSubmit={handleSubmit} className='regester'>
            <label htmlFor="name">Full Name</label>
            <input type="text" placeholder="Full Name" name="name" onChange={handleChange} />
                
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Username" name="username" onChange={handleChange} />
                
            <label htmlFor="email">email</label>
            <input type="text" placeholder="Email" name="email" onChange={handleChange}/>

            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />

            <input type="submit" className='submit' value={isLoading? 'Submitting' : 'Sign Up'} />
                
            <Link className='create-account' to='/login'> Sign In</Link>
        </form>
    </div>
    );
};

export default Signup;