// global variables
let timeout;
const navBar = document.querySelector(".page__header");
const sections = [...document.querySelectorAll("section")];
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const headers = [...document.querySelectorAll("h2")];
const navbarList = document.getElementById("navbar__list");

// Generate nav items dynamically based on sections
const listItems = headers
  .map(
    (header, index) =>
      `<li><a href="#${sections[index].id}">${header.textContent}</a></li>`
  )
  .join("");

document.querySelector("#navbar__list").innerHTML = listItems;

// Hide the navbar after a specified delay
function hideNavBar() {
  navBar.style.top = "-60px";
}

// Show the navbar instantly
function showNavBar() {
  navBar.style.top = "0";
}

// Handle navbar visibility on scroll
window.addEventListener("scroll", () => {
  clearTimeout(timeout)
  showNavBar();
  timeout = setTimeout(hideNavBar, 10000);
});

// Active Section & link in navbar
function makeActive() {
  const navLinks = document.querySelectorAll(".navbar__menu ul li a");
  // Loop through sections to determine the active one
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const box = section.getBoundingClientRect();
    if (box.top <= 150 && box.bottom >= 150) {
      section.classList.add("active");
      navLinks[i].classList.add("active");
    } else {
      section.classList.remove("active");
      navLinks[i].classList.remove("active");
    }
  }
}

//toggle the visibility of the button based on scroll position
function toggleScrollToTopBtn() {
  if (window.scrollY > window.innerHeight) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

// scroll to the top when the button is clicked
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Collapse sections
document.querySelectorAll(".top-container button").forEach((button, index) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".collapse")[index].classList.toggle("open");
  });
});
navbarList.addEventListener("click", function (event) {
    event.preventDefault();
    const sectionId = event.target.getAttribute("href").substring(1);
    const targetSection = document.getElementById(sectionId);
    targetSection.scrollIntoView({
      behavior: "smooth",
    });
  
});

window.addEventListener("scroll", () => {
  makeActive();
  toggleScrollToTopBtn();
});
