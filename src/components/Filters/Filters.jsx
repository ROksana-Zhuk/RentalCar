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
import { useEffect, useState, useRef } from 'react';
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

  // UI state for whether each select's options are open (used to rotate the left arrow)
  const [open, setOpen] = useState({ brand: false, price: false });

  // Simple helper: when a select receives focus/opened we set open=true and mark it as justOpened
  // for a short time so the subsequent click that triggered the focus doesn't immediately toggle it off.
  const justOpened = useRef({ brand: false, price: false });
  const closeTimeouts = useRef({ brand: null, price: null });
  const brandWrapperRef = useRef(null);
  const priceWrapperRef = useRef(null);

  const clearClose = (key) => {
    const t = closeTimeouts.current[key];
    if (t) {
      clearTimeout(t);
      closeTimeouts.current[key] = null;
    }
  };

  const setOpenTemporarily = (key) => {
    // clear any scheduled close
    clearClose(key);
    setOpen((s) => ({ ...s, [key]: true }));
    justOpened.current[key] = true;
    // keep the 'just opened' window a bit longer to ignore the opening click
    setTimeout(() => {
      justOpened.current[key] = false;
    }, 500);
  };

  const closeSelect = (key, immediate = false) => {
    clearClose(key);
    if (immediate) {
      setOpen((s) => ({ ...s, [key]: false }));
      return;
    }
    // delay closing slightly to avoid cases where blur fires when native options appear
    // increase delay so arrow remains rotated while native dropdown is visible
    closeTimeouts.current[key] = setTimeout(() => {
      setOpen((s) => ({ ...s, [key]: false }));
      closeTimeouts.current[key] = null;
    }, 600);
  };

  useEffect(() => {
    const handler = (e) => {
      if (open.brand && brandWrapperRef.current && !brandWrapperRef.current.contains(e.target)) {
        closeSelect('brand', true);
      }
      if (open.price && priceWrapperRef.current && !priceWrapperRef.current.contains(e.target)) {
        closeSelect('price', true);
      }
    };

    if (open.brand || open.price) {
      document.addEventListener('mousedown', handler);
      document.addEventListener('touchstart', handler);
      return () => {
        document.removeEventListener('mousedown', handler);
        document.removeEventListener('touchstart', handler);
      };
    }
    return undefined;
  }, [open.brand, open.price]);

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
        <div className={css.selectWrapper} ref={brandWrapperRef}>
          <select
            id="brand"
            name="brand"
            className={css.select}
            value={form.brand}
            onChange={(e) => {
              handleChange(e);
              // selecting a value closes the native options list in most browsers
              closeSelect('brand', true);
            }}
            onMouseDown={() => setOpenTemporarily('brand')}
            onFocus={() => setOpenTemporarily('brand')}
            onBlur={() => closeSelect('brand', !justOpened.current.brand)}
            onClick={(e) => {
              // If the select has just been opened via focus (the opening click), ignore that click.
              if (justOpened.current.brand) return;
              setOpen((s) => ({ ...s, brand: !s.brand }));
            }}
            onKeyDown={(e) => {
              // open-on-key for keyboard users (Space / ArrowDown)
              if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'ArrowDown') setOpenTemporarily('brand');
            }}
          >
            <option value="">Choose a brand</option>
            {allBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <span className={`${css.selectArrow} ${open.brand ? css.selectArrowOpen : ''}`} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>

      <div className={css.filterBox}>
        <label className={css.label} htmlFor="price">
          Price / 1 hour
        </label>
        <div className={`${css.selectWrapper} ${css.selectPadding}`} ref={priceWrapperRef}>
          <select
            id="price"
            name="rentalPrice"
            className={css.select}
            value={form.rentalPrice}
            onChange={(e) => {
              handleChange(e);
              closeSelect('price', true);
            }}
            onMouseDown={() => setOpenTemporarily('price')}
            onFocus={() => setOpenTemporarily('price')}
            onBlur={() => closeSelect('price', !justOpened.current.price)}
            onClick={(e) => {
              if (justOpened.current.price) return;
              setOpen((s) => ({ ...s, price: !s.price }));
            }}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'ArrowDown') setOpenTemporarily('price');
            }}
            required
          >
            <option value="">Choose a price</option>
            {priceOptions.map((p) => (
              <option key={p} value={String(p)}>{String(p)}</option>
            ))}
          </select>
          <span className={`${css.selectArrow} ${open.price ? css.selectArrowOpen : ''}`} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
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