import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import css from './BookingForm.module.css'
import "./datepicker.css";
import toast, { Toaster } from 'react-hot-toast';

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function BookingForm() {
  const [startDate, setStartDate] = useState(null);
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Booking successful');
    if (formRef.current) formRef.current.reset();
    setStartDate(null);
  };

  return (
    <div className={css.wrapper}>
    <Toaster position="top-right" />
    <h3 className={css.title}>Book this car now</h3>
    <p className={css.text}>Stay connected! We are always ready to help you.</p>
    <form ref={formRef} onSubmit={handleSubmit} className={css.booking_form}
    >
      <input className={css.input}
        type="text"
        name="name"
        required
        placeholder="Name*"
        minLength={2}
        maxLength={20}
      />
      <input className={css.input}
        type="email"
        name="email"
        required
        placeholder="Email*"
        pattern="^[a-zA-Z0-9_\-+]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$"
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
        rows="5"
      />

      <button type="submit" className={css.button}>Send</button>
    </form>
    </div>
  );
}