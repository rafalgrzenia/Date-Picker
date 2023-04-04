// Libraries

import { format, subMonths, addMonths, setDate } from "date-fns";

// Elements

const datePickerButton = document.querySelector(".date-picker-button");
const dateBoard = document.querySelector(".date-picker");
const days = document.querySelectorAll(".date");
const currentMonth = document.querySelector(".current-month");
const previousMonthButton = document.querySelector(".prev-month-button");
const nextMonthArrowButton = document.querySelector(".next-month-button");
let currentDate = new Date();

// Functions

function setCurrentDate(date) {
  datePickerButton.innerText = format(date, "MMMM do, yyyy");
}

function setMonth(selectedDate) {
  currentMonth.innerText = format(selectedDate, "MMMM - yyyy");
}

// Function Calls

setCurrentDate(currentDate);
setMonth(currentDate);

// Events

datePickerButton.addEventListener("click", () => {
  setMonth(new Date());
  dateBoard.classList.toggle("show");
});

previousMonthButton.addEventListener("click", () => {
  currentDate = subMonths(currentDate, 1);
  setMonth(currentDate);
});

nextMonthArrowButton.addEventListener("click", () => {
  currentDate = addMonths(currentDate, 1);
  setMonth(currentDate);
});

days.forEach((button) =>
  button.addEventListener("click", (e) => {
    const buttonInnerText = e.target.innerText;
    currentDate = setDate(currentDate, buttonInnerText);
    setCurrentDate(currentDate);
    dateBoard.classList.toggle("show");
  })
);
