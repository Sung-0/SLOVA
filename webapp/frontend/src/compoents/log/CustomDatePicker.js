import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CustomDatePicker.css";

const CustomDatePicker = ({ selected, onChange, className }) => {

  return (
    <DatePicker
      showIcon
      selected={selected}
      onChange={onChange}
      calendarStartDay={0} // 일요일 시작
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 48 48"
        >
          <mask id="ipSApplication0">
            <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
              <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
              <path
                fill="#fff"
                d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
              ></path>
            </g>
          </mask>
          <path
            fill="currentColor"
            d="M0 0h48v48H0z"
            mask="url(#ipSApplication0)"
          ></path>
        </svg>
      }
      // 한 달만 보이도록 강제 제한 (리액트 데이트피커 기본은 한 달만 보여줌)
      monthsShown={1}
      inline={false}
      popperPlacement="bottom-start"
      calendarClassName="custom-calendar"
      dayClassName={(date) =>
        selected?.toDateString() === date.toDateString()
          ? "custom-day selected-day"
          : "custom-day"
      }
      className={className}
    />
  );
};

export default CustomDatePicker;
