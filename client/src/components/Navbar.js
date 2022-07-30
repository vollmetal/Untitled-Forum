import { NavLink, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { logout } from '../stores/userReducer'


function Navbar (props) {
    const { username, isAuthenticated } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutFunction = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <div className='navbar'>
            <div className="navigation">
                <h1>OpenForum</h1>
                <div><NavLink to="/"><button>Home</button> </NavLink></div>
            </div>
            <div className='userNav'>
                {!isAuthenticated ? <div>
                        <div className="navButton"><NavLink to='/register'><button>Register</button></NavLink></div>
                        <div className="navButton"><NavLink to='/login'><button>Login</button></NavLink></div>
                    </div> : <div>
                        <h1>{username}</h1>
                        <div className="navButton"><NavLink to='/profile'><button> My Profile</button></NavLink></div>
                        <button onClick={logoutFunction}>Logout</button>
                </div>}
            </div>
        </div>
    )
}

export default Navbar