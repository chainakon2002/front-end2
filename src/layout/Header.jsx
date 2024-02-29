import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const guestNav = [
  { to: '/', text: 'Login' },
  { to: '/register', text: 'Register' },

]

const userNav = [
  { to: '/', text: 'Home' },
  { to: '/cart', text: 'cart' },
]

const adminNav = [
  { to : '/home', text: 'Home' },
  { to : '/order', text: 'Order' }
  
]

export default function Header() {
  const { user, logout } = useAuth()
  // const finalNav = user?.id ? userNav : guestNav
  const finalNav = user?.id ? user?.role === 'ADMIN' ? adminNav : userNav : guestNav;
  const navigate = useNavigate()

  const hdlLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <img src="/src/assets/DISNEY copy.png" alt=""className='h-20 w-auto mx-5 ' />
        <a className="btn btn-ghost text-xl">CS.SHOP | {user?.id ? user.username : ''}</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {finalNav.map(el => (
             <li key={el.to} className="mx-2">
             <Link to={el.to} className="text-[16px] font-semibold text-black hover:bg-gray-600 hover:text-white px-4 py-2 rounded-md transition-colors duration-300">{el.text}</Link>
           </li>
          ))}
          {user?.id && (
            <li>
              <Link to='#' className="text-[16px] font-semibold" onClick={hdlLogout}>Logout</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
