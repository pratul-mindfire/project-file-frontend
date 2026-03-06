import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // remove auth token
    localStorage.removeItem('token');
    // redirect to login page
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <h2 className="logo">Project Portal</h2>

        <nav>
          <NavLink to="/projects" className="sidebar-link">
            Projects
          </NavLink>
        </nav>
      </div>

      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
