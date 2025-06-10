document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.querySelector(".mobile-menu");
  const navUl = document.querySelector("nav ul");

  mobileMenuBtn.addEventListener("click", function () {
    navUl.classList.toggle("show");
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      if (navUl.classList.contains("show")) {
        navUl.classList.remove("show");
      }

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      });
    });
  });

  // Add shadow to header on scroll
  const header = document.querySelector("header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    }
  });

  const contactForm = document.getElementById("contactForm");
  const notificationPopup = document.getElementById("notificationPopup");
  const closePopup = document.getElementById("closePopup");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
      };

      try {
        // Mostrar loading no botão
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        // Enviar para o FormSubmit usando Fetch API
        const response = await fetch(
          "https://formsubmit.co/ajax/mbazarello@gmail.com",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();

        if (data.success === "true") {
          // Mostrar popup de sucesso
          notificationPopup.classList.add("active");
          // Resetar formulário
          contactForm.reset();
        } else {
          // Mostrar mensagem de erro (você pode criar um popup de erro também)
          alert(
            "Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente."
          );
        }
      } catch (error) {
        console.error("Error:", error);
        alert(
          "Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente."
        );
      } finally {
        // Restaurar botão
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar Mensagem";
      }
    });
  }

  // Fechar o popup
  if (closePopup) {
    closePopup.addEventListener("click", function () {
      notificationPopup.classList.remove("active");
    });
  }

  // Fechar o popup ao clicar fora
  notificationPopup.addEventListener("click", function (e) {
    if (e.target === notificationPopup) {
      notificationPopup.classList.remove("active");
    }
  });
});
