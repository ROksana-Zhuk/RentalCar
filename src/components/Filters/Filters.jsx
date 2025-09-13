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
import { setLoading } from '../../redux/ui/slice.js';

// Price options can live outside the component to avoid re-creation on each render
const priceOptions = [30, 40, 50, 60, 70, 80];

export default function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const [allBrands, setAllBrands] = useState([]);

  // Consolidated local form state — do not dispatch on every change
  const [form, setForm] = useState({
    brand: filters.brand ?? '',
    rentalPrice: filters.rentalPrice ?? '',
    minMileage: filters.minMileage ?? '',
    maxMileage: filters.maxMileage ?? '',
  });

  // Keep local inputs in sync if filters in the store change externally
  useEffect(() => {
    setForm({
      brand: filters.brand ?? '',
      rentalPrice: filters.rentalPrice ?? '',
      minMileage: filters.minMileage ?? '',
      maxMileage: filters.maxMileage ?? '',
    });
  }, [filters]);

  useEffect(() => {
    const getAllBrands = async () => {
      dispatch(setLoading(true));
      try {
        const brands = await getBrandCar();
        setAllBrands(brands);
      } catch (error) {
        console.error('Error fetching brands:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    getAllBrands();
  }, [dispatch]);

  // Generic change handler for all inputs/selects
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  // Submit: write local values to Redux and trigger search (reset cars + set page)
  const handleSearch = (e) => {
    e.preventDefault();

    dispatch(setBrand(form.brand || null));
    dispatch(setPrice(form.rentalPrice || null));

    const from = form.minMileage !== '' ? Number(form.minMileage) : null;
    const to = form.maxMileage !== '' ? Number(form.maxMileage) : null;

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
        <select
          id="brand"
          name="brand"
          className={css.select}
          value={form.brand}
          onChange={handleChange}
        >
          <option value="">Choose a brand</option>
          {allBrands.map((brand) => (
            <option key={brand} value={brand}>
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
            name="rentalPrice"
            className={css.select}
            value={form.rentalPrice}
            onChange={handleChange}
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
          <div className={css.inputWrapper}>
            <span className={`${css.inputPrefix} ${css.inputPrefixFrom}`}>From</span>
            <input
              name="minMileage"
              type="number"
              className={`${css.input} ${css.inputFrom}`}
              value={form.minMileage}
              onChange={handleChange}
              min={0}
              aria-label="Minimum mileage"
            />
          </div>

          <div className={css.inputWrapper}>
            <span className={`${css.inputPrefix} ${css.inputPrefixTo}`}>To</span>
            <input
              name="maxMileage"
              type="number"
              className={`${css.inputTo} ${css.input}`}
              value={form.maxMileage}
              onChange={handleChange}
              min={0}
              aria-label="Maximum mileage"
            />
          </div>
        </div>
      </div>

      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
}