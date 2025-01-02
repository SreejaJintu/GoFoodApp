import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('user');

    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}>Admin Panel</h1>
      <div>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#34495e',
    padding: '10px 20px',
    color: '#fff',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: '6px 12px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s ease',
  },
};

export default Navbar;
