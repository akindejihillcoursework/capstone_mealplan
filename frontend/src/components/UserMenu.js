import {Link} from 'react-router-dom';
import '../styles/UserMenu.css';
import { useNavigate, redirect } from 'react-router-dom';

const UserMenu = ({uMVisibility, toggleUserMenu, updateUser}) => {

    const navigate = useNavigate();

    function logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log("Logout clicked");
        updateUser(null);
        navigate('/');
    }

    return (
        <div id="user_menu" className={uMVisibility} onBlur={toggleUserMenu}>
            <p><a onClick={logout}>logout</a></p>
            <p><Link to={"/profile"}>profile</Link></p>
        </div> 
    )
}

export default UserMenu;
