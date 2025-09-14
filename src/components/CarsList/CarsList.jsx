import { useSelector } from "react-redux";
import CarCard from "../CarCard/CarCard.jsx";
import { selectCars } from "../../redux/cars/selectors.js";
import { selectIsLoading } from '../../redux/ui/slice.js';
import css from './CarsList.module.css';


export default function CarList() {


    const allCars = useSelector(selectCars);
    const isLoading = useSelector(selectIsLoading);

    if (!allCars || allCars.length === 0) {
        if (isLoading) {
            return null;
        }
        return (
            <div className={css.emptyContainer || ''}>
                <p className={css.emptyText || ''}>No cars found matching your search.</p>
            </div>
        );
    }

    return (
        <>
          <ul className={css.list}>
              {allCars.map((car) => (
                  <li key={car.id}>
                      <CarCard car={car} />
                  </li>
              ))}
          </ul>
        </>
          );

}



