import { useState, useEffect } from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import { Link,useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { IconContext } from 'react-icons';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { getUserInfo } from "../../api/userInfo";
function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const showSidebar = () => setSidebar(!sidebar);
  const navigate = useNavigate();
  const handleProfile = () => {
    navigate("/profile");
  };
  const [userInfo, setUserInfo] = useState(undefined);
  useEffect(() => {
    const getData = async () => {
      const userInfo = await getUserInfo();
      setUserInfo(userInfo);
    };
    getData();
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='sidebar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} color="#060b26"/>
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <li onClick={handleProfile} style={{cursor:"pointer"}}>
                <div id="profileImage">
                    <p className="profileImg">{userInfo?.firstName.charAt(0) +userInfo?.lastName.charAt(0)}</p>
                </div>
            </li>
            <li className='nav-text'>
                <Link to="/profile">
                    <AiIcons.AiOutlineUser/>
                    <span>Profile</span>
                </Link>
            </li>
            <li className='nav-text'>
                <Link to="/home">
                    <AiIcons.AiFillHome/>
                    <span>Home</span>
                </Link>
            </li>
            <li className='nav-text'>
                <Link to="/groups">
                    <AiIcons.AiOutlineUsergroupAdd/>
                    <span>My Groups</span>
                </Link>
            </li>
            <li className='nav-text' onClick={logOutUser}>
                <Link to="/home">
                    <BiIcons.BiLogOutCircle/>
                    <span>Logout</span>
                </Link>
            </li>
 
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;