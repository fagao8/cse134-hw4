const theme = document.getElementById("themeColor");
const dark = document.getElementById("dark-mode");
const light =  document.getElementById("light-mode");
const root = document.documentElement;
const isDarkMode = localStorage.getItem("darkMode")
const h1Elem = document.querySelector("h1");
var canvas = document.getElementById("myCanvas")
if (canvas) {
    var ctx = canvas.getContext("2d");
}
const themePicker = document.getElementById("theme-picker");
const popupButton = document.getElementById("popup");
const popupWindow = document.getElementById("custom-theme");
const submitButton = document.querySelector("button");
const themeColor =  localStorage.getItem("themeColor")
const bgColor =  localStorage.getItem("bgColor")
const textColor =  localStorage.getItem("textColor")
const fontFamily =  localStorage.getItem("font")
const bg = document.getElementById("bgColor");
const textElem = document.getElementById("textColor");
const font = document.getElementById("fontSet");
const reset = document.getElementById("reset");
const sectionHeader = document.querySelector("section:nth-of-type(odd) h2")

const colorPicker = document.querySelectorAll(".color")

var bgBackup = "";

themePicker.style.display = "flex";

if (isDarkMode == null) {
    // follow system if first use
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        darkMode();
    }
    else {
        lightMode();
        if (themeColor) {
            changeThemeColor(themeColor, false)
        }
        
        if (bgColor) {
            changeBgColor(bgColor)
        }
        
        if (textColor) {
            changeTextColor(textColor)
        }
    }
}
else if (isDarkMode === "true") {
    darkMode();
}
else {
    lightMode();
    if (themeColor) {
        changeThemeColor(themeColor, false)
    }
    
    if (bgColor) {
        changeBgColor(bgColor)
    }
    
    if (textColor) {
        changeTextColor(textColor)
    }
}

if (fontFamily) {
    font.value = fontFamily;
    root.style.setProperty("--font", fontFamily)
}
else {
    localStorage.setItem("font", "Open Sans")
}

dark.addEventListener("click", darkMode)
light.addEventListener("click", (e) => {
    lightMode()
    if (localStorage.getItem("themeColor")) {
        changeThemeColor(localStorage.getItem("themeColor"), false)
    }

    if (localStorage.getItem("bgColor")) {
        changeBgColor(localStorage.getItem("bgColor"))
    }

    if (localStorage.getItem("textColor")) {
        textElem.value = localStorage.getItem("textColor")
        if (localStorage.getItem("textColor") != "auto") {
            root.style.setProperty("--text-color", localStorage.getItem("textColor"))
        }
    }
    
    if (localStorage.getItem("fontSet")) {
        font.value = localStorage.getItem("fontSet");
        root.style.setProperty("--font", localStorage.getItem("fontSet"))
    }
})


function darkMode() {
    localStorage.setItem("darkMode", true);
    dark.style.display = "none";
    light.style.display = "block";
    root.style.setProperty("--primary-color", "#1E1E1E");
    root.style.setProperty("--dark-primary-color", "#CECECE");
    root.style.setProperty("--secondary-color", "#232527");
    root.style.setProperty("--background-color", "#1E1E1E");
    root.style.setProperty("--nav-bar-color", "#3E3E3E");
    root.style.setProperty("--text-color", "#EEEEEE");
    h1Elem.style.color = getComputedStyle(root).getPropertyValue("--dark-primary-color");
    h1Elem.style.background = "none";
    h1Elem.style.backgroundColor = "#151515";
    // theme.value = "#1E1E1E";
    if (canvas) {
        ctx.fillStyle = "#EEEEEE";
    }
    if (submitButton) {
        submitButton.style.color = getComputedStyle(root).getPropertyValue("--dark-primary-color");
    }
    sectionHeader.style.color = "#CECECE"
    colorPicker.forEach(picker => {
        picker.style.display = "none";
    });
}

function darkSuppress() {
    alert("Please customize theme in light mode!")
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
    // theme.value = "#006A96"
    h1Elem.style.background = "linear-gradient(120deg, var(--primary-color, #006A96), var(--dark-primary-color, #182B49))";
    h1Elem.style.color = getComputedStyle(root).getPropertyValue("--secondary-color");
    h1Elem.style.backgroundSize = "200% 200%"
    if (canvas) {
        ctx.fillStyle = "black";
    }
    if (submitButton) {
        submitButton.style.color = getComputedStyle(root).getPropertyValue("--secondary-color");
    }
    if (sectionHeader) {
        sectionHeader.style.color = "#182B49"
    }
    colorPicker.forEach(picker => {
        picker.style.display = "flex";
    });
}

document.addEventListener("click", popupAction);

function popupAction(e) {
    if (!popupWindow.contains(e.target) && popupWindow.style.display === "flex") {
        popupWindow.style.display = "none";
        e.preventDefault();
    }
    else if (e.target === popup) {
        popupWindow.style.display = "flex";
    }
}

theme.addEventListener("change", e => {changeThemeColor(e.target.value, true)})

function changeThemeColor(color, storeBg) {
    localStorage.setItem("themeColor", color)
    root.style.setProperty("--primary-color", color);
    var r = parseInt(color.substring(1, 3), 16);
    var g = parseInt(color.substring(3, 5), 16);
    var b = parseInt(color.substring(5, 7), 16);
    let ratio = 0.2
    const whiteR = Math.round((1 - ratio) * 255 + ratio * r);
    const whiteG = Math.round((1 - ratio) * 255 + ratio * g);
    const whiteB = Math.round((1 - ratio) * 255 + ratio * b);
    const maxColor = rgbToHex(whiteR, whiteG, whiteB)
    const blackR = Math.round(ratio * r);
    const blackG = Math.round(ratio * g);
    const blackB = Math.round(ratio * b);
    const minColor = rgbToHex(blackR, blackG, blackB)
    root.style.setProperty("--dark-primary-color", minColor);
    root.style.setProperty("--secondary-color", maxColor);
    if (storeBg) {
        localStorage.setItem("bgColor", maxColor)
    }
    root.style.setProperty("--background-color", "white");
    root.style.setProperty("--nav-bar-color", "#EEEEEE");
    if (!localStorage.getItem("textColor") || localStorage.getItem("textColor") === "auto") {
        root.style.setProperty("--text-color", "black");
        if (sectionHeader) {
            sectionHeader.style.color = minColor;
        }
    }
    else {
        if (sectionHeader) {
            sectionHeader.style.color = localStorage.getItem("textColor") == "black" ? minColor : maxColor
        }
    }
    bg.value = maxColor;
    theme.value = color;
    if (canvas) {
        ctx.fillStyle = "black";
    }
    bgBackup = maxColor
}

bg.addEventListener("change", e => {changeBgColor(e.target.value)})

function changeBgColor(color) {
    localStorage.setItem("bgColor", color)
    root.style.setProperty("--secondary-color", color);
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    let contrastColor = getContrastColor(color)
    if (!localStorage.getItem("textColor") || localStorage.getItem("textColor") === "auto") {
        root.style.setProperty("--text-color", contrastColor)
        if (contrastColor != "black") {
            if (sectionHeader) {
                sectionHeader.style.color = bgBackup
            }
        }
        else {
            if (sectionHeader) {
                sectionHeader.style.color = getComputedStyle(root).getPropertyValue("--dark-primary-color");
            }
        }
    }
    else {
        if (sectionHeader) {
            sectionHeader.style.color = localStorage.getItem("textColor") == "black" ? getComputedStyle(root).getPropertyValue("--dark-primary-color") : bgBackup
        }
    }
    let similarColor = contrastColor == "black" ? "white" : "black"
    let grayColor = contrastColor == "black" ? "#EEEEEE" : "#3E3E3E"
    root.style.setProperty("--background-color", similarColor);
    root.style.setProperty("--nav-bar-color", grayColor);
    bg.value = color
    if (canvas) {
        ctx.fillStyle = contrastColor;
    }
}

font.addEventListener("change", e => {
    localStorage.setItem("font", e.target.value)
    root.style.setProperty("--font", e.target.value)
})

textElem.addEventListener("change", (e) => {changeTextColor(e.target.value)})

function changeTextColor(option) {
    localStorage.setItem("textColor", option)
    textElem.value = option
    if (option == "auto") {
        let color = getComputedStyle(root).getPropertyValue("--secondary-color");
        let contrastColor = getContrastColor(color)
        root.style.setProperty("--text-color", contrastColor)
        if (canvas) {
            ctx.fillStyle = contrastColor;
        }
        if (sectionHeader) {
            if (contrastColor != "black") {
                sectionHeader.style.color = bgBackup
            }
            else {
                sectionHeader.style.color = getComputedStyle(root).getPropertyValue("--dark-primary-color");
            }
        }
    }
    else {
        root.style.setProperty("--text-color", option)
        if (canvas) {
            ctx.fillStyle = option;
        }
        if (sectionHeader) {
            if (option != "black") {
                sectionHeader.style.color = bgBackup
            }
            else {
                sectionHeader.style.color = getComputedStyle(root).getPropertyValue("--dark-primary-color");
            }      
        }
    }
}

function getContrastColor(hexColor) {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "black" : "#EEEEEE";
}

function rgbToHex(r, g, b) {
    const hex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
    return `#${hex}`;
}

reset.addEventListener("click", (e) => {
    localStorage.removeItem("darkMode");
    localStorage.removeItem("themeColor");
    localStorage.removeItem("bgColor");
    localStorage.removeItem("textColor");
    localStorage.removeItem("font");
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        darkMode();
    }
    else {
        lightMode();
    }
    textElem.value = "auto";
    font.value = "Open Sans";
    theme.value = getComputedStyle(root).getPropertyValue("--primary-color");
    bg.value = getComputedStyle(root).getPropertyValue("--secondary-color");
})