/* ProfiHub Portal — App v2.0 */

// === SVG ICONS (monochrome) ===
const ICONS = {
  automation: `<svg viewBox="0 0 36 36"><path d="M18 6a2 2 0 0 1 2 2v1.1A9 9 0 0 1 24.9 12H26a2 2 0 1 1 0 4h-1.1A9 9 0 0 1 22 20.9V22a2 2 0 1 1-4 0v-1.1A9 9 0 0 1 14 18H12a2 2 0 1 1 0-4h2a9 9 0 0 1 2-2.9V10a2 2 0 0 1 2-2zm0 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><circle cx="6" cy="6" r="2"/><circle cx="30" cy="6" r="2"/><circle cx="6" cy="30" r="2"/><circle cx="30" cy="30" r="2"/><line x1="6" y1="8" x2="6" y2="28" stroke="currentColor" stroke-width="1" opacity="0.3"/><line x1="8" y1="6" x2="28" y2="6" stroke="currentColor" stroke-width="1" opacity="0.3"/></svg>`,
  designer: `<svg viewBox="0 0 36 36"><path d="M28 4L32 8 12 28H8v-4L28 4zM26 10l-2-2M14 22l-2-2"/><path d="M8 28c0 0-4 1-4 4s4 0 4 0" opacity="0.5"/><circle cx="30" cy="14" r="3" opacity="0.3"/><circle cx="26" cy="22" r="2" opacity="0.2"/></svg>`,
  frontend: `<svg viewBox="0 0 36 36"><path d="M12 8L4 18l8 10M24 8l8 10-8 10" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="20" y1="6" x2="16" y2="30" stroke="currentColor" stroke-width="2" opacity="0.5" stroke-linecap="round"/></svg>`,
  knowledge: `<svg viewBox="0 0 36 36"><circle cx="18" cy="10" r="4"/><circle cx="8" cy="26" r="3.5"/><circle cx="28" cy="26" r="3.5"/><circle cx="30" cy="12" r="2.5" opacity="0.5"/><circle cx="6" cy="14" r="2" opacity="0.4"/><line x1="18" y1="14" x2="10" y2="23" stroke="currentColor" stroke-width="1.5"/><line x1="18" y1="14" x2="26" y2="23" stroke="currentColor" stroke-width="1.5"/><line x1="11" y1="26" x2="25" y2="26" stroke="currentColor" stroke-width="1" opacity="0.4"/><line x1="22" y1="10" x2="28" y2="12" stroke="currentColor" stroke-width="1" opacity="0.4"/></svg>`
};

// === USP SLIDES ===
const USPS = {
  automation: [
    'Сокращение рутины на 50–70% через ИИ-агентов и no-code пайплайны',
    '35+ реализованных AI-проектов: от Dashboard до мультиагентных CRM',
    'No-Code × Vibe Coding × Prompt Engineering = результат за дни, не месяцы'
  ],
  designer: [
    '60–80% ускорение производства визуального контента через AI',
    '31 год классического дизайна × 3 года AI = уникальная экспертиза',
    'От Midjourney до ComfyUI — полный арсенал генеративных инструментов'
  ],
  frontend: [
    'Production-ready сайт за 2 дня с нуля — 0 внешних JS-библиотек',
    'Сложные карусели, ROI-калькуляторы, асинхронные формы на чистом JS',
    'AI-first разработка: Vibe Coding ускоряет цикл в 3–5 раз'
  ],
  knowledge: [
    '10 000+ узлов в графовой базе знаний PHOTOBASE — реальный проект',
    'YAML-схема 12 полей + интеграция LLM через MCP-протокол',
    'Онтологии, таксономии, миграция legacy-данных — всё под ключ'
  ]
};

// === PROFESSION DATA ===
const PROFESSIONS = [
  {
    id:'automation', title:'AI Automation Architect',
    subtitle:'Архитектор интеллектуальных систем автоматизации', readiness:95,
    about:'AI Automation Architect с 31-летним опытом. Последние 3 года строю интеллектуальные системы автоматизации с использованием ИИ, агентов и no-code инструментов. Сокращение рутинной нагрузки на 50–70%.',
    skills:[
      {cat:'AI Automation & Systems',items:[
        {name:'AI Prompt Engineering (продвинутый)',level:95},
        {name:'Vibe Coding (Junior → Senior)',level:85},
        {name:'No-Code Automation (n8n, Make.com)',level:90},
        {name:'AI Agents & Multi-agent Systems',level:85},
        {name:'Node-based AI workflows (ComfyUI, Weavy)',level:80}
      ]},
      {cat:'Бизнес-интеграции',items:[
        {name:'Битрикс24 (вебхуки, роботы, интеграции с ИИ)',level:90},
        {name:'CRM (amoCRM), 1С, маркетплейсы',level:85},
        {name:'Google Apps Script, API, Webhooks',level:88}
      ]}
    ],
    results:'🚀 Сокращение рутинной нагрузки 50–70% | 📈 Рост конверсии | 💰 Экономия времени и средств | 📊 Масштабируемые системы без роста штата',
    version:'automation-1.0 | 2026-05-06'
  },
  {
    id:'designer', title:'AI-Enhanced Designer',
    subtitle:'Creative Technologist', readiness:92,
    about:'AI-Enhanced Designer с 31-летним опытом. Последние 3 года — полный переход на AI-first подход. Создаю масштабируемые системы визуального контента. Сокращение времени производства на 60–80%.',
    skills:[
      {cat:'AI в дизайне (основная экспертиза)',items:[
        {name:'AI Prompt Engineering для визуальных задач',level:95},
        {name:'Vibe Coding (Junior → Senior)',level:80},
        {name:'AI Video Generation & Image Restoration',level:85},
        {name:'Node-based AI workflows (ComfyUI, Weavy)',level:82}
      ]},
      {cat:'Классический дизайн (31 год)',items:[
        {name:'Adobe Creative Cloud (полный пакет, эксперт)',level:98},
        {name:'Figma (продвинутый: дизайн-системы, Dev Mode)',level:92},
        {name:'Rich-контент для маркетплейсов',level:95}
      ]}
    ],
    results:'🚀 60–80% быстрее производство визуального контента | ⚡ 3–5× ускорение в Альтаир Груп | 🎯 Высокий креативный контроль при использовании ИИ',
    version:'designer-1.0 | 2026-05-06'
  },
  {
    id:'frontend', title:'Frontend Web Developer',
    subtitle:'AI Automation Architect', readiness:88,
    about:'Frontend-разработчик с 31 годом опыта + 3 года глубокого погружения в AI-first. Пишу чистый, производительный код без лишних зависимостей. Полный цикл: от структуры до интеграций.',
    skills:[
      {cat:'Frontend Development',items:[
        {name:'HTML5, CSS3, Tailwind CSS + custom',level:92},
        {name:'JavaScript ES6+ (чистый, без фреймворков)',level:90},
        {name:'Сложные карусели, ROI-калькуляторы, формы',level:88}
      ]},
      {cat:'AI & Automation',items:[
        {name:'AI Prompt Engineering + Vibe Coding',level:85},
        {name:'No-Code Automation (n8n, Make.com)',level:80}
      ]}
    ],
    results:'🚀 2 дня — production-ready сайт с нуля (0 внешних JS-библиотек) | 📱 Полная responsive + touch support | ⚡ 3–5× ускорение через AI-пайплайны',
    version:'web-dev-1.0 | 2026-05-06'
  },
  {
    id:'knowledge', title:'Knowledge Graph Architect',
    subtitle:'Архитектор графов знаний', readiness:98,
    about:'Knowledge Graph Architect с 31-летним опытом. Проектирую и разворачиваю графовые базы знаний (>10 000 узлов), онтологии, стандартизацию метаданных и интеграцию с LLM-агентами. Реальный проект: PHOTOBASE Graph.',
    skills:[
      {cat:'Архитектура данных и Knowledge Management',items:[
        {name:'Graph Database Architecture (Obsidian, связность)',level:95},
        {name:'Ontology & Taxonomy Design',level:90},
        {name:'Metadata Standardization & Schema Design (YAML 12 полей)',level:100},
        {name:'Information Architecture (>10k файлов)',level:90}
      ]},
      {cat:'AI-Интеграции и Системная инженерия',items:[
        {name:'AI Agents & Multi-agent Systems + MCP',level:85},
        {name:'Prompt Engineering & Context Management',level:95},
        {name:'Data Migration & Cleansing (legacy рефакторинг)',level:85},
        {name:'AI Skills Architecture',level:90}
      ]}
    ],
    results:'🚀 PHOTOBASE Graph: >10 000 узлов | ✅ Единая схема метаданных (12 полей) | ⚡ Интеграция с LLM через MCP | 📈 Ускорение работы с контентом 3–5×',
    version:'knowledge-graph-1.0 | 2026-05-06'
  }
];

// === HELPERS ===
const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);
const countSkills=p=>p.skills.reduce((s,c)=>s+c.items.length,0);

let currentView='dashboard', currentProf=null;
const carouselTimers=[];

// === INIT ===
document.addEventListener('DOMContentLoaded',()=>{
  renderDashboard();
  renderStats();
  setupIntersectionObserver();
  setupNavigation();
  initParticles();
});

// === RENDER DASHBOARD ===
function renderDashboard(){
  const grid=$('#cards-grid');
  if(!grid) return;
  grid.innerHTML=PROFESSIONS.map((p,i)=>`
    <div class="prof-card animate-in" data-prof="${p.id}" style="--i:${i}" onclick="showDetail('${p.id}')">
      <span class="prof-card__number">0${i+1}</span>
      <span class="prof-card__icon">${ICONS[p.id]}</span>
      <div class="prof-card__title">${p.title}</div>
      <div class="prof-card__carousel" data-carousel="${p.id}">
        <div class="prof-card__slides-wrap">
          ${USPS[p.id].map((u,j)=>`<div class="prof-card__slide${j===0?' active':''}">${u}</div>`).join('')}
        </div>
        <div class="prof-card__dots">
          ${USPS[p.id].map((_,j)=>`<span class="prof-card__dot${j===0?' active':''}"></span>`).join('')}
        </div>
      </div>
      <div class="prof-card__meta">
        <span class="prof-card__readiness">${p.readiness}%</span>
        <span class="prof-card__skills-count">${countSkills(p)} навыков</span>
        <span class="prof-card__arrow">→</span>
      </div>
    </div>
  `).join('');
  setupCardCarousels();
}

// === CARD HOVER CAROUSEL ===
function setupCardCarousels(){
  carouselTimers.forEach(t=>clearInterval(t));
  carouselTimers.length=0;

  $$('.prof-card').forEach(card=>{
    const carousel=card.querySelector('.prof-card__carousel');
    if(!carousel) return;
    const slides=carousel.querySelectorAll('.prof-card__slide');
    const dots=carousel.querySelectorAll('.prof-card__dot');
    let idx=0, timer=null;

    card.addEventListener('mouseenter',()=>{
      timer=setInterval(()=>{
        slides[idx].classList.remove('active');
        dots[idx].classList.remove('active');
        idx=(idx+1)%slides.length;
        slides[idx].classList.add('active');
        dots[idx].classList.add('active');
      },2000);
      carouselTimers.push(timer);
    });

    card.addEventListener('mouseleave',()=>{
      if(timer){clearInterval(timer);timer=null}
      slides.forEach((s,i)=>{s.classList.toggle('active',i===0)});
      dots.forEach((d,i)=>{d.classList.toggle('active',i===0)});
      idx=0;
    });
  });
}

// === STATS ===
function renderStats(){
  const el=$('#stats-grid'); if(!el) return;
  const totalSkills=PROFESSIONS.reduce((s,p)=>s+countSkills(p),0);
  const avg=Math.round(PROFESSIONS.reduce((s,p)=>s+p.readiness,0)/PROFESSIONS.length);
  [{v:PROFESSIONS.length,l:'Профессий'},{v:totalSkills,l:'Навыков'},{v:avg+'%',l:'Средняя готовность'},{v:'31+',l:'Лет опыта'}]
    .forEach((s,i)=>{
      el.innerHTML+=`<div class="stat-card animate-in" style="--i:${i}"><div class="stat-card__value">${s.v}</div><div class="stat-card__label">${s.l}</div></div>`;
    });
}

// === DETAIL VIEW ===
function showDetail(profId){
  const prof=PROFESSIONS.find(p=>p.id===profId);
  if(!prof) return;
  currentProf=prof; currentView='detail';

  // Apply theme
  document.body.setAttribute('data-theme',prof.id);

  const detail=$('#detail-view'), dashboard=$('#dashboard-section');
  detail.innerHTML=`
    <div class="container">
      <div class="detail-layout">
        <aside class="detail-sidebar">
          <div class="sidebar__back" onclick="showDashboard()">← Дашборд</div>
          <div class="sidebar__title">Профессии</div>
          ${PROFESSIONS.map(p=>`
            <div class="sidebar__item${p.id===prof.id?' active':''}" onclick="showDetail('${p.id}')">
              ${ICONS[p.id].replace('<svg','<svg style="width:18px;height:18px"')}
              <span>${p.title}</span>
            </div>
          `).join('')}
        </aside>
        <div class="detail-content">
          <div class="detail__header">
            <div>
              <div class="hero__badge">${prof.subtitle}</div>
              <h2 class="detail__title">${prof.title}</h2>
            </div>
            <div class="detail__version">${prof.version}</div>
          </div>
          <div class="section-box"><div class="detail__about">${prof.about}</div></div>
          <h3 class="section-heading">Навыки и экспертиза</h3>
          <div class="skills-section section-box">
            ${prof.skills.map(cat=>`
              <div class="skill-category">${cat.cat}</div>
              ${cat.items.map(item=>`
                <div class="skill-item">
                  <span class="skill-item__name">${item.name}</span>
                  <div class="skill-item__bar"><div class="skill-item__fill" data-level="${item.level}"></div></div>
                  <span class="skill-item__value">${item.level}%</span>
                </div>
              `).join('')}
            `).join('')}
          </div>
          <h3 class="section-heading">Результаты</h3>
          <div class="results-box">
            <div class="results-box__title">Ключевые достижения</div>
            <div class="results-box__text">${prof.results}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  dashboard.style.display='none';
  detail.classList.add('active');
  requestAnimationFrame(()=>$$('.skill-item__fill').forEach(b=>{b.style.width=b.dataset.level+'%'}));
  window.scrollTo({top:0,behavior:'smooth'});
}

// === SHOW DASHBOARD ===
function showDashboard(){
  currentView='dashboard'; currentProf=null;
  document.body.removeAttribute('data-theme');
  $('#detail-view').classList.remove('active');
  $('#dashboard-section').style.display='block';
  $$('.prof-card.animate-in').forEach(el=>{el.classList.remove('visible');requestAnimationFrame(()=>el.classList.add('visible'))});
  window.scrollTo({top:0,behavior:'smooth'});
}

// === NAVIGATION ===
function setupNavigation(){
  $$('.nav__link').forEach(link=>{
    link.addEventListener('click',()=>{
      const t=link.dataset.target;
      if(t==='dashboard'&&currentView!=='dashboard') showDashboard();
      else if(t==='stats'){
        if(currentView!=='dashboard') showDashboard();
        setTimeout(()=>document.getElementById('stats-section')?.scrollIntoView({behavior:'smooth'}),100);
      }
    });
  });
}

// === INTERSECTION OBSERVER ===
function setupIntersectionObserver(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
  },{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
  const observe=()=>$$('.animate-in:not(.visible)').forEach(el=>obs.observe(el));
  observe();
  new MutationObserver(observe).observe(document.body,{childList:true,subtree:true});
}

// === PARTICLES SYSTEM ===
function initParticles(){
  const canvas=$('#particles-canvas');
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  let W,H;
  const CYCLE=7000; // 7 seconds
  const COUNT=80;
  let particles=[];

  function resize(){
    W=canvas.width=window.innerWidth;
    H=canvas.height=window.innerHeight;
  }
  window.addEventListener('resize',resize);
  resize();

  // Create particles
  for(let i=0;i<COUNT;i++){
    particles.push({
      x:Math.random()*W,
      y:Math.random()*H,
      r:Math.random()*2+0.5,
      phase:Math.random()*Math.PI*2, // random start phase
      vx:(Math.random()-0.5)*0.3,
      vy:(Math.random()-0.5)*0.3
    });
  }

  function draw(t){
    ctx.clearRect(0,0,W,H);

    // Get current theme colors
    const style=getComputedStyle(document.body);
    const textColor=style.getPropertyValue('--text').trim()||'#2D241E';

    // Parse hex to RGB
    const r=parseInt(textColor.slice(1,3),16)||45;
    const g=parseInt(textColor.slice(3,5),16)||36;
    const b=parseInt(textColor.slice(5,7),16)||30;

    particles.forEach(p=>{
      // Smooth fade in/out on 7s cycle
      const phase=((t/CYCLE)+p.phase)%(Math.PI*2);
      const alpha=Math.max(0,(Math.sin(phase)*0.5+0.5))*0.12;

      // Drift
      p.x+=p.vx;
      p.y+=p.vy;
      if(p.x<0)p.x=W;
      if(p.x>W)p.x=0;
      if(p.y<0)p.y=H;
      if(p.y>H)p.y=0;

      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${r},${g},${b},${alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}
