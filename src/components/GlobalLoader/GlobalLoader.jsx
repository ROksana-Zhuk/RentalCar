import css from './GlobalLoader.module.css';

export default function GlobalLoader() {
  return (
    <div className={css.overlay} role="status" aria-live="polite">
      <div className={css.scene}>
        <div className={css.road} />
        <div className={css.car} aria-hidden="true">
          <div className={css.body} />
          <div className={css.wheel} />
          <div className={css.wheel} />
        </div>
      </div>
    </div>
  );
}
