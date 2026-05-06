// === ICONS ===
const ICONS = {
  automation: '<svg viewBox="0 0 36 36"><path d="M18 6a2 2 0 0 1 2 2v1.1A9 9 0 0 1 24.9 12H26a2 2 0 1 1 0 4h-1.1A9 9 0 0 1 22 20.9V22a2 2 0 1 1-4 0v-1.1A9 9 0 0 1 14 18H12a2 2 0 1 1 0-4h2a9 9 0 0 1 2-2.9V10a2 2 0 0 1 2-2zm0 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><circle cx="6" cy="6" r="2"/><circle cx="30" cy="6" r="2"/><circle cx="6" cy="30" r="2"/><circle cx="30" cy="30" r="2"/></svg>',
  designer: '<svg viewBox="0 0 36 36"><path d="M28 4L32 8 12 28H8v-4L28 4zM26 10l-2-2M14 22l-2-2"/><path d="M8 28c0 0-4 1-4 4s4 0 4 0" opacity="0.5"/><circle cx="30" cy="14" r="3" opacity="0.3"/></svg>',
  frontend: '<svg viewBox="0 0 36 36"><path d="M12 8L4 18l8 10M24 8l8 10-8 10" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="20" y1="6" x2="16" y2="30" stroke="currentColor" stroke-width="2" opacity="0.5" stroke-linecap="round"/></svg>',
  knowledge: '<svg viewBox="0 0 36 36"><circle cx="18" cy="10" r="4"/><circle cx="8" cy="26" r="3.5"/><circle cx="28" cy="26" r="3.5"/><line x1="18" y1="14" x2="10" y2="23" stroke="currentColor" stroke-width="1.5"/><line x1="18" y1="14" x2="26" y2="23" stroke="currentColor" stroke-width="1.5"/></svg>'
};

// === USP SLIDES ===
const USPS = {
  automation: [
    'Сокращение рутины на 50–70% через ИИ-агентов',
    '35+ AI-проектов: от Dashboard до мультиагентных CRM',
    'No-Code × Vibe Coding × Prompt Engineering',
    'Автоматизация B2B процессов и CRM-роботы',
    'Интеграция LLM в рабочие процессы компании',
    'Создание кастомных AI-ассистентов для бизнеса'
  ],
  designer: [
    '60–80% ускорение производства контента через AI',
    '31 год дизайна × 3 года AI = уникальная экспертиза',
    'От Midjourney до ComfyUI — полный арсенал',
    'Разработка фирменного стиля и брендбуков',
    'Дизайн высококонверсионных карточек маркетплейсов',
    'Создание сложной графики и иллюстраций нейросетями'
  ],
  frontend: [
    'Production-ready сайт за 2 дня — 0 внешних библиотек',
    'Карусели, ROI-калькуляторы, формы на чистом JS',
    'AI-first: Vibe Coding ускоряет цикл в 3–5 раз',
    'Pixel-perfect вёрстка из Figma на чистом коде',
    'Оптимизация производительности и Core Web Vitals',
    'Интерактивные интерфейсы и сложные анимации'
  ],
  knowledge: [
    '10 000+ узлов в графовой базе знаний PHOTOBASE',
    'YAML-схема 12 полей + LLM через MCP-протокол',
    'Онтологии, таксономии, миграция legacy-данных',
    'Архитектура личных и корпоративных баз знаний',
    'Системы управления знаниями в Obsidian и Tana',
    'Автоматизированная обработка и структурирование данных'
  ]
};

// === TITLE VARIANTS (scramble-cycling) ===
const TITLE_VARIANTS = {
  automation: [
    'AI Automation Architect',
    'Архитектор ИИ-Автоматизаций',
    'No-Code Automation Engineer',
    'Инженер Умных Систем',
    'AI Workflow Designer',
    'Специалист По Автоматизации',
    'Prompt Engineer',
    'Промпт-Инженер',
    'AI Agent Builder',
    'Разработчик ИИ-Агентов',
    'Integration Architect',
    'Архитектор Интеграций',
    'Automation Specialist',
    'CRM & API Интегратор',
    'No-Code Разработчик'
  ],
  designer: [
    'AI-Enhanced Designer',
    'ИИ-Дизайнер',
    'Creative Technologist',
    'Креативный Технолог',
    'Visual Content Producer',
    'Профессиональный Ретушёр',
    'Фотошоп-Мастер',
    'Коммуникационный Дизайнер',
    'Brand Identity Designer',
    'Дизайнер Полиграфии',
    'AI Image Engineer',
    'Художник-Иллюстратор',
    'Motion Designer',
    'Верстальщик Каталогов',
    'Дизайнер Фирменного Стиля'
  ],
  frontend: [
    'Frontend Web Developer',
    'Фронтенд-Разработчик',
    'UI Engineer',
    'Веб-Верстальщик',
    'JavaScript Developer',
    'ИИ-Верстальщик',
    'Vibe Coder',
    'Вайб-Кодер',
    'Full-Stack Lite Dev',
    'Разработчик Интерфейсов',
    'CSS & Animation Expert',
    'Мастер Анимаций',
    'Landing Page Developer',
    'Создатель Лендингов',
    'Design-to-Code Specialist'
  ],
  knowledge: [
    'Knowledge Graph Architect',
    'Архитектор Графов Знаний',
    'PKM System Designer',
    'Инженер Знаний',
    'Obsidian PKM Architect',
    'Архитектор Баз Знаний',
    'Information Architect',
    'Онтолог-Проектировщик',
    'Data Schema Engineer',
    'Инженер Метаданных',
    'Knowledge Engineer',
    'Специалист По Таксономии',
    'Metadata Architect',
    'Архитектор Информации',
    'Graph Database Designer'
  ]
};

// === ALT COLOR THEMES for cards ===
const ALT_COLORS = {
  automation: { bg: '#2A2D1E', accent: '#A8C040', accentLight: '#C0D868', text: '#E8E8D8', textMid: '#B0B898' },
  designer: { bg: '#1E1028', accent: '#D060E8', accentLight: '#E090F0', text: '#F0E8F8', textMid: '#B8A0C8' },
  frontend: { bg: '#0E1A2E', accent: '#40A8E8', accentLight: '#70C0F0', text: '#E0F0F8', textMid: '#90B8D0' },
  knowledge: { bg: '#281810', accent: '#E87830', accentLight: '#F09858', text: '#F8F0E8', textMid: '#C8A888' }
};

// === PROFESSIONS DATA ===
const PROFS = [
  { id: 'automation', title: 'AI Automation Architect', sub: 'Архитектор интеллектуальных систем', r: 95, about: 'AI Automation Architect с 31-летним опытом. 3 года строю интеллектуальные системы автоматизации с ИИ, агентами и no-code. Сокращение рутины на 50–70%.', skills: [{ cat: 'AI Automation & Systems', items: [{ n: 'AI Prompt Engineering', l: 95 }, { n: 'Vibe Coding (Junior → Senior)', l: 85 }, { n: 'No-Code (n8n, Make.com)', l: 90 }, { n: 'AI Agents & Multi-agent', l: 85 }, { n: 'Node-based workflows (ComfyUI)', l: 80 }] }, { cat: 'Бизнес-интеграции', items: [{ n: 'Битрикс24 (вебхуки, роботы, ИИ)', l: 90 }, { n: 'CRM, 1С, маркетплейсы', l: 85 }, { n: 'Google Apps Script, API', l: 88 }] }], res: '🚀 50–70% меньше рутины | 📈 Рост конверсии | 💰 Экономия времени | 📊 Масштабируемые системы' },
  { id: 'designer', title: 'AI-Enhanced Designer', sub: 'Creative Technologist', r: 92, about: 'AI-Enhanced Designer с 31-летним опытом. 3 года AI-first. Масштабируемые системы визуального контента. Ускорение на 60–80%.', skills: [{ cat: 'AI в дизайне', items: [{ n: 'AI Prompt Engineering (визуал)', l: 95 }, { n: 'AI Video & Image Restoration', l: 85 }, { n: 'Node-based AI (ComfyUI)', l: 82 }] }, { cat: 'Классический дизайн (31 год)', items: [{ n: 'Adobe Creative Cloud (эксперт)', l: 98 }, { n: 'Figma (Dev Mode, дизайн-системы)', l: 92 }, { n: 'Rich-контент маркетплейсов', l: 95 }] }], res: '🚀 60–80% быстрее контент | ⚡ 3–5× ускорение | 🎯 Высокий креативный контроль' },
  { id: 'frontend', title: 'Frontend Web Developer', sub: 'AI-first разработка', r: 88, about: 'Frontend-разработчик, 31 год опыта + 3 года AI-first. Чистый код без лишних зависимостей. Полный цикл: от структуры до интеграций.', skills: [{ cat: 'Frontend Development', items: [{ n: 'HTML5, CSS3, Tailwind CSS', l: 92 }, { n: 'JavaScript ES6+ (без фреймворков)', l: 90 }, { n: 'Карусели, калькуляторы, формы', l: 88 }] }, { cat: 'AI & Automation', items: [{ n: 'Prompt Engineering + Vibe Coding', l: 85 }, { n: 'No-Code (n8n, Make.com)', l: 80 }] }], res: '🚀 2 дня — production-ready сайт | 📱 Full responsive + touch | ⚡ 3–5× через AI' },
  { id: 'knowledge', title: 'Knowledge Graph Architect', sub: 'Архитектор графов знаний', r: 98, about: 'Knowledge Graph Architect, 31 год. Графовые базы знаний (>10 000 узлов), онтологии, стандартизация метаданных, интеграция с LLM.', skills: [{ cat: 'Knowledge Management', items: [{ n: 'Graph Database Architecture', l: 95 }, { n: 'Ontology & Taxonomy Design', l: 90 }, { n: 'Metadata Schema (YAML 12 полей)', l: 100 }, { n: 'Information Architecture (>10k)', l: 90 }] }, { cat: 'AI-Интеграции', items: [{ n: 'AI Agents + MCP', l: 85 }, { n: 'Prompt Engineering & Context', l: 95 }, { n: 'Data Migration & Cleansing', l: 85 }] }], res: '🚀 >10 000 узлов PHOTOBASE | ✅ Единая схема 12 полей | ⚡ LLM через MCP' }
];

// === SCRAMBLE ENGINE ===
const SCRAMBLE_CHARS_EN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
const SCRAMBLE_CHARS_RU = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ0123456789@#$%&';

function splitIntoLines(text, maxChars) {
  if (text.length <= maxChars) return [text, ''];
  const words = text.split(' ');
  let line1 = '', line2 = '';
  for (const w of words) {
    if (!line1 || (line1 + ' ' + w).length <= maxChars) line1 = line1 ? line1 + ' ' + w : w;
    else line2 = line2 ? line2 + ' ' + w : w;
  }
  return [line1, line2];
}

function isRussian(ch) { return /[А-Яа-яЁё]/.test(ch); }

function scrambleTo(titleEl, newText, callback) {
  const lines = splitIntoLines(newText, 22);
  let lineEls = titleEl.querySelectorAll('.pcard__title-line');

  // If no lines found, create them (for detail view or other single-line uses)
  if (lineEls.length === 0) {
    titleEl.innerHTML = '<span class="pcard__title-line"></span><span class="pcard__title-line"></span>';
    lineEls = titleEl.querySelectorAll('.pcard__title-line');
  }

  lines.forEach((line, li) => {
    const el = lineEls[li];
    if (!el) return;
    const target = line;
    const maxLen = Math.max(el.textContent.length, target.length);
    const chars = Array.from({ length: maxLen }, () => ({ current: ' ', target: ' ', done: false, delay: 0 }));

    for (let i = 0; i < target.length; i++) {
      chars[i].target = target[i];
      chars[i].done = false;
      chars[i].delay = Math.random() * 12 | 0;
    }
    for (let i = target.length; i < maxLen; i++) {
      chars[i].target = '';
      chars[i].done = false;
      chars[i].delay = Math.random() * 8 | 0;
    }

    let frame = 0;
    const totalFrames = 22;
    function tick() {
      frame++;
      let html = '';
      let allDone = true;
      for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        if (c.target === '' && frame > c.delay + 4) {
          c.done = true;
        } else if (frame > c.delay + totalFrames - 4) {
          c.done = true;
        }
        if (c.done) {
          if (c.target) html += c.target;
        } else {
          allDone = false;
          const pool = isRussian(c.target) ? SCRAMBLE_CHARS_RU : SCRAMBLE_CHARS_EN;
          const rnd = pool[Math.random() * pool.length | 0];
          html += `<span class="scramble-char glitch">${rnd}</span>`;
        }
      }
      el.innerHTML = html;
      if (!allDone) requestAnimationFrame(tick);
      else if (li === lines.length - 1 && callback) callback();
    }
    requestAnimationFrame(tick);
  });
}

function scrambleSingle(el, newText, callback) {
  const target = newText;
  const maxLen = Math.max(el.textContent.length, target.length);
  const chars = Array.from({ length: maxLen }, () => ({ current: ' ', target: ' ', done: false, delay: 0 }));

  for (let i = 0; i < target.length; i++) {
    chars[i].target = target[i];
    chars[i].done = false;
    chars[i].delay = Math.random() * 12 | 0;
  }
  for (let i = target.length; i < maxLen; i++) {
    chars[i].target = '';
    chars[i].done = false;
    chars[i].delay = Math.random() * 8 | 0;
  }

  let frame = 0;
  const totalFrames = 22;
  function tick() {
    frame++;
    let html = '';
    let allDone = true;
    for (let i = 0; i < chars.length; i++) {
      const c = chars[i];
      if (c.target === '' && frame > c.delay + 4) {
        c.done = true;
      } else if (frame > c.delay + totalFrames - 4) {
        c.done = true;
      }
      if (c.done) {
        if (c.target) html += c.target;
      } else {
        allDone = false;
        const pool = isRussian(c.target) ? SCRAMBLE_CHARS_RU : SCRAMBLE_CHARS_EN;
        const rnd = pool[Math.random() * pool.length | 0];
        html += `<span class="scramble-char glitch">${rnd}</span>`;
      }
    }
    el.innerHTML = html;
    if (!allDone) requestAnimationFrame(tick);
    else if (callback) callback();
  }
  requestAnimationFrame(tick);
}

// === CARD COLOR THEME CYCLING ===
function applyAltTheme(card, profId) {
  const c = ALT_COLORS[profId];
  card.style.setProperty('--pcard-bg', c.bg);
  card.style.setProperty('--pcard-accent', c.accent);
  card.style.setProperty('--pcard-accent-light', c.accentLight);
  card.style.setProperty('--pcard-text', c.text);
  card.style.setProperty('--pcard-text-mid', c.textMid);
  card.style.background = c.bg;
  card.style.borderLeftColor = c.accent;
  card.style.color = c.text;
  card.querySelector('.pcard__icon svg').style.fill = c.accent;
  card.querySelector('.pcard__num').style.color = c.accent;
  const meta = card.querySelector('.pcard__meta');
  if (meta) { meta.style.color = c.accent; meta.style.borderTopColor = c.accent + '33'; }
  card.setAttribute('data-alt-theme', '1');
}

function resetCardTheme(card) {
  card.style.background = '';
  card.style.borderLeftColor = '';
  card.style.color = '';
  card.querySelector('.pcard__icon svg').style.fill = '';
  card.querySelector('.pcard__num').style.color = '';
  const meta = card.querySelector('.pcard__meta');
  if (meta) { meta.style.color = ''; meta.style.borderTopColor = ''; }
  card.removeAttribute('data-alt-theme');
}

// === MAGNETIC EFFECT ===
let magneticCard = null;
const MAGNET_DIST = 70;

function initMagnetic() {
  const cards = document.querySelectorAll('.pcard');
  document.addEventListener('mousemove', e => {
    let closest = null, closestDist = Infinity;
    cards.forEach(card => {
      if (card.offsetParent === null) return; // hidden
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      // Check if cursor is within MAGNET_DIST of the card edge
      const edgeX = Math.max(0, Math.abs(dx) - r.width / 2);
      const edgeY = Math.max(0, Math.abs(dy) - r.height / 2);
      const edgeDist = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
      if (edgeDist < MAGNET_DIST && edgeDist < closestDist) {
        closest = card; closestDist = edgeDist;
      }
    });

    cards.forEach(card => {
      if (card === closest) {
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = e.clientX - cx, dy = e.clientY - cy;
        const pull = Math.max(0, 1 - closestDist / MAGNET_DIST);
        const tx = dx * pull * 0.08;
        const ty = dy * pull * 0.08;
        card.style.transform = `translate(${tx}px,${ty}px)`;
        card.classList.add('magnetic');
      } else {
        card.style.transform = '';
        card.classList.remove('magnetic');
      }
    });
  });
}

// === RENDER CARDS ===
function renderCards() {
  const g = document.getElementById('prof-grid'); if (!g) return;
  g.innerHTML = PROFS.map((p, i) => {
    const initLines = splitIntoLines(p.title, 22);
    return `
    <div class="pcard" data-id="${p.id}" onclick="showProf('${p.id}')">
      <span class="pcard__num">0${i + 1}</span>
      <span class="pcard__icon">${ICONS[p.id]}</span>
      <div class="pcard__title">
        <span class="pcard__title-line">${initLines[0]}</span>
        <span class="pcard__title-line">${initLines[1]}</span>
      </div>
      <div class="pcard__carousel">
        <div class="pcard__slides">
          ${USPS[p.id].map((u, j) => `<div class="pcard__slide${j === 0 ? ' active' : ''}">${u}</div>`).join('')}
        </div>
        <div class="pcard__dots">
          ${USPS[p.id].map((_, j) => `<span class="pcard__dot${j === 0 ? ' active' : ''}"></span>`).join('')}
        </div>
      </div>
      <div class="pcard__meta"><span>${p.r}%</span><span class="pcard__arrow">→</span></div>
    </div>`;
  }).join('');

  // USP carousel on hover
  document.querySelectorAll('.pcard').forEach(card => {
    const sl = card.querySelectorAll('.pcard__slide'), dt = card.querySelectorAll('.pcard__dot');
    let idx = 0, t = null;
    card.addEventListener('mouseenter', () => { t = setInterval(() => { sl[idx].classList.remove('active'); dt[idx].classList.remove('active'); idx = (idx + 1) % sl.length; sl[idx].classList.add('active'); dt[idx].classList.add('active') }, 2000) });
    card.addEventListener('mouseleave', () => { if (t) { clearInterval(t); t = null } sl.forEach((s, i) => s.classList.toggle('active', i === 0)); dt.forEach((d, i) => d.classList.toggle('active', i === 0)); idx = 0 });
  });

  // Title scramble cycling per card
  document.querySelectorAll('.pcard').forEach(card => {
    const profId = card.dataset.id;
    const variants = TITLE_VARIANTS[profId];
    let varIdx = 0;
    let isAlt = false;

    function cycle() {
      const delay = 5000 + Math.random() * 4000; // 5-9s
      setTimeout(() => {
        varIdx = (varIdx + 1) % variants.length;
        const titleEl = card.querySelector('.pcard__title');

        // Toggle alt color theme
        if (!isAlt) applyAltTheme(card, profId);
        else resetCardTheme(card);
        isAlt = !isAlt;

        scrambleTo(titleEl, variants[varIdx], () => { cycle(); });
      }, delay);
    }
    // Start with random initial delay so cards don't sync
    setTimeout(cycle, 1000 + Math.random() * 3000);
  });

  // Magnetic effect
  initMagnetic();
}

// === SHOW / HIDE PROFESSION DETAIL ===
let detailCycleInterval = null;

function showProf(id) {
  const p = PROFS.find(x => x.id === id); if (!p) return;
  document.body.setAttribute('data-theme', p.id);
  
  // Update header icon
  const iconContainer = document.getElementById('active-prof-icon');
  const titleEl = document.getElementById('professions-title');
  if (iconContainer) {
    iconContainer.innerHTML = ICONS[p.id];
    iconContainer.style.display = 'flex';
    titleEl.classList.add('has-icon');
  }

  const el = document.getElementById('prof-detail');
  const others = PROFS.filter(x => x.id !== p.id);

  const initLines = splitIntoLines(p.title, 22);

  el.innerHTML = `<div class="section-box">
    <div class="prof-nav">
      <button class="prof-nav__btn prof-nav__btn--back" onclick="hideProf()">← Все профессии</button>
      ${others.map(o => `<button class="prof-nav__btn" data-id="${o.id}" onclick="showProf('${o.id}')">${ICONS[o.id].replace('<svg', '<svg style="width:14px;height:14px"')} <span class="nav-btn-text">${o.title}</span></button>`).join('')}
    </div>
    <div class="prof-detail__head">
      <div class="prof-detail__title-wrapper">
        <span class="prof-detail__sub">${p.sub}</span>
        <div class="prof-detail__title">
          <div class="detail-title-scramble">
            <span class="pcard__title-line">${initLines[0]}</span>
            <span class="pcard__title-line">${initLines[1]}</span>
          </div>
        </div>
      </div>
      <span class="prof-detail__ver">${p.r}%</span>
    </div>
    <div class="prof-detail__about">${p.about}</div>
    ${p.skills.map(c => `<div class="sk-cat">${c.cat}</div>${c.items.map(s => `<div class="sk-row"><span class="sk-row__name">${s.n}</span><div class="sk-row__bar"><div class="sk-row__fill" data-l="${s.l}"></div></div><span class="sk-row__val">${s.l}%</span></div>`).join('')}`).join('')}
    <div class="prof-results"><div class="prof-results__title">Ключевые достижения</div><div class="prof-results__text">${p.res}</div></div>
  </div>`;
  el.classList.add('active');
  document.getElementById('prof-grid').style.display = 'none';
  requestAnimationFrame(() => el.querySelectorAll('.sk-row__fill').forEach(b => b.style.width = b.dataset.l + '%'));
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Start internal scrambling cycle
  if (detailCycleInterval) clearInterval(detailCycleInterval);

  let currentProfId = id;
  let varIdx = 0;

  detailCycleInterval = setInterval(() => {
    varIdx = (varIdx + 1) % TITLE_VARIANTS[currentProfId].length;
    const mainTitleEl = el.querySelector('.detail-title-scramble');
    if (mainTitleEl) {
      scrambleTo(mainTitleEl, TITLE_VARIANTS[currentProfId][varIdx]);
    }

    // Also scramble nav buttons
    el.querySelectorAll('.prof-nav__btn[data-id]').forEach(btn => {
      const btnId = btn.dataset.id;
      const btnTextEl = btn.querySelector('.nav-btn-text');
      if (btnTextEl) {
        const btnVariants = TITLE_VARIANTS[btnId];
        const btnVarIdx = (varIdx) % btnVariants.length; // Use same index for consistency
        scrambleSingle(btnTextEl, btnVariants[btnVarIdx]);
      }
    });
  }, 5000);
}

function hideProf() {
  if (detailCycleInterval) clearInterval(detailCycleInterval);
  document.body.removeAttribute('data-theme');
  
  // Reset header icon
  const iconContainer = document.getElementById('active-prof-icon');
  const titleEl = document.getElementById('professions-title');
  if (iconContainer) {
    iconContainer.innerHTML = '';
    iconContainer.style.display = 'none';
    titleEl.classList.remove('has-icon');
  }

  document.getElementById('prof-detail').classList.remove('active');
  document.getElementById('prof-detail').innerHTML = '';
  document.getElementById('prof-grid').style.display = '';
}

document.addEventListener('DOMContentLoaded', renderCards);
