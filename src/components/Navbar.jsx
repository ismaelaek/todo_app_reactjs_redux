import React, { useEffect } from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/userSlice';
import { FaMoon, FaSun } from 'react-icons/fa6'
import { toggleTheme } from '../features/themeSlice';
import { Switch } from 'antd';

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user);
    const theme = useSelector(state => state.theme)
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])
    const onChange = () => {
        dispatch(toggleTheme())
    }
    return (
        <nav>
            <div className="logo">
                <h1>To Do App</h1>
            </div>
            <ul className="menu-list">
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap : 10
                }}>
                    <FaSun/>
                    <Switch checked={theme==='dark'} onChange={onChange} size='small'style={{backgroundColor: 'black'}} />
                    <FaMoon/>
                </div>
                <li><NavLink  to='/'>Home</NavLink></li>
                <li><NavLink to='/about' >About</NavLink></li>
                {user && <button className='logout' onClick={() => {
                    dispatch(logout())
                }}>Log Out</button>}
            </ul>
        </nav>
    );
};

export default NavBar;