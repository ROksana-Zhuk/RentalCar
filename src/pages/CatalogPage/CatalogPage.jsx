import { useSelector, useDispatch } from "react-redux";
import { fetchCars } from "../../redux/cars/operations.js";
import { useEffect } from "react";
import Container from "../../components/Container/Container.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import CarsList from '../../components/CarsList/CarsList.jsx';
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const { page, items, totalCars, loading } = useSelector((state) => state.cars);
  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch, page, filters]);

  const handleLoadMore = () => {
    if (items.length < totalCars && !loading) {
      dispatch({ type: "cars/setPage", payload: page + 1 });
    }
  };

  return (
    <section>
      <Container>
        <Filters />
        <CarsList cars={items} loading={loading} />
        {items.length < totalCars && (
          <LoadMoreBtn onClick={handleLoadMore} disabled={loading} />
        )}
      </Container>
    </section>
  );
}