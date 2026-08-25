const navbar = document.querySelector('.navbar');
const toggle = document.querySelector('.menu-toggle');

const introScreen = document.querySelector('#intro-screen');
const enterButton = document.querySelector('#enter-button');
const heroVideo = document.querySelector('#hero-video');

enterButton.addEventListener('click', () => {
  document.body.classList.remove('site-locked');
  introScreen.classList.add('is-leaving');
  heroVideo.play().catch(() => {});
  window.setTimeout(() => introScreen.remove(), 1100);
});

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
const countdown = document.querySelector('#countdown');

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
  rsvpButton.textContent = 'Presença confirmada';
  rsvpButton.disabled = true;
});

const weddingDate = new Date('2027-04-03T17:00:00-03:00').getTime();
const updateCountdown = () => {
  const remaining = Math.max(0, weddingDate - Date.now());
  const values = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining / 3600000) % 24),
    minutes: Math.floor((remaining / 60000) % 60),
    seconds: Math.floor((remaining / 1000) % 60),
  };
  Object.entries(values).forEach(([unit, value]) => {
    countdown.querySelector(`[data-unit="${unit}"]`).textContent = String(value).padStart(2, '0');
  });
};
updateCountdown();
window.setInterval(updateCountdown, 1000);
