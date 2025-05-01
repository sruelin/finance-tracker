import { NavLink, Outlet } from 'react-router-dom';
import { Home, DollarSign, FileText, BarChart2, Settings, Menu, X, LogOut} from 'lucide-react';
import styles from './Sidebar.module.css'; // 👈 import the CSS module
import { useState  } from 'react';
<img src = "/hiker.png" alt= "hiker avatar" className={styles.avatar} />
const tabs = [
  { label: 'Dashboard', path: '/dashboard', icon: Home },
  { label: 'Budget', path: '/budget', icon: DollarSign },
  { label: 'Expenses', path: '/expenses', icon: FileText },
  { label: 'Reports', path: '/reports', icon: BarChart2 },
  { label: 'Settings', path: '/settings', icon: Settings }
];

export default function SidebarLayout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div className={`${styles.sidebar} ${!isOpen ? styles.sidebarClosed : ''}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles.toggleBtn}
          title={isOpen ? 'Collapse menu' : 'Expand menu'}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
          
        </button>
        <div className={styles.header}>
        {isOpen && <><h1 className={styles.title}>Finance</h1></>}
        <div className={styles.profileContainer}>
  <button className={styles.profileBtn} title="Profile">
    <img src="/hiker.png" alt="Profile" className={styles.avatar} />
  </button>
  {isOpen && <span className={styles.welcome}>Welcome, Rue!</span>}
</div>

 
</div>

          

        <nav className={styles.nav}>
          {tabs.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.activeLink : ''}`
              }
              title={!isOpen ? label : ''}
              
            >
              <Icon className={styles.icon} />
              {isOpen && <span className={styles.label}>{label}</span>}
            </NavLink>
          ))}
        </nav>
         {/* Footer/Logout */}
         <div className={styles.footer}>
          <button className={styles.logoutBtn} title="Logout">
            <LogOut className={styles.icon} />
            {isOpen && <span className={styles.label}>Logout</span>}
          </button>
        </div>
      </div>


     {/* Main Content */}
      <div style={{ flex: 1, padding: '2rem', backgroundColor: '#f0f4f2' }}>
        <Outlet />
      </div>
    </div>
  );
}

