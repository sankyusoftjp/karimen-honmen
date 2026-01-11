function switchLang(lang) {
  console.log('Setting language to:', lang);
  // Ẩn toàn bộ nội dung
  const blocks = document.querySelectorAll('.lang-block');
  blocks.forEach(block => block.classList.remove('active'));

  // Hiện nội dung theo ngôn ngữ
  const actives = document.querySelectorAll('.content-' + lang);
  actives.forEach(el => el.classList.add('active'));

  // Load ảnh theo ngôn ngữ (nếu có)
  if (typeof window.loadImagesForLanguage === 'function') {
    window.loadImagesForLanguage(lang);
  }

  // Lưu localStorage
  try {
    localStorage.setItem('karihonmen-lang', lang);
  } catch (e) {}

}

document.addEventListener('DOMContentLoaded', function () {
    let lang = 'en';
    try {
        const saved = localStorage.getItem('karihonmen-lang');
        if (saved) {
            lang = saved;
        } else {
            // Detect browser language
            const browserLang = navigator.language || navigator.userLanguage;
            const langCode = browserLang.split('-')[0]; // Get 'ja' from 'ja-JP'
            const supportedLangs = ['ja', 'en', 'zh', 'ko', 'id', 'ne', 'pt', 'vi'];
            if (supportedLangs.includes(langCode)) {
                lang = langCode;
            }
        }
    } catch (e) { console.error(e); }
 
    switchLang(lang);
    const dropdown = document.getElementById('langDropdown');
    if (dropdown) dropdown.value = lang;
    
    // Force load images immediately
    setTimeout(() => {
        if (typeof window.loadImagesForLanguage === 'function') {
            window.loadImagesForLanguage(lang);
        }
    }, 100);
});