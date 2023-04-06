// Libraries

import {
  format,
  subMonths,
  addMonths,
  setDate,
  lightFormat,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";

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
const nextMonthButton = document.querySelector(".next-month-button");
const datePickerGrid = document.querySelector(".date-picker-grid-dates");

let currentDate = new Date();

// Functions

function setupDates() {
  const firstWeekStart = startOfWeek(startOfMonth(currentDate));
  const lastWeekEnd = endOfWeek(endOfMonth(currentDate));
  const dates = eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd });
  datePickerGrid.innerHTML = "";

  dates.forEach((date) => {
    const dateElement = document.createElement("button");
    dateElement.classList.add("date");
    dateElement.innerText = date.getDate();
    datePickerGrid.append(dateElement);
  });
}

function setCurrentDate(date) {
  datePickerButton.innerText = format(date, "MMMM do, yyyy");
  setupDates();
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

function compareDates(firstDate, secondDate) {
  if (firstDate === secondDate) {
    selectCurrentDay(new Date());
  } else {
    clearSelectedDays();
  }
}

function classToggle(className) {
  dateBoard.classList.toggle(className);
}

// Function Calls

selectCurrentDay(currentDate);
setMonth(currentDate);
setCurrentDate(currentDate);

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
  const currentMonthDate = lightFormat(new Date(), "MMMM-yyyy");
  const previousMonthDate = lightFormat(currentDate, "MMMM-yyyy");
  compareDates(currentMonthDate, previousMonthDate);
  setupDates();
  setMonth(currentDate);
});

nextMonthButton.addEventListener("click", () => {
  currentDate = addMonths(currentDate, 1);
  const currentMonthDate = lightFormat(new Date(), "MMMM-yyyy");
  const nextMonthDate = lightFormat(currentDate, "MMMM-yyyy");
  compareDates(currentMonthDate, nextMonthDate);
  setupDates();
  setMonth(currentDate);
});

currentMonthDays.forEach((button) =>
  button.addEventListener("click", (e) => {
    const buttonInnerText = e.target.innerText;
    currentDate = setDate(currentDate, buttonInnerText);
    setCurrentDate(currentDate);
    clearSelectedDays();
    classToggle("show");
  })
);

previousMonthDays.forEach((button) =>
  button.addEventListener("click", (e) => {
    const buttonInnerText = e.target.innerText;
    currentDate = setDate(currentDate, buttonInnerText);
    const previousMonth = subMonths(currentDate, 1);
    setCurrentDate(previousMonth);
    clearSelectedDays();
    classToggle("show");
  })
);
