import css from './DetailsCar.module.css'


export default function DetailsCar( { car }) {

const accessoriesAndFunctionalities = car.accessories.concat(car.functionalities)


console.log("car", car);
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
            <span className={css.inlineBlock}>{formatAddress(car.address)}</span>
            <span>Mileage: {formatMileage(car.mileage)}</span>
          </p>

          <h2 className={css.price}> ${car.rentalPrice}</h2>
          <p>{car.description}</p>
        </div>


        <h3 className={css.subtitle}>Rental Conditions:</h3>
          <ul className={css.desc}>
            {car.rentalConditions.map((condition, count) => (
              <li key={count}> {condition}</li>
            ))}
          </ul>

        <h3 className={css.subtitle}>Car Specifications:</h3>
        <div className={css.textBlock}>
            <p className={css.text}>Year: {car.year}</p>
            <p className={css.text}>Type: {car.type}</p>
            <p className={css.text}>Fuel Consumption: {car.fuelConsumption}</p>
            <p className={css.text}>Engine Size: {car.engineSize}</p>
        </div>

        <h3 className={css.subtitle}>Accessories and functionalities:</h3>
        <ul className={css.desc}>
            {accessoriesAndFunctionalities.map((item, count) => (
              <li key={count}> {item}</li>
            ))}
        </ul>
    </div>
)
};