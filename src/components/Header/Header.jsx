import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <Logo />
      <Navigation />
    </header>
  );
}