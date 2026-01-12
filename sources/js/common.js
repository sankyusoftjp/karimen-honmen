function switchLang(lang) {
    console.log('Setting language to:', lang);

    // local env
    if (location.protocol === 'file:') {
        location.href = '../' + lang + '/index.html';
        return;
    }

    // server / github pages
    const supportedLangs = ['en', 'ja', 'zh', 'ko', 'id', 'ne', 'pt', 'vi'];

    let pathname = location.pathname;
    const regex = new RegExp(`^/(${supportedLangs.join('|')})(?=/|$)`);
    pathname = pathname.replace(regex, `/${lang}`);

    location.pathname = pathname;
}

document.addEventListener('DOMContentLoaded', function () {
    let lang = detectLangFromPath();
    if (!lang) {
        lang = 'en'; // default to English
    }
    console.log('Detected language:', lang);
    const dropdown = document.getElementById('langDropdown');
    if (dropdown) dropdown.value = lang;

    // Force load images immediately
    setTimeout(() => {
        if (typeof window.loadImagesForLanguage === 'function') {
            window.loadImagesForLanguage(lang);
        }
    }, 100);
});

function detectLangFromPath() {
    const path = window.location.pathname;

    // match /vi/, /en/, /ja/, ...
    const match = path.match(/\/(en|ja|zh|ko|id|ne|pt|vi)(\/|$)/);

    if (match) {
        return match[1];
    }
    return null;
}