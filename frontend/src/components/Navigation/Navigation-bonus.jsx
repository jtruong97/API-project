import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='header-container'>
      <li>
        <NavLink to="/"><img className='home-logo'src='https://i.postimg.cc/yYpYM2Jh/Screenshot-2024-02-23-at-10-40-03-AM-removebg-preview.png' alt='sdv-logo'/></NavLink>
      </li>
      <div className='right-nav-bar'>
        {sessionUser && (
          <li>
            <NavLink className='create-spot-button' to='/spots/new'>Create a New Spot</NavLink>
          </li>)
        }
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </div>
    </ul>
  );
}

export default Navigation;
