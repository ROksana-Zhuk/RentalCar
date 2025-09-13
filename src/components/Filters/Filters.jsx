import { useSelector } from 'react-redux';
import { selectCars } from '../../redux/car/selectors.js';
import css from'./Filters.module.css';


export default function Filters() {

    const cars = useSelector(selectCars);

    return (
        <div className={css.filters}>
            <div className={css.filterBox}>
                <label className={css.label}  htmlFor="brand">Car brand</label>
                <select id="brand" className={css.select}>
                    <option>Choose a brand</option>
                    {cars.map((car) => (
                        <option key={car.id} value={car.brand}>
                            {car.brand}
                        </option>
                    ))}
                </select>
            </div>

            <div className={css.filterBox}>
                <label className={css.label} htmlFor="price">Price / 1 hour</label>
                <select id="price" className={css.select}>
                    <option>Choose a price</option>
                    {cars.map((car) => (
                        <option key={car.id} value={car.rentalPrice}>
                            {car.rentalPrice}
                        </option>
                    ))}
                </select>
            </div>

            <div className={css.filterBox}>
                <label className={css.label} >Car mileage / km</label>
                <div className={css.inputGroup}>
                    <input
                        type="number"
                        placeholder="From"
                        className={css.input}
                    />
                    <input
                        type="number"
                        placeholder="To"
                        className={css.input}
                    />
                </div>
            </div>
                <button className={css.button}>Search</button>
        </div>
    );
}