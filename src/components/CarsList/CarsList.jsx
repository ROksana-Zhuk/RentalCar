import { useSelector } from "react-redux";
import CarCard from "../CarCard/CarCard.jsx";
import { selectCars } from "../../redux/cars/selectors.js";
import css from './CarsList.module.css';
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";


export default function CarList() {


    const allCars = useSelector(selectCars);

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



