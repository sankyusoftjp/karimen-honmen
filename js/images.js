// Image configuration for each language
const IMAGE_CONFIG = {
  ja: {
    count: 12,
    prefix: 'images/ja/',
    width: 1320,  // Adjust to your actual image dimensions
    height: 2868
  },
  en: {
    count: 12,
    prefix: 'images/en/',
    width: 1320,
    height: 2868
  },
  zh: {
    count: 12,
    prefix: 'images/zh/',
    width: 1320,
    height: 2868
  },
  ko: {
    count: 12,
    prefix: 'images/ko/',
    width: 1320,
    height: 2868
  },
  id: {
    count: 12,
    prefix: 'images/id/',
    width: 1320,
    height: 2868
  },
  ne: {
    count: 12,
    prefix: 'images/ne/',
    width: 1320,
    height: 2868
  },
  pt: {
    count: 12,
    prefix: 'images/pt/',
    width: 1320,
    height: 2868
  }
};

// Lazy loading observer
let imageObserver;

function initImageObserver() {
  const options = {
    root: null,
    rootMargin: '50px',
    threshold: 0.01
  };

  imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const dataSrc = img.getAttribute('data-src');
        if (dataSrc) {
          img.src = dataSrc;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  }, options);
}

function loadImagesForLanguage(lang) {
  const slider = document.getElementById('slider');
  if (!slider) return;

  const config = IMAGE_CONFIG[lang] || IMAGE_CONFIG['en'];
  
  // Clear existing slides
  slider.innerHTML = '';

for (let i = 1; i <= config.count; i++) {
  const slide = document.createElement('div');
  slide.className = 'slide';

  const img = document.createElement('img');

  if (i === 1) {
    // Load ảnh đầu tiên ngay lập tức
    img.src = `${config.prefix}${i}.png`;
  } else {
    img.setAttribute('data-src', `${config.prefix}${i}.png`);
    if (imageObserver) imageObserver.observe(img);
  }

  img.alt = `KariHonmen app screenshot ${i} (${lang})`;
  img.width = config.width;
  img.height = config.height;
  img.style.width = '100%';
  img.style.height = 'auto';

  img.addEventListener('dragstart', e => e.preventDefault());

  slide.appendChild(img);
  slider.appendChild(slide);
}
}

// Initialize observer when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initImageObserver);
} else {
  initImageObserver();
}

// Export function for use in common.js
window.loadImagesForLanguage = loadImagesForLanguage;