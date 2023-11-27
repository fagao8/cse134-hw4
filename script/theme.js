const theme = document.querySelector(".theme");
const dark = document.getElementById("dark-mode");
const light =  document.getElementById("light-mode");
const root = document.documentElement;
var isDarkMode = localStorage.getItem("darkMode")
const h1Elem = document.querySelector("h1");
var ctx = document.getElementById('myCanvas').getContext('2d');
if (isDarkMode == null) {
    // follow system if first use
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        darkMode();
    }
    else {
        lightMode();
    }
}
else if (isDarkMode == "true") {
    darkMode();
}
else {
    lightMode();
}

dark.addEventListener("click", darkMode)
light.addEventListener("click", lightMode)


function darkMode() {
    localStorage.setItem("darkMode", true);
    dark.style.display = "none";
    light.style.display = "block";
    root.style.setProperty("--primary-color", "#1E1E1E");
    root.style.setProperty("--dark-primary-color", "#EEEEEE");
    root.style.setProperty("--secondary-color", "#232527");
    root.style.setProperty("--background-color", "#1E1E1E");
    root.style.setProperty("--nav-bar-color", "#3E3E3E");
    root.style.setProperty("--text-color", "#EEEEEE");
    h1Elem.style.color = "white";
    h1Elem.style.background = "none";
    h1Elem.style.backgroundColor = "#151515";
    theme.value = "#1E1E1E";
    ctx.fillStyle = "#EEEEEE";
}

function lightMode() {
    localStorage.setItem("darkMode", false);
    dark.style.display = "block";
    light.style.display = "none";
    root.style.setProperty("--primary-color", "#006A96");
    root.style.setProperty("--dark-primary-color", "#182B49");
    root.style.setProperty("--secondary-color", "#F5F0E6");
    root.style.setProperty("--background-color", "white");
    root.style.setProperty("--nav-bar-color", "#EEEEEE");
    root.style.setProperty("--text-color", "black");
    theme.value = "#006A96"
    h1Elem.style.background = "linear-gradient(120deg, var(--primary-color, #006A96), var(--dark-primary-color, #182B49))";
    h1Elem.style.color = "var(--secondary-color, #F5F0E6);";
    ctx.fillStyle = "black";
}