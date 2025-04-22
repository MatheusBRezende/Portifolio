// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle")
const navLinks = document.querySelector(".nav-links")

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active")
})

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active")
  })
})

// Theme toggle functionality
const themeToggle = document.getElementById("theme-toggle")
const htmlElement = document.documentElement

// Check for saved theme preference or use system preference
const savedTheme = localStorage.getItem("theme")
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

// Set initial theme
if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  htmlElement.classList.add("dark")
  htmlElement.classList.remove("light")
} else {
  htmlElement.classList.add("light")
  htmlElement.classList.remove("dark")
}

// Toggle theme when button is clicked
themeToggle.addEventListener("click", () => {
  if (htmlElement.classList.contains("dark")) {
    htmlElement.classList.remove("dark")
    htmlElement.classList.add("light")
    localStorage.setItem("theme", "light")
  } else {
    htmlElement.classList.remove("light")
    htmlElement.classList.add("dark")
    localStorage.setItem("theme", "dark")
  }
})

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const targetPosition = targetElement.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Project filtering - CORRIGIDO
const filterButtons = document.querySelectorAll(".filter-btn")
const projectCards = document.querySelectorAll(".project-card")

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"))

    // Add active class to clicked button
    button.classList.add("active")

    const filter = button.getAttribute("data-filter")

    // Show/hide projects based on filter
    projectCards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = ""

        // Restaura o layout grid para o card featured quando visível
        if (card.classList.contains("featured")) {
          card.style.display = "grid"
        }
      } else {
        card.style.display = "none"
      }
    })
  })
})

// Animate skill bars on scroll
const animateSkillBars = () => {
  const skillLevels = document.querySelectorAll(".skill-level")

  skillLevels.forEach((level) => {
    const levelValue = level.style.getPropertyValue("--level")
    level.style.width = "0%"

    setTimeout(() => {
      level.style.width = levelValue
    }, 200)
  })
}

// Form submission
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value

    // Here you would typically send the form data to a server
    // For this example, we'll just show a success message
    alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso. Entrarei em contato em breve.`)

    // Reset form
    contactForm.reset()
  })
}

// Animate elements when scrolling
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".skill-category, .project-card")

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top
    const screenPosition = window.innerHeight / 1.2

    if (elementPosition < screenPosition) {
      element.classList.add("animate")

      if (element.classList.contains("skill-category")) {
        const skillLevels = element.querySelectorAll(".skill-level")
        skillLevels.forEach((level) => {
          const levelValue = level.style.getPropertyValue("--level")
          level.style.width = levelValue
        })
      }
    }
  })
}

document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.getElementById("current-year")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }

  animateOnScroll()

  const skillLevels = document.querySelectorAll(".skill-level")
  skillLevels.forEach((level) => {
    level.style.width = "0%"
  })

  setTimeout(() => {
    animateSkillBars()
  }, 500)
})

window.addEventListener("scroll", animateOnScroll)

document.getElementById('contactForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  try {
      const response = await fetch('https://formsubmit.co/ajax/mbazarello@gmail.com', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
          },
          body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
          alert('Mensagem enviada com sucesso!');
          document.getElementById('contactForm').reset();
      } else {
          alert('Ocorreu um erro ao enviar a mensagem. Tente novamente.');
      }
  } catch (error) {
      alert('Erro ao enviar a mensagem. Verifique sua conexão com a internet.');
  }
});