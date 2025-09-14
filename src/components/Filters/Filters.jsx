import { useSelector, useDispatch } from 'react-redux';
import { selectFilters } from '../../redux/filters/selectors.js';
import {
  setBrand,
  setPrice,
  setMileageFrom,
  setMileageTo,
  priceOptions,
} from '../../redux/filters/slice.js';
import { resetCars, setPage } from '../../redux/cars/slice.js';
import css from './Filters.module.css';
import { getBrandCar } from '../../services/carService.jsx';
import { useEffect, useState, useRef } from 'react';
import { setLoading } from '../../redux/ui/slice.js';
import { fetchCars } from '../../redux/cars/operations.js';
import Select from 'react-select';

export default function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const carsLoading = useSelector((state) => state.cars.loading);
  const loading = carsLoading;

  const isSearchingRef = useRef(false);
  const [isSearching, setIsSearching] = useState(false);

  const [allBrands, setAllBrands] = useState([]);

  const [form, setForm] = useState({
    brand: filters.brand ?? '',
    rentalPrice: filters.rentalPrice ?? '',
    minMileage: filters.minMileage ?? '',
    maxMileage: filters.maxMileage ?? '',
  });

  useEffect(() => {
    setForm({
      brand: filters.brand ?? '',
      rentalPrice: filters.rentalPrice ?? '',
      minMileage: filters.minMileage ?? '',
      maxMileage: filters.maxMileage ?? '',
    });
  }, [filters]);

  const [open, setOpen] = useState({ brand: false, price: false });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (carsLoading || isSearchingRef.current) return;

    isSearchingRef.current = true;
    setIsSearching(true);

    dispatch(setBrand(form.brand || null));
    dispatch(setPrice(form.rentalPrice || null));

    const from = form.minMileage !== '' ? Number(form.minMileage) : null;
    const to = form.maxMileage !== '' ? Number(form.maxMileage) : null;

    dispatch(setMileageFrom(from));
    dispatch(setMileageTo(to));

    dispatch(resetCars());
    dispatch(setPage(1));

    try {
      await dispatch(fetchCars()).unwrap();
    } catch (err) {
    } finally {
      isSearchingRef.current = false;
      setIsSearching(false);
    }
  };

  const brandOptions = allBrands.map((b) => ({ value: b, label: b }));
  const priceOptionsSelect = priceOptions.map((p) => ({ value: String(p), label: String(p) }));

  const DropdownIndicator = (props) => {
    const isOpen = props.selectProps.menuIsOpen;
    return (
      <span className={`${css.selectArrow} ${isOpen ? css.selectArrowOpen : ''}`} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  };

  return (
    <form className={css.filters} onSubmit={handleSearch} noValidate>
      <div className={css.filterBox}>
        <label className={css.label} htmlFor="brand">
          Car brand
        </label>
        <div className={css.selectWrapper}>
          <Select
            inputId="brand"
            name="brand"
            classNamePrefix="react-select"
            className={`${css.select} ${css.brandSelect}`}
            options={brandOptions}
            value={form.brand ? { value: form.brand, label: form.brand } : null}
            onChange={(opt) => setForm((s) => ({ ...s, brand: opt ? opt.value : '' }))}
            onMenuOpen={() => setOpen((s) => ({ ...s, brand: true }))}
            onMenuClose={() => setOpen((s) => ({ ...s, brand: false }))}
            components={{ DropdownIndicator }}
            placeholder="Choose a brand"
            isClearable={false}
          />
        </div>
      </div>

      <div className={css.filterBox}>
        <label className={css.label} htmlFor="price">
          Price / 1 hour
        </label>
        <div className={`${css.selectWrapper} ${css.selectPadding}`}>
          <Select
            inputId="price"
            name="rentalPrice"
            classNamePrefix="react-select"
            className={`${css.select} ${css.priceSelect} ${form.rentalPrice ? css.hasPrefix : ''}`}
            options={priceOptionsSelect}
            value={form.rentalPrice ? { value: String(form.rentalPrice), label: String(form.rentalPrice) } : null}
            onChange={(opt) => setForm((s) => ({ ...s, rentalPrice: opt ? opt.value : '' }))}
            onMenuOpen={() => setOpen((s) => ({ ...s, price: true }))}
            onMenuClose={() => setOpen((s) => ({ ...s, price: false }))}
            components={{ DropdownIndicator }}
            placeholder="Choose a price"
            isClearable={false}
          />

          {form.rentalPrice ? <span className={css.prefix}>To $</span> : null}
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

      <button type="submit" className={css.button} disabled={loading || isSearching} aria-busy={loading || isSearching}>
        Search
      </button>
    </form>
  );
}