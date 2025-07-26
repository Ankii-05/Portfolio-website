// ********Typing animation ******//
var typed = new Typed(".typing", {
    strings: [
        "Web Developer",
        "Frontend Developer",
        "Web Designer",
        "Backend Developer",
        "Full Stack Developer",
    ],
    typeSpeed: 100,
    backSpeed: 70,
    loop: true,
});

// **************Script for Portfolio Navigation *************************//

// ASIDE Navigation
const nav = document.querySelector(".nav"),
    navList = document.querySelectorAll(".nav li"),
    totalNavList = navList.length,
    allSections = document.querySelectorAll(".section"),
    totalSections = allSections.length;

// Navigation click handler
for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");

    a.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default anchor behavior

        // Remove 'active' from all nav links
        for (let j = 0; j < totalNavList; j++) {
            navList[j].querySelector("a").classList.remove("active");
        }

        // Add 'active' to clicked nav link
        this.classList.add("active");

        // Show the corresponding section
        showSection(this);

        // Hide aside on mobile after clicking nav item
        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    });
}

function showSection(element) {
    // Remove 'active' from all sections
    for (let i = 0; i < totalSections; i++) {
        allSections[i].classList.remove("active");
    }

    // Get the target section ID from href
    const target = element.getAttribute("href").split("#")[1];

    // Add 'active' to the target section
    const targetSection = document.querySelector("#" + target);
    if (targetSection) {
        targetSection.classList.add("active");
    }
}

// Update nav on section change for hire me buttons
function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (
            target ===
            navList[i].querySelector("a").getAttribute("href").split("#")[1]
        ) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

// Handle hire me buttons
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("hire-me")) {
        e.preventDefault();
        const element = e.target;
        showSection(element);
        updateNav(element);

        // Hide aside on mobile
        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    }
});

// Mobile Navigation Toggle
const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
});

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for (let i = 0; i < totalSections; i++) {
        allSections[i].classList.toggle("open");
    }
}

// Contact Form Functionality
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.querySelector(".contact-form");
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    // Add form submission handler
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[placeholder="Name"]').value;
        const email = this.querySelector('input[placeholder="Email"]').value;
        const subject = this.querySelector('input[placeholder="Subject"]').value;
        const message = this.querySelector('textarea[placeholder="Message"]').value;

        // Validate form
        if (!name || !email || !subject || !message) {
            alert("कृपया सभी फ़ील्ड भरें / Please fill all fields");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return;
        }

        // Disable submit button and show loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Sending...";

        // Create mailto link
        const mailtoLink = `mailto:ankitkushwah6195@gmail.com?subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;

        // Try to open mailto link
        try {
            window.location.href = mailtoLink;

            // Show success message
            setTimeout(() => {
                alert("आपका संदेश भेजा गया है! / Your message has been sent!");

                // Reset form
                this.reset();

                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = "Send Message";
            }, 1000);
        } catch (error) {
            // Fallback - copy email details to clipboard
            const emailContent = `To: ankitkushwah6195@gmail.com\nSubject: ${subject}\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

            navigator.clipboard
                .writeText(emailContent)
                .then(() => {
                    alert("/ Email details copied to clipboard");
                })
                .catch(() => {
                    alert("ankitkushwah6195@gmail.com");
                });

            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Send Message";
        }
    });
});

// Smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// Add loading animation
window.addEventListener("load", function () {
    document.body.classList.add("loaded");
});

// Portfolio item hover effects
document.addEventListener("DOMContentLoaded", function () {
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    portfolioItems.forEach((item) => {
        item.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-10px)";
            this.style.transition = "all 0.3s ease";
        });

        item.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0)";
        });
    });
});

// Service items hover effects
document.addEventListener("DOMContentLoaded", function () {
    const serviceItems = document.querySelectorAll(".service-item");

    serviceItems.forEach((item) => {
        item.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-5px)";
            this.style.transition = "all 0.3s ease";
        });

        item.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0)";
        });
    });
});

function loadMoreProjects() {
    const moreProjects = `
    //   <div class="portfolio-item padd-15">
    //     <div class="portfolio-item-inner shadow-dark">
    //       <div class="portfolio-img">
    //         <img src="./images/Projects/todo.png" alt="">
    //         <div class="portfolio-info">
    //           <h4>ToDo App</h4>
    //           <p>To-do list with add/delete functionality.</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div class="portfolio-item padd-15">
    //     <div class="portfolio-item-inner shadow-dark">
    //       <div class="portfolio-img">
    //         <img src="./images/Projects/weather.png" alt="">
    //         <div class="portfolio-info">
    //           <h4>Weather App</h4>
    //           <p>API-based live weather viewer.</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div class="portfolio-item padd-15">
    //     <div class="portfolio-item-inner shadow-dark">
    //       <div class="portfolio-img">
    //         <img src="./images/Projects/notes.png" alt="">
    //         <div class="portfolio-info">
    //           <h4>Notes App</h4>
    //           <p>Sticky notes with localStorage.</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // `;
    document
        .getElementById("portfolio-items")
        .insertAdjacentHTML("beforeend", moreProjects);
}
