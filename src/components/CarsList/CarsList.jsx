import { useSelector } from "react-redux";
import CarCard from "../CarCard/CarCard.jsx";
import { selectCars } from "../../redux/cars/selectors.js";
import css from './CarsList.module.css';
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";


export default function CarList() {


    const allCars = useSelector(selectCars);

    // If there are no cars, show a friendly message to the user
    if (!allCars || allCars.length === 0) {
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



