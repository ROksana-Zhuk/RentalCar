import css from './Hero.module.css';
import heroImg from '../../images/Picture-desc@2x.jpg';
import { useNavigate } from 'react-router-dom';



export default function Hero() {

    const navigate = useNavigate();

    return (
      <section className={css.hero} style={{ backgroundImage: `url(${heroImg})` }}>
        <div className={css.overlay}>
          <h1 className={css.title}>Find your perfect rental car</h1>
          <p className={css.text}>Reliable and budget-friendly rentals for any journey</p>
          <button className={css.button}  onClick={() => navigate("/catalog")}>View Catalog</button>
        </div>
      </section>
    );
  }

