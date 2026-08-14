const navbar = document.querySelector('.navbar');
const toggle = document.querySelector('.menu-toggle');

toggle.addEventListener('click', () => {
  const open = navbar.classList.toggle('menu-open');
  toggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', () => {
  navbar.classList.remove('menu-open');
  toggle.setAttribute('aria-expanded', 'false');
}));

const modal = document.querySelector('.modal');
const openModal = document.querySelector('[data-modal-open]');
const closeModal = document.querySelector('.modal-close');
const copyPix = document.querySelector('.copy-pix');
const copyFeedback = document.querySelector('.copy-feedback');
const rsvpButton = document.querySelector('.rsvp-button');

const setModal = (open) => {
  modal.classList.toggle('is-open', open);
  modal.setAttribute('aria-hidden', String(!open));
};

openModal.addEventListener('click', () => setModal(true));
closeModal.addEventListener('click', () => setModal(false));
modal.addEventListener('click', (event) => {
  if (event.target === modal) setModal(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setModal(false);
});

copyPix.addEventListener('click', async () => {
  const pixKey = copyPix.dataset.pixKey;
  try {
    await navigator.clipboard.writeText(pixKey);
    copyFeedback.textContent = 'Chave Pix copiada.';
  } catch {
    copyFeedback.textContent = `Chave Pix: ${pixKey}`;
  }
});

rsvpButton.addEventListener('click', () => {
  rsvpButton.textContent = 'Presença confirmada ✓';
  rsvpButton.disabled = true;
});
