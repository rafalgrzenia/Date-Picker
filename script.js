// Libraries

import {
  format,
  subMonths,
  addMonths,
  setDate,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  getMonth,
  isToday,
  getUnixTime,
  fromUnixTime,
} from "date-fns";

// Elements

const datePickerButton = document.querySelector(".date-picker-button");
const dateBoard = document.querySelector(".date-picker");
const currentMonth = document.querySelector(".current-month");
const previousMonthButton = document.querySelector(".prev-month-button");
const nextMonthButton = document.querySelector(".next-month-button");
const datePickerGrid = document.querySelector(".date-picker-grid-dates");

let currentDate = new Date();

// Functions

function setupDates() {
  const currentDateMonth = getMonth(currentDate);
  const firstWeekStart = startOfWeek(startOfMonth(currentDate));
  const lastWeekEnd = endOfWeek(endOfMonth(currentDate));
  const dates = eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd });
  datePickerGrid.innerHTML = "";

  dates.forEach((date) => {
    const selectedDayMonth = getMonth(date);
    const dateElement = document.createElement("button");
    dateElement.classList.add("date");
    dateElement.innerText = date.getDate();
    const unixTime = getUnixTime(date);
    dateElement.dataset.unixTime = unixTime;
    datePickerGrid.append(dateElement);
    if (currentDateMonth !== selectedDayMonth) {
      dateElement.classList.add("date-picker-other-month-date");
    }
  });

  const otherMonthDays = document.querySelectorAll(
    ".date-picker-other-month-date"
  );

  const currentDays = Array.from(
    document.querySelectorAll(".date:not(.date-picker-other-month-date)")
  );

  currentDays.forEach((day) => {
    const convertedDate = fromUnixTime(day.dataset.unixTime);
    if (isToday(convertedDate)) {
      day.classList.add("selected");
    }
  });

  currentDays.forEach((day) =>
    day.addEventListener("click", (e) => {
      const buttonInnerText = e.target.innerText;
      currentDate = setDate(currentDate, buttonInnerText);
      setDatePickerMonth(currentDate);
      classToggle("show");
    })
  );

  otherMonthDays.forEach((day) =>
    day.addEventListener("click", () => {
      const convertTimeStampToDate = fromUnixTime(day.dataset.unixTime);
      setDatePickerMonth(convertTimeStampToDate);
      classToggle("show");
    })
  );
}

function setDatePickerMonth(date) {
  datePickerButton.innerText = format(date, "MMMM do, yyyy");
}

function setCurrentDate(date) {
  datePickerButton.innerText = format(date, "MMMM do, yyyy");
  setupDates();
}

function setMonth(selectedDate) {
  currentMonth.innerText = format(selectedDate, "MMMM - yyyy");
}

function classToggle(className) {
  dateBoard.classList.toggle(className);
}

// Function Calls

setMonth(currentDate);
setCurrentDate(currentDate);

// Events

datePickerButton.addEventListener("click", () => {
  currentDate = new Date();
  setCurrentDate(currentDate);
  setMonth(currentDate);
  dateBoard.classList.toggle("show");
});

previousMonthButton.addEventListener("click", () => {
  currentDate = subMonths(currentDate, 1);
  setupDates();
  setMonth(currentDate);
});

nextMonthButton.addEventListener("click", () => {
  currentDate = addMonths(currentDate, 1);
  setupDates();
  setMonth(currentDate);
});
