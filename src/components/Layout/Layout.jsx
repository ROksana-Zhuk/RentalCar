import Header from '../Header/Header.jsx';
import css from './Layout.module.css';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/ui/slice.js';
import GlobalLoader from '../GlobalLoader/GlobalLoader.jsx';

export default function Layout({ children }) {
  const isLoading = useSelector(selectIsLoading);

  return (
    <div className={css.page}>
      <Header />
      <main>
        {children}
      </main>
      {isLoading && <GlobalLoader />}
    </div>
  );
}