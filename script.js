document.querySelectorAll(".phone--button").forEach(phoneBtn => {
  phoneBtn.addEventListener("click", event => {
    event.target.previousElementSibling.classList.toggle("phone--screen-off");
  });
});
