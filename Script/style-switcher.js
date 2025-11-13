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

// Hide style switcher when scrolling inside sections
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".section");
    sections.forEach(section => {
        section.addEventListener("scroll", () => {
            if (document.querySelector(".style-switcher").classList.contains("open")) {
                document.querySelector(".style-switcher").classList.remove("open");
            }
        });
    });
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
    
    // Store selected color (no localStorage as per requirements)
    sessionStorage.setItem("selectedColor", color);
}

// Load saved color theme on page load
window.addEventListener("load", () => {
    const savedColor = sessionStorage.getItem("selectedColor");
    if (savedColor) {
        setActiveStyle(savedColor);
    }
});

// ******** Theme Light and Dark mode ***********//
const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("dark");
    
    // Store theme preference
    const isDark = document.body.classList.contains("dark");
    sessionStorage.setItem("theme", isDark ? "dark" : "light");
});

// Load saved theme on page load
window.addEventListener("load", () => {
    const savedTheme = sessionStorage.getItem("theme");
    
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
    // Prevent flash of unstyled content
    document.body.style.visibility = 'visible';
    
    // Add transition classes after load
    setTimeout(() => {
        document.body.classList.add('transitions-enabled');
    }, 100);
});