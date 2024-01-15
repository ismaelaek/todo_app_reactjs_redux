import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { addUser } from '../features/userSlice';
import { message } from 'antd';
import bcrypt from 'bcryptjs'

const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const salt = bcrypt.genSaltSync(10)
    
    const [userInfo, setUserInfo] = useState({
        name: '',
        username: '',
        email: '',
        password: ''

    })
    const { user, isLoading } = useSelector(state => state.user);
    const handleChange = (e) => {
        if (e.target.name === 'password') {
            let hashedPassword = bcrypt.hashSync(userInfo.password, salt)
            setUserInfo({...userInfo, [e.target.name]: hashedPassword})
        } else {
            setUserInfo({...userInfo, [e.target.name]: e.target.value});
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (userInfo.name.trim() === '' ||
            userInfo.username.trim() === '' ||
            userInfo.password.trim() === '' ||
            userInfo.email.trim()===''
        ) {
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