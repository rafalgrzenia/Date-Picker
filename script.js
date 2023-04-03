// Elements

const dateButton = document.querySelector(".date-picker-button");
const datePicker = document.querySelector(".date-picker");


// Events

dateButton.addEventListener("click", () => {
    datePicker.classList.toggle("show");
})