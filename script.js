import { format, formatDistance, formatRelative, set, subDays } from "date-fns";

// Elements

const datePickerButton = document.querySelector(".date-picker-button");
const dateBoard = document.querySelector(".date-picker");
const dateButtons = document.querySelectorAll(".date");
const fullDate = document.querySelector(".current-month");

// Events

dateButton.addEventListener("click", () => {
    datePicker.classList.toggle("show");
})