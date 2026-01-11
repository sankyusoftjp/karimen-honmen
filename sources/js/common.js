function switchLang(lang) {
    console.log('Setting language to:', lang);
    if (location.protocol === 'file:') {
        location.href = '../' + lang + '/index.html';
    }
    // server / github pages
    else {
        location.href = '/' + lang + '/';
    }
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