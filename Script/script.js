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
        // Scroll to top of the section
        targetSection.scrollTop = 0;
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

// Contact Form Functionality with EmailJS Integration
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.querySelector(".contact-form");
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    // Add form submission handler
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form data
        const name = this.querySelector('input[placeholder="Name"]').value;
        const email = this.querySelector('input[placeholder="Email"]').value;
        const subject = this.querySelector('input[placeholder="Subject"]').value;
        const message = this.querySelector('textarea[placeholder="Message"]').value;

        // Validate form
        if (!name || !email || !subject || !message) {
            showNotification(" Please fill all fields", "error");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification("Please enter a valid email address", "error");
            return;
        }

        // Disable submit button and show loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Create mailto link as fallback
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
                showNotification(" Your message has been sent!", "success");

                // Reset form
                this.reset();

                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            }, 1000);
        } catch (error) {
            // Fallback - copy email details to clipboard
            const emailContent = `To: ankitkushwah6195@gmail.com\nSubject: ${subject}\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

            navigator.clipboard
                .writeText(emailContent)
                .then(() => {
                    showNotification("Email details copied to clipboard!", "info");
                })
                .catch(() => {
                    showNotification("Please email at: ankitkushwah6195@gmail.com", "info");
                });

            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
    });
});

// Notification System
function showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

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
        });

        item.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0)";
        });
    });
});

// Load More Projects Function - Fixed
function loadMoreProjects() {
    const portfolioContainer = document.getElementById("portfolio-items");
    const showMoreBtn = document.querySelector(".show-more-btn");
    
    if (!portfolioContainer) return;

    const moreProjects = [
        {
            img: "./images/Projects/todo.png",
            title: "ToDo App",
            desc: "To-do list with add/delete functionality."
        },
        {
            img: "./images/Projects/weather.png",
            title: "Weather App",
            desc: "API-based live weather viewer."
        },
        {
            img: "./images/Projects/notes.png",
            title: "Notes App",
            desc: "Sticky notes with local storage."
        }
    ];

    moreProjects.forEach(project => {
        const projectHTML = `
            <div class="portfolio-item padd-15" style="opacity: 0; transform: translateY(20px);">
                <div class="portfolio-item-inner shadow-dark">
                    <div class="portfolio-img">
                        <img src="${project.img}" alt="${project.title}" onerror="this.src='./images/Projects/placeholder.png'">
                        <div class="portfolio-info">
                            <h4>${project.title}</h4>
                            <p>${project.desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        portfolioContainer.insertAdjacentHTML("beforeend", projectHTML);
    });

    // Animate new items
    const newItems = portfolioContainer.querySelectorAll('.portfolio-item[style*="opacity: 0"]');
    newItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transition = "all 0.5s ease";
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
        }, index * 100);
    });

    // Hide the show more button after loading
    if (showMoreBtn) {
        showMoreBtn.style.display = "none";
    }
}

// Scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    // Get the active section
    const activeSection = document.querySelector('.section.active');
    
    if (activeSection && activeSection.scrollTop > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    const activeSection = document.querySelector('.section.active');
    if (activeSection) {
        activeSection.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// CV Download Handler
document.addEventListener("DOMContentLoaded", function() {
    const cvLink = document.querySelector('a[href*="cv"]');
    
    if (cvLink) {
        cvLink.addEventListener('click', function(e) {
            // Let the default download behavior work
            showNotification("Downloading CV...", "info");
        });
    }
});

// Progress bar animation on scroll
window.addEventListener('load', () => {
    const progressBars = document.querySelectorAll('.progress-in');
    
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                bar.style.animation = 'fillBar 2s ease-out forwards';
            }
        });
    };
    
    // Animate on load and scroll
    animateProgressBars();
    
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.addEventListener('scroll', animateProgressBars);
    }
});