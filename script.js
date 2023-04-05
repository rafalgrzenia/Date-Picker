// Libraries

import { format, subMonths, addMonths, setDate, lightFormat } from "date-fns";

// Elements

const datePickerButton = document.querySelector(".date-picker-button");
const dateBoard = document.querySelector(".date-picker");
const currentMonthDays = document.querySelectorAll(
  ".date:not(.date-picker-other-month-date)"
);
const previousMonthDays = document.querySelectorAll(
  ".date-picker-other-month-date"
);
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

function selectCurrentDay(date) {
  currentMonthDays.forEach((button) => {
    if (button.innerText === format(date, "d")) {
      button.classList.add("selected");
    }
  });
}

function clearSelectedDays() {
  const allDays = document.querySelectorAll(".date");
  allDays.forEach((button) => button.classList.remove("selected"));
}

// Function Calls

selectCurrentDay(currentDate);
setCurrentDate(currentDate);
setMonth(currentDate);

// Events

datePickerButton.addEventListener("click", () => {
  currentDate = new Date();
  clearSelectedDays();
  setCurrentDate(currentDate);
  setMonth(currentDate);
  selectCurrentDay(currentDate);
  dateBoard.classList.toggle("show");
});

previousMonthButton.addEventListener("click", () => {
  currentDate = subMonths(currentDate, 1);
  const todayMonthNumber = lightFormat(new Date(), "MMMM-yyyy");
  const previousMonthNumber = lightFormat(currentDate, "MMMM-yyyy");

  if (todayMonthNumber === previousMonthNumber) {
    selectCurrentDay(new Date());
  } else {
    clearSelectedDays();
  }
  setMonth(currentDate);
});

nextMonthArrowButton.addEventListener("click", () => {
  currentDate = addMonths(currentDate, 1);
  const todayMonthNumber = lightFormat(new Date(), "MMMM-yyyy");
  const nextMonthNumber = lightFormat(currentDate, "MMMM-yyyy");

  if (todayMonthNumber === nextMonthNumber) {
    selectCurrentDay(new Date());
  } else {
    clearSelectedDays();
  }
  setMonth(currentDate);
});

currentMonthDays.forEach((button) =>
  button.addEventListener("click", (e) => {
    const buttonInnerText = e.target.innerText;
    currentDate = setDate(currentDate, buttonInnerText);
    setCurrentDate(currentDate);
    clearSelectedDays();
    e.target.classList.add("selected");
    dateBoard.classList.toggle("show");
  })
);

previousMonthDays.forEach((button) =>
  button.addEventListener("click", (e) => {
    const buttonInnerText = e.target.innerText;
    currentDate = setDate(currentDate, buttonInnerText);
    const previousMonth = subMonths(currentDate, 1);
    setCurrentDate(previousMonth);
    clearSelectedDays();
    e.target.classList.add("selected");
    dateBoard.classList.toggle("show");
  })
);
