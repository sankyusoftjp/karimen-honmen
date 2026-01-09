  function switchLang(lang) {
    const blocks = document.querySelectorAll('.lang-block');
    blocks.forEach(b => b.classList.remove('active'));

    const active = document.getElementById('lang-' + lang);
    if (active) active.classList.add('active');

    const buttons = document.querySelectorAll('.lang-flags button');
    buttons.forEach(btn => btn.classList.remove('active'));

    const btn = document.querySelector('.lang-flags button[onclick="switchLang(\'' + lang + '\')"]');
    if (btn) btn.classList.add('active');

    try {
      localStorage.setItem('karihonmen-lang', lang);
    } catch (e) {}
  }

