// Image configuration for each language
const IMAGE_CONFIG = {
  ja: {
    count: 12,
    prefix: '../sources/images/ja/',
    width: 1320,  // Adjust to your actual image dimensions
    height: 2868,
    alt: "日本の運転免許学科試験アプリ「KariHonmen」の画面"
  },
  en: {
    count: 12,
    prefix: '../sources/images/en/',
    width: 1320,
    height: 2868,
    alt: "KariHonmen – Japan driver license test app screenshot"
  },
  zh: {
    count: 12,
    prefix: '../sources/images/zh/',
    width: 1320,
    height: 2868,
    alt: "KariHonmen 日本驾照理论考试应用界面截图"
  },
  ko: {
    count: 12,
    prefix: '../sources/images/ko/',
    width: 1320,
    height: 2868,
    alt: "일본 운전면허 필기시험 앱 KariHonmen 화면"
  },
  id: {
    count: 12,
    prefix: '../sources/images/id/',
    width: 1320,
    height: 2868,
    alt: "Tampilan aplikasi KariHonmen untuk latihan ujian SIM Jepang"
  },
  ne: {
    count: 12,
    prefix: '../sources/images/ne/',
    width: 1320,
    height: 2868,
    alt: "जापान ड्राइभर लाइसेन्स परीक्षा अभ्यास एप KariHonmen को स्क्रिन"
  },
  pt: {
    count: 12,
    prefix: '../sources/images/pt/',
    width: 1320,
    height: 2868,
    alt: "Tela do aplicativo KariHonmen para teste da carteira de motorista japonesa"
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

  img.alt = `${config.alt}`;
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