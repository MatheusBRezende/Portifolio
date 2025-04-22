// ======= MENU MOBILE =======
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// ======= TEMA ESCURO/CLARO =======
const themeToggle = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  htmlElement.classList.add("dark");
  htmlElement.classList.remove("light");
} else {
  htmlElement.classList.add("light");
  htmlElement.classList.remove("dark");
}

themeToggle.addEventListener("click", () => {
  const isDark = htmlElement.classList.contains("dark");
  htmlElement.classList.toggle("dark", !isDark);
  htmlElement.classList.toggle("light", isDark);
  localStorage.setItem("theme", isDark ? "light" : "dark");
});

// ======= EFEITO SCROLL HEADER =======
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  header.classList.toggle("scrolled", window.scrollY > 50);
});

// ======= SCROLL SUAVE =======
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute("href"));
    if (targetElement) {
      const headerHeight = document.querySelector(".header").offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  });
});

// ======= FILTRO DE PROJETOS =======
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");
    projectCards.forEach((card) => {
      const match = filter === "all" || card.getAttribute("data-category") === filter;
      card.style.display = match ? (card.classList.contains("featured") ? "grid" : "") : "none";
    });
  });
});

// ======= ANIMAÇÃO BARRAS DE SKILL =======
const animateSkillBars = () => {
  const skillLevels = document.querySelectorAll(".skill-level");
  skillLevels.forEach((level) => {
    const levelValue = level.style.getPropertyValue("--level");
    level.style.width = "0%";
    setTimeout(() => (level.style.width = levelValue), 200);
  });
};

// ======= ANIMAÇÕES AO SCROLLAR =======
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".skill-category, .project-card");
  const screenPosition = window.innerHeight / 1.2;

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    if (elementPosition < screenPosition) {
      element.classList.add("animate");
      if (element.classList.contains("skill-category")) {
        const skillLevels = element.querySelectorAll(".skill-level");
        skillLevels.forEach((level) => {
          const levelValue = level.style.getPropertyValue("--level");
          level.style.width = levelValue;
        });
      }
    }
  });
};

window.addEventListener("scroll", animateOnScroll);

// ======= AO CARREGAR DOM =======
document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.getElementById("current-year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  animateOnScroll();

  const skillLevels = document.querySelectorAll(".skill-level");
  skillLevels.forEach((level) => (level.style.width = "0%"));

  setTimeout(() => animateSkillBars(), 500);
});

// ======= ENVIO DO FORMULÁRIO =======
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="bi bi-arrow-repeat"></i> Enviando...';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(this);
      const response = await fetch("https://formsubmit.co/ajax/mbazarello@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        this.style.display = "none";
        const successMessage = document.getElementById("successMessage");
        successMessage.style.display = "flex";
        setTimeout(() => successMessage.classList.add("show"), 10);
        this.reset();
      } else {
        alert("Erro ao enviar mensagem: " + (data.message || "Tente novamente mais tarde"));
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar mensagem. Verifique sua conexão com a internet.");
    } finally {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}

// ======= VOLTAR PARA O FORMULÁRIO =======
const backToFormBtn = document.getElementById("backToForm");
if (backToFormBtn) {
  backToFormBtn.addEventListener("click", () => {
    const form = document.getElementById("contactForm");
    const successMessage = document.getElementById("successMessage");

    successMessage.classList.remove("show");
    setTimeout(() => {
      successMessage.style.display = "none";
      form.style.display = "block";
    }, 300);
  });
}
