import { useNavigate } from 'react-router-dom';
import css from './CarCard.module.css';

export default function CarCard ({ car }) {

    const navigate = useNavigate();

    const formatAddress = (address) => {
        const parts = address.split(',').map(part => part.trim());
        if (parts.length >= 2) {
          const city = parts[parts.length - 2];
          const country = parts[parts.length - 1];
          return `${city} | ${country}`;
        }
        return address;
      };

    const formatMileage = (miles) => {
        const km = miles * 1.60934;
        return `${Math.round(km).toLocaleString('uk-UA')} km`;
    };


  return (
    <div>
      <img alt={car.description} src={car.img} className={css.image}/>
      <div className={css.wrapper}>
        <p className={css.title}>
        {car.brand} <span className={css.model}>{car.model}</span>, {car.year}
        </p>
        <p className={css.price}>${car.rentalPrice}</p>
      </div>

      <div className={css.info}>
        <p className={css.text}>{formatAddress(car.address)} | {car.rentalCompany} |</p>
        <p className={css.text}>{car.type} | {formatMileage(car.mileage)}</p>

        </div>
        <button className={css.button} onClick={() => navigate("/catalog/:id")}>Read more</button>

      </div>
  );
}


