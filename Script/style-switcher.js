// ********Toggle Style Switcher ********* //
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");

styleSwitcherToggle.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
});

// Hide style switcher on scroll
window.addEventListener("scroll", () => {
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
});

// ********* Theme Colors ********** //
const alternateStyle = document.querySelectorAll(".alternative-style");

function setActiveStyle(color) {
    alternateStyle.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled"); 
        } else {
            style.setAttribute("disabled", "true");
        }
    });
    
    // Store selected color in localStorage for persistence
    try {
        localStorage.setItem("selectedColor", color);
    } catch(e) {
        // localStorage not available, continue without storing
    }
}

// Load saved color theme on page load
window.addEventListener("load", () => {
    try {
        const savedColor = localStorage.getItem("selectedColor");
        if (savedColor) {
            setActiveStyle(savedColor);
        }
    } catch(e) {
        // localStorage not available, use default
    }
});

// ******** Theme Light and Dark mode ***********//
const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("dark");
    
    // Store theme preference
    try {
        const isDark = document.body.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch(e) {
        // localStorage not available, continue without storing
    }
});

// Load saved theme on page load
window.addEventListener("load", () => {
    try {
        const savedTheme = localStorage.getItem("theme");
        
        if (savedTheme === "light") {
            document.body.classList.remove("dark");
            dayNight.querySelector("i").classList.add("fa-moon");
            dayNight.querySelector("i").classList.remove("fa-sun");
        } else {
            // Default is dark or saved theme is dark
            if (!document.body.classList.contains("dark")) {
                document.body.classList.add("dark");
            }
            dayNight.querySelector("i").classList.add("fa-sun");
            dayNight.querySelector("i").classList.remove("fa-moon");
        }
    } catch(e) {
        // localStorage not available, use default behavior
        if (document.body.classList.contains("dark")) {
            dayNight.querySelector("i").classList.add("fa-sun");
        } else {
            dayNight.querySelector("i").classList.add("fa-moon");
        }
    }
});

// Close style switcher when clicking outside
document.addEventListener("click", (e) => {
    const styleSwitcher = document.querySelector(".style-switcher");
    const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");
    
    if (!styleSwitcher.contains(e.target) && !styleSwitcherToggler.contains(e.target)) {
        styleSwitcher.classList.remove("open");
    }
});

// Add smooth transitions for theme switching
document.addEventListener("DOMContentLoaded", function() {
    const body = document.body;
    body.style.transition = "background-color 0.3s ease, color 0.3s ease";
    
    // Add transition to all elements that change with theme
    const elements = document.querySelectorAll("*");
    elements.forEach(el => {
        el.style.transition = "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease";
    });
});