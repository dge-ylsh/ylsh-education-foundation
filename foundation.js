const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#main-nav');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menu.classList.toggle('is-open', !isOpen);
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    });
  });
}

const lightbox = document.querySelector('#photo-lightbox');
if (lightbox) {
  const image = lightbox.querySelector('figure img');
  const caption = lightbox.querySelector('figcaption');
  const closeButton = lightbox.querySelector('.lightbox-close');
  const previousButton = lightbox.querySelector('.lightbox-prev');
  const nextButton = lightbox.querySelector('.lightbox-next');
  let groupPhotos = [];
  let currentPhoto = 0;
  let returnFocus = null;

  const showPhoto = (index) => {
    currentPhoto = (index + groupPhotos.length) % groupPhotos.length;
    const trigger = groupPhotos[currentPhoto];
    image.src = trigger.dataset.full;
    image.alt = trigger.querySelector('img')?.alt || '';
    caption.textContent = trigger.dataset.caption || image.alt;
    const hasMultiple = groupPhotos.length > 1;
    previousButton.hidden = !hasMultiple;
    nextButton.hidden = !hasMultiple;
  };

  document.querySelectorAll('[data-lightbox]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const group = trigger.dataset.group;
      groupPhotos = Array.from(document.querySelectorAll('[data-lightbox]')).filter((photo) => photo.dataset.group === group);
      currentPhoto = groupPhotos.indexOf(trigger);
      returnFocus = trigger;
      showPhoto(currentPhoto);
      lightbox.showModal();
      closeButton.focus();
    });
  });

  previousButton.addEventListener('click', () => showPhoto(currentPhoto - 1));
  nextButton.addEventListener('click', () => showPhoto(currentPhoto + 1));
  closeButton.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('close', () => returnFocus?.focus());
  document.addEventListener('keydown', (event) => {
    if (!lightbox.open) return;
    if (event.key === 'ArrowLeft') showPhoto(currentPhoto - 1);
    if (event.key === 'ArrowRight') showPhoto(currentPhoto + 1);
  });
}
