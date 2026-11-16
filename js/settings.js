const settingsButton = doc.querySelector("button.settings");
const settings = doc.querySelector("#settings");

settingsButton.addEventListener("click", e => {
    settingsButton.classList.toggle("active");
    settings.classList.toggle("active");
});