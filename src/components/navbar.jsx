import { useContext, useEffect, useState } from 'react';
import './../assets/styles/style.css'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from './auth/AuthContext';
import LogoutButton from './auth/logout';
import parseJwt from './auth/AuthParser';
import Friends from './user/friends';

function Navbar(){
  const {token} = useContext(AuthContext);
  const [msg, setMsg] = useState("");
  const userId = parseJwt(token)?.sub;
  const navigate = useNavigate();
  const config = {
    method: 'get',
    url: `${import.meta.env.VITE_BACKEND_URL}/users/${userId}/show`,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (token) {
      axios(config)
        .then((response) => {
          console.log("Showing credentials because you are logged in.");
          setMsg(`Welcome, ${response.data.user.username} (${response.data.user.email})`);
        })
        .catch((error) => {
          console.log("An error occurred. You are not logged in.");
          console.log(error);
        });
    } else {
      setMsg("");
  }
  }, [token]);

  const handleClick = async () => {
    try{
      navigate(`/user/${userId}/friends`);
    }catch(error){
      console.error(`Error: ${error}`);
    }
  };

  return (
    <>
        <nav>
            <Link to="/" className="navbar-logo">
              <img src="/src/assets/imgs/logo.png" alt="Logo" className="logo-image" />
            </Link>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/guide">Guide</Link></li>
              <li><Link to="/wiki">Wiki</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
        </nav>
        <div className='welcome'>
        <h3>{msg}</h3>
        <div id='welcomeBtns'>
        {token !== null && <button id='friendsBtn'
                                   onClick={() => {handleClick()}}
                                   >Friends
                            </button>}
        {token !== null && <LogoutButton />}
        </div>
        </div>
    </>
  );
}

export default Navbar