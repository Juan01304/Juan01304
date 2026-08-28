const WHATSAPP_NUMBER = "5521000000000"; // Número fictício. Substitua por DDI + DDD + número real.

const header = document.querySelector(".header");
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");
const faqButtons = document.querySelectorAll(".faq-item button");
const form = document.querySelector("#contact-form");
const dialog = document.querySelector("#contact-dialog");
const dialogClose = document.querySelector(".dialog-close");
const preview = document.querySelector("#message-preview");
const whatsappLink = document.querySelector("#whatsapp-link");
const copyButton = document.querySelector("#copy-message");
let currentMessage = "";

function toggleMenu(forceOpen) {
  const open = typeof forceOpen === "boolean" ? forceOpen : menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  nav.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
}

menuButton.addEventListener("click", () => toggleMenu());
navLinks.forEach(link => link.addEventListener("click", () => toggleMenu(false)));
window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 24), { passive: true });

faqButtons.forEach(button => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = button.getAttribute("aria-expanded") === "true";
    document.querySelectorAll(".faq-item").forEach(otherItem => {
      otherItem.classList.remove("open");
      otherItem.querySelector("button").setAttribute("aria-expanded", "false");
    });
    if (!isOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

form.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get("name").trim();
  const phone = data.get("phone").trim();
  const format = data.get("format");
  const period = data.get("period");
  const optionalMessage = data.get("message").trim();
  const lines = [
    "Olá! Encontrei o site e gostaria de informações sobre atendimento psicológico.",
    "",
    `Nome: ${name}`,
    `Telefone: ${phone}`,
    `Formato de interesse: ${format}`,
    `Melhor período: ${period}`
  ];
  if (optionalMessage) lines.push(`Mensagem: ${optionalMessage}`);
  lines.push("", "Pode me informar sobre disponibilidade, por favor?");
  currentMessage = lines.join("\n");
  preview.textContent = currentMessage;
  whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(currentMessage)}`;
  dialog.showModal();
});

dialogClose.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  const rect = dialog.getBoundingClientRect();
  const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  if (outside) dialog.close();
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(currentMessage);
    const originalText = copyButton.textContent;
    copyButton.textContent = "Mensagem copiada ✓";
    setTimeout(() => { copyButton.textContent = originalText; }, 1800);
  } catch {
    copyButton.textContent = "Não foi possível copiar";
  }
});
