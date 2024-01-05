import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../features/userSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    let {user, isLoading, error} = useSelector((state) => state.user);
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: ""
    })
    const handleChange = (e) => {
        setLoginInfo({ ...loginInfo, [e.target.name] : e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginInfo))
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
        <form onSubmit={handleSubmit} className='login-form'>
                <h3>Login</h3>

            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Username" name="username" onChange={handleChange}/>

            <label htmlFor="password">Password</label>
            <input type="text" placeholder="Password" name="password" onChange={handleChange} />

            <input type="submit" className='submit' value={isLoading ? 'Submitting' : 'Log In'} />
                
            <p className='err-message'>{error && error}</p>
            <Link className='create-account' to='/signup'>Create Account</Link>
        </form>
    </div>
    );
};


export default Login;