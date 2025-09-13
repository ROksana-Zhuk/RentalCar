import css from './DetailsCar.module.css'

import {
    BsCheckCircle,
    BsCalendar2Week,
    BsCarFront,
    BsFuelPump,
    BsGear,
} from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";

export default function DetailsCar( { car }) {

const accessoriesAndFunctionalities = car.accessories.concat(car.functionalities)


const formatAddress = (address) => {
    const parts = address.split(',').map(part => part.trim());
    if (parts.length >= 2) {
      const city = parts[parts.length - 2];
      const country = parts[parts.length - 1];
      return `${city}, ${country}`;
    }
    return address;
  };

const formatMileage = (miles) => {
    const km = miles * 1.60934;
    return `${Math.round(km).toLocaleString('uk-UA')} km`;
};

return (
    <div className={css.box}>
        <div className={css.wrapper}>
          <h2 className={css.title}>{car.brand} {car.model}, {car.year}</h2>


          <p className={css.text}>
            <IoLocationOutline />
            <span className={css.inlineBlock}>
               {formatAddress(car.address)}
            </span>
            <span>Mileage: {formatMileage(car.mileage)}</span>
          </p>

          <h2 className={css.price}> ${car.rentalPrice}</h2>
          <p>{car.description}</p>
        </div>


        <h3 className={css.subtitle}>Rental Conditions:</h3>
          <ul className={css.desc}>
            {car.rentalConditions.map((condition, count) => (
              <li key={count} className={css.item}>
                <BsCheckCircle className={css.icon} />
                <span className={css.itemText}> {condition}</span>
              </li>
            ))}
          </ul>


        <h3 className={css.subtitle}>Car Specifications:</h3>
        <div className={css.textBlock}>
            <div className={css.specItem}>
              <BsCalendar2Week className={css.icon} />
              <span className={css.specText}>Year: {car.year}</span>
            </div>
            <div className={css.specItem}>
              <BsCarFront className={css.icon} />
              <span className={css.specText}>Type: {car.type}</span>
            </div>
            <div className={css.specItem}>
              <BsFuelPump className={css.icon} />
              <span className={css.specText}>Fuel Consumption: {car.fuelConsumption}</span>
            </div>
            <div className={css.specItem}>
              <BsGear className={css.icon} />
              <span className={css.specText}>Engine Size: {car.engineSize}</span>
            </div>
        </div>

        <h3 className={css.subtitle}>Accessories and functionalities:</h3>
        <ul className={css.desc}>
            {accessoriesAndFunctionalities.map((item, count) => (
              <li key={count} className={css.item}>
                <BsCheckCircle className={css.icon} />
                <span className={css.itemText}>{item}</span>
              </li>
            ))}
        </ul>
    </div>
)
};