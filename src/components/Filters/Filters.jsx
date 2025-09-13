import { useSelector, useDispatch } from 'react-redux';
import { selectFilters } from '../../redux/filters/selectors.js';
import {
  setBrand,
  setPrice,
  setMileageFrom,
  setMileageTo,
} from '../../redux/filters/slice.js';
import { resetCars, setPage } from '../../redux/cars/slice.js';
import css from './Filters.module.css';
import { getBrandCar } from '../../services/carService.jsx';
import { useEffect, useState } from 'react';

export default function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  console.log('filters:', filters);


  const [isLoading, setIsLoading] = useState(false);
  const [allBrands, setAllBrands] = useState([]);

  // Local form state — do not dispatch on every change
  const [localBrand, setLocalBrand] = useState(filters.brand ?? '');
  const [localPrice, setLocalPrice] = useState(filters.rentalPrice ?? '');
  const [localMileageFrom, setLocalMileageFrom] = useState(
    filters.minMileage ?? ''
  );
  const [localMileageTo, setLocalMileageTo] = useState(filters.maxMileage ?? '');

  const priceOptions = [30, 40, 50, 60, 70, 80];

  // Keep local inputs in sync if filters in the store change externally
  useEffect(() => {
    setLocalBrand(filters.brand ?? '');
    setLocalPrice(filters.rentalPrice ?? '');
    setLocalMileageFrom(filters.minMileage ?? '');
    setLocalMileageTo(filters.maxMileage ?? '');
  }, [filters]);

  useEffect(() => {
    const getAllBrands = async () => {
      setIsLoading(true);
      try {
        const brands = await getBrandCar();
        setAllBrands(brands);
      } catch (error) {
        console.error('Error fetching brands:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllBrands();
  }, []);

  // Local change handlers
  const handleBrandChange = (e) => {
    setLocalBrand(e.target.value);
  };

  const handlePriceChange = (e) => {
    setLocalPrice(e.target.value);
  };

  const handleMileageFromChange = (e) => {
    setLocalMileageFrom(e.target.value);
  };

  const handleMileageToChange = (e) => {
    setLocalMileageTo(e.target.value);
  };

  // Submit: write local values to Redux and trigger search (reset cars + set page)
  const handleSearch = (e) => {
    e.preventDefault();

    dispatch(setBrand(localBrand || null));
    dispatch(setPrice(localPrice || null));

    const from = localMileageFrom !== '' ? Number(localMileageFrom) : null;
    const to = localMileageTo !== '' ? Number(localMileageTo) : null;

    dispatch(setMileageFrom(from));
    dispatch(setMileageTo(to));

    dispatch(resetCars());
    dispatch(setPage(1));
  };

  return (
    <form className={css.filters} onSubmit={handleSearch} noValidate>
      <div className={css.filterBox}>
        <label className={css.label} htmlFor="brand">
          Car brand
        </label>
        <select id="brand" className={css.select} value={localBrand} onChange={handleBrandChange}>
          <option value="">Choose a brand</option>
          {allBrands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className={css.filterBox}>
        <label className={css.label} htmlFor="price">
          Price / 1 hour
        </label>
        <div className={css.selectWrapper}>
          <select
            id="price"
            className={css.select}
            value={localPrice}
            onChange={handlePriceChange}
            required
          >
            <option value="">Choose a price</option>
            {priceOptions.map((p) => (
              <option key={p} value={String(p)}>{String(p)}</option>
            ))}
          </select>
          <span className={css.prefix}>To $</span>
        </div>
      </div>

      <div className={css.filterBox}>
        <label className={css.label}>Car mileage / km</label>
        <div className={css.inputGroup}>
          <input
            type="number"
            placeholder="From"
            className={css.input}
            value={localMileageFrom}
            onChange={handleMileageFromChange}
            min={0}
          />
          <input
            type="number"
            placeholder="To"
            className={css.input}
            value={localMileageTo}
            onChange={handleMileageToChange}
            min={0}
          />
        </div>
      </div>

      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
}