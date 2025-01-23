// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Função para verificar a rolagem da página
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".nav-links");

  if (window.scrollY > 0) {
    navbar.classList.add("transparent");
  } else {
    navbar.classList.remove("transparent");
  }
});

// Projects carousel
const projectsData = [
    {
        title: "Breaking Cat",
        description:
          "Esse site está em desenvolvimento com o intuito de ajudar alunos de química de todas idades utilizando IA para proporcionar um melhor aprendizado",
        image: "./image.png",
        github: "https://github.com/MatheusBRezende/confirmacao-presenca",
      },

];

const carousel = document.querySelector(".projects-carousel");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

// Populate projects
projectsData.forEach((project) => {
  const projectCard = document.createElement("div");
  projectCard.className = "project-card";
  projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-links">
            <a href="${project.github}" class="project-link"><i class="bi bi-github"></i> GitHub</a>
        </div>
    `;
  carousel.appendChild(projectCard);
});

// Carousel navigation
let scrollPosition = 0;
const cardWidth = 300 + 32; // card width + gap

prevBtn.addEventListener("click", () => {
  scrollPosition = Math.max(scrollPosition - cardWidth, 0);
  carousel.scrollTo({
    left: scrollPosition,
    behavior: "smooth",
  });
});

nextBtn.addEventListener("click", () => {
  scrollPosition = Math.min(
    scrollPosition + cardWidth,
    carousel.scrollWidth - carousel.clientWidth
  );
  carousel.scrollTo({
    left: scrollPosition,
    behavior: "smooth",
  });
});

// Form submission
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Add your form submission logic here
  alert("Mensagem enviada com sucesso!");
  contactForm.reset();
});

// Intersection Observer for animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

document
  .querySelectorAll(".card, .project-card, .timeline-item")
  .forEach((el) => {
    observer.observe(el);
  });

// Get the track element
const track = document.querySelector(".skills-track");

// Clone the skills for a seamless loop
function duplicateSkills() {
  const skills = track.innerHTML;
  track.innerHTML = skills + skills;
}

// Check if we need to reset the animation
function checkScroll() {
  if (track.offsetWidth - Math.abs(track.scrollLeft) <= 0) {
    track.scrollLeft = 0;
  }
}

// Initialize
duplicateSkills();
setInterval(checkScroll, 1000);
