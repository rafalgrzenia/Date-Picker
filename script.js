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

dateButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    const BoardDate = fullDate.innerText;
    const day = e.target.innerText;
    const month = format(new Date(BoardDate), "M");
    const year = format(new Date(BoardDate), "Y");
    const date = `${year},${month},${day}`;
    setDate(date);
    dateBoard.classList.toggle("show");
  })
);

// Functions

function setDate(date) {
  datePickerButton.innerText = format(new Date(date), "PPP");
}
