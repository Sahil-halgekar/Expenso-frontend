import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import './Navbar.css';

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="navbar">
        <h1 className="app-logo1">Expenso</h1>
    </div>
  );
}

export default Navbar;
