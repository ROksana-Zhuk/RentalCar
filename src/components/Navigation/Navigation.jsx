import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';


export default function Navigation() {



//   const buildLinkClass = ({ isActive }) =>
//     isActive ? 'nav-link active' : 'nav-link';

const buildLinkClass = ({ isActive }) =>
    isActive ? `${css["nav-link"]} ${css.active}` : css["nav-link"];

  return (
    <nav>
      <NavLink to="/" className={buildLinkClass}>Home</NavLink>
      <NavLink to="/catalog" className={buildLinkClass}>Catalog</NavLink>
    </nav>
  );
}