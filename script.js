import {
  format,
  getUnixTime,
  fromUnixTime,
  subMonths,
  addMonths,
} from "date-fns";

// Elements

const datePickerButton = document.querySelector(".date-picker-button");
const dateBoard = document.querySelector(".date-picker");
const dateButtons = document.querySelectorAll(".date");
const currentMonth = document.querySelector(".current-month");
const previousMonthButton = document.querySelector(".prev-month-button");
const nextMonthArrowButton = document.querySelector(".next-month-button");
let currentDate = new Date();

// Events

datePickerButton.addEventListener("click", () => {
  dateBoard.classList.toggle("show");
});

// dateButtons.forEach((button) =>
//   button.addEventListener("click", (e) => {
//     const BoardDate = fullDate.innerText;
//     const day = e.target.innerText;
//     const month = format(new Date(BoardDate), "M");
//     const year = format(new Date(BoardDate), "Y");
//     const date = `${year},${month},${day}`;
//     setDate(date);
//     dateBoard.classList.toggle("show");
//   })
// );

// Functions

function setDate(date) {
  datePickerButton.innerText = format(date, "MMMM do, yyyy");
  datePickerButton.dataset.selectedDate = getUnixTime(date);
}

function setCurrentMonth(date) {
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate);
  currentMonth.innerText = format(selectedDate, "MMMM - yyyy");
}

setDate(new Date());
setCurrentMonth(new Date());
