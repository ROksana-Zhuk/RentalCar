import Header from '../Header/Header.jsx';
import css from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={css.page}>
      <Header />
      <main>{children}</main>

    </div>
  );
}