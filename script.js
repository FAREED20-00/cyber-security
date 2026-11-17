
document.addEventListener("DOMContentLoaded", function () {

    // Reading Progress Bar
    const progress = document.createElement("div");
    progress.className = "scroll-progress";
    document.body.appendChild(progress);

    // Dark and Light Mode
    const themeButton = document.createElement("button");
    themeButton.id = "theme-toggle";
    themeButton.textContent = "☀️ Light mode";
    document.body.appendChild(themeButton);

    const savedTheme = localStorage.getItem("cloud-security-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
    }

    function updateThemeButton() {
        const isLight =
            document.body.classList.contains("light-theme");

        themeButton.textContent =
            isLight ? "🌙 Dark mode" : "☀️ Light mode";
    }

    updateThemeButton();

    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("light-theme");

        const theme =
            document.body.classList.contains("light-theme")
                ? "light"
                : "dark";

        localStorage.setItem("cloud-security-theme", theme);
        updateThemeButton();
    });

    // Back to Top Button
    const topButton = document.createElement("button");
    topButton.id = "back-to-top";
    topButton.textContent = "↑";
    topButton.setAttribute("aria-label", "Back to top");
    document.body.appendChild(topButton);

    topButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Scroll Progress and Button Visibility
    window.addEventListener("scroll", function () {
        const scrollable =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage = scrollable > 0
            ? (window.scrollY / scrollable) * 100
            : 0;

        progress.style.width = percentage + "%";

        topButton.classList.toggle(
            "visible",
            window.scrollY > 350
        );
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (event) {
            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // Section Reveal Animation
    const sections = document.querySelectorAll("section");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries, currentObserver) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        sections.forEach(section => {
            section.classList.add("reveal");
            observer.observe(section);
        });
    }

    // Automatic Copyright Year
    const year = document.getElementById("current-year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

});
