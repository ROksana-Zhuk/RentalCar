import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import css from './BookingForm.module.css'



export default function BookingForm() {
  const [startDate, setStartDate] = useState(null);

  return (
    <div className={css.wrapper}>
    <h3 className={css.title}>Book this car now</h3>
    <p className={css.text}>Stay connected! We are always ready to help you.</p>
    <form className={css.booking_form}
    >
      <input className={css.input}
        type="text"
        name="name"
        required
        placeholder="Name"
      />
      <input className={css.input}
        type="email"
        name="email"
        required
        placeholder="Email"
      />

      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        placeholderText="Booking Date"
        className={css.input}
        calendarClassName={css.calendar}
      />

      <textarea className={css.textarea}
        name="comment"
        placeholder="Comment"
      />
      <button type="submit" className={css.button}>Send</button>
    </form>
    </div>
  );
}