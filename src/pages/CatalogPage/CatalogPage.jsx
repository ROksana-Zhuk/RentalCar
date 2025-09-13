import { useDispatch } from "react-redux";
import CarList from "../../components/CarsList/CarsList.jsx";
import Container from "../../components/Container/Container.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import { useEffect } from "react";
import { fetchCars } from "../../redux/car/operations.js";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";



export default function CatalogPage() {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchCars());
    }, [dispatch]);


    return (
      <section>
        <Container>
          <Filters />
          <CarList/>

            <LoadMoreBtn/>
        </Container>
      </section>
    );
  }