import { format } from "date-fns";

// Elements

const datePickerButton = document.querySelector(".date-picker-button");
const dateBoard = document.querySelector(".date-picker");
const dateButtons = document.querySelectorAll(".date");
const fullDate = document.querySelector(".current-month");

// Events

datePickerButton.addEventListener("click", () => {
  dateBoard.classList.toggle("show");
});

// Functions

function setDate(date) {
  datePickerButton.innerText = format(new Date(date), "PPP");
}
