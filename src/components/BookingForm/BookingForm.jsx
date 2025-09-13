import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import css from './BookingForm.module.css'
import "./datepicker.css";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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
        placeholder="Name*"
      />
      <input className={css.input}
        type="email"
        name="email"
        required
        placeholder="Email*"
      />

      <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Booking date"
          className={css.input}
          calendarStartDay={1}
          formatWeekDay={(day) => day.slice(0, 3)}
          renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
            <div className={css.headerCalendar}>
              <button
                type="button"
                onClick={decreaseMonth}
                className={css.customArrow}
              >
                <IoIosArrowBack color="#3470ff" size={20} />
              </button>
              <span className={css.span}>
                {date.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button
                type="button"
                onClick={increaseMonth}
                className={css.customArrow}
              >
                <IoIosArrowForward color="#3470ff" size={20} />
              </button>
            </div>
          )}
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