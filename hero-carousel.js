/**
 * Hero Carousel — Слайдшоу на первом экране (slide-title)
 * 
 * Логика:
 * - Все скриншоты из всех услуг (01–12)
 * - Рандомный порядок, не повторяются дважды подряд
 * - 6 секунд на кадр: fade-in 1.2с → пауза → зум 10% → fade-out → следующий
 * - Текст услуги появляется снизу с задержкой 0.6с
 * - При наведении: пауза + цветное изображение
 */
document.addEventListener('DOMContentLoaded', () => {
  const heroContainer = document.querySelector('.hero-carousel');
  if (!heroContainer) return;

  // === Данные по услугам: скриншоты + тексты ===
  const services = [
    {
      id: '01',
      name: 'Deep Client Analysis',
      desc: 'Анализ болей и триггеров клиента за 3 минуты',
      images: [
        'IMAGES/SCREENSHOTS/01_03_DEEP-CLIENT-ANALYSIS_02_02M.png',
        'IMAGES/SCREENSHOTS/01_04_DEEP-CLIENT-ANALYSIS_02_03M.png',
        'IMAGES/SCREENSHOTS/01_05_DEEP-CLIENT-ANALYSIS_02_04M.png',
        'IMAGES/SCREENSHOTS/01_07_DEEP-CLIENT-ANALYSIS_02_02M.png',
        'IMAGES/SCREENSHOTS/01_08_DEEP-CLIENT-ANALYSIS_03M.png',
        'IMAGES/SCREENSHOTS/01_09_DEEP-CLIENT-ANALYSIS_04M.png'
      ]
    },
    {
      id: '02',
      name: 'ИИ-Квалификатор',
      desc: 'Автоматический скоринг и роутинг лидов 24/7',
      images: ['IMAGES/SCREENSHOTS/02_AI-LEAD-QUALIFIER_04M.png']
    },
    {
      id: '03',
      name: 'ИИ-Аналитик',
      desc: 'Контроль 100% звонков и чатов без участия РОПа',
      images: [
        'IMAGES/SCREENSHOTS/03_COMMS-ANALYST_03M.png',
        'IMAGES/SCREENSHOTS/03_COMMS-ANALYST_04M.png'
      ]
    },
    {
      id: '04',
      name: 'Генератор КП',
      desc: 'Создание персональных предложений под боли клиента',
      images: ['IMAGES/SCREENSHOTS/04_PERSONA-GENERATOR_01M.png']
    },
    {
      id: '05',
      name: 'Sales Coach',
      desc: 'Подсказки по возражениям в реальном времени',
      images: ['IMAGES/SCREENSHOTS/05_SALES-COACH_01M.png']
    },
    {
      id: '06',
      name: 'ИИ-Склад',
      desc: 'Прогноз спроса и автозакупки без дефицита',
      images: [
        'IMAGES/SCREENSHOTS/06_WAREHOUSE-PROCUREMENT_01M.png',
        'IMAGES/SCREENSHOTS/06_WAREHOUSE-PROCUREMENT_04M.png'
      ]
    },
    {
      id: '07',
      name: 'ИИ-Маркетинг',
      desc: 'Генерация контента и анализ рекламы на автопилоте',
      images: ['IMAGES/SCREENSHOTS/07_AI-MARKETING-ASSISTANT_01M.png']
    },
    {
      id: '08',
      name: 'AI Dashboard',
      desc: 'Голосовое управление бизнесом и цифры за секунды',
      images: [
        'IMAGES/SCREENSHOTS/08_EXECUTIVE-AI-DASHBOARD_01M.png',
        'IMAGES/SCREENSHOTS/08_EXECUTIVE-AI-DASHBOARD_02M.png',
        'IMAGES/SCREENSHOTS/08_EXECUTIVE-AI-DASHBOARD_03M.png',
        'IMAGES/SCREENSHOTS/08_EXECUTIVE-AI-DASHBOARD_04M.png'
      ]
    },
    {
      id: '09',
      name: 'Тендерный ассистент',
      desc: 'Поиск и скоринг тендеров за 15 секунд',
      images: ['IMAGES/SCREENSHOTS/09_AI-TENDER-ASSISTANT_01M.png']
    },
    {
      id: '10',
      name: 'ИИ-Ассистент',
      desc: 'Мгновенные ответы по базе знаний компании',
      images: ['IMAGES/SCREENSHOTS/10_CORPORATE-AI-ASSISTANT_02M.png']
    },
    {
      id: '12',
      name: 'System Organizer',
      desc: 'Автоматическое наведение порядка в данных CRM',
      images: ['IMAGES/SCREENSHOTS/12_SYSTEM-ORGANIZER_02M.png']
    }
  ];

  // === Собираем плоский массив { imageSrc, serviceId, serviceName, serviceDesc } ===
  const allSlides = [];
  services.forEach(svc => {
    svc.images.forEach(imgSrc => {
      allSlides.push({
        src: imgSrc,
        id: svc.id,
        name: svc.name,
        desc: svc.desc
      });
    });
  });

  // === Шаффл с защитой от повтора ===
  function shuffleNoRepeat(arr, lastItem) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    // Если первый элемент совпадает с последним предыдущего цикла — сдвигаем
    if (lastItem && shuffled.length > 1 && shuffled[0].src === lastItem.src) {
      const swapIdx = 1 + Math.floor(Math.random() * (shuffled.length - 1));
      [shuffled[0], shuffled[swapIdx]] = [shuffled[swapIdx], shuffled[0]];
    }
    return shuffled;
  }

  // === Состояние ===
  let sequence = shuffleNoRepeat(allSlides, null);
  let currentIdx = 0;
  let isPaused = false;
  let intervalId = null;
  let progressBarEl = null;

  // === Создаём DOM ===
  const viewport = heroContainer.querySelector('.hero-carousel__viewport');
  progressBarEl = heroContainer.querySelector('.hero-carousel__progress-bar');

  // Предсоздаём 2 слота для перекрёстного затухания
  const slotA = createSlot('A');
  const slotB = createSlot('B');
  viewport.appendChild(slotA.el);
  viewport.appendChild(slotB.el);

  let activeSlot = slotA;
  let standbySlot = slotB;

  function createSlot(id) {
    const slide = document.createElement('div');
    slide.className = 'hero-carousel__slide';
    slide.id = `hero-slot-${id}`;
    slide.style.cursor = 'pointer'; // Указываем, что элемент кликабелен

    // Обработчик клика для перехода к услуге
    slide.addEventListener('click', () => {
      const serviceId = slide.getAttribute('data-service-id');
      const target = document.getElementById(`service-${serviceId}`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });

    const imgWrap = document.createElement('div');
    imgWrap.className = 'hero-carousel__img-wrap';
    
    const img = document.createElement('img');
    img.className = 'hero-carousel__img';
    img.alt = '';
    img.loading = 'eager'; // hero — критически важное изображение
    img.decoding = 'async';
    imgWrap.appendChild(img);

    const caption = document.createElement('div');
    caption.className = 'hero-carousel__caption';
    caption.innerHTML = `
      <div class="hero-carousel__service-num"></div>
      <div class="hero-carousel__service-name"></div>
      <div class="hero-carousel__service-desc"></div>
    `;

    slide.appendChild(imgWrap);
    slide.appendChild(caption);

    return {
      el: slide,
      img: img,
      numEl: caption.querySelector('.hero-carousel__service-num'),
      nameEl: caption.querySelector('.hero-carousel__service-name'),
      descEl: caption.querySelector('.hero-carousel__service-desc')
    };
  }

  function loadSlideData(slot, data) {
    slot.el.setAttribute('data-service-id', data.id); // Сохраняем ID для клика
    slot.img.src = data.src;
    slot.numEl.textContent = `Решение ${data.id}`;
    slot.nameEl.textContent = data.name;
    slot.descEl.textContent = data.desc;
  }

  // === Показать слайд ===
  function showSlide() {
    const data = sequence[currentIdx];

    // Подготавливаем standby слот
    loadSlideData(standbySlot, data);

    // Сброс анимации на standby
    standbySlot.el.classList.remove('is-active', 'is-leaving');
    standbySlot.img.style.animation = 'none';
    void standbySlot.img.offsetWidth;
    standbySlot.img.style.animation = '';

    // Старый слот уходит
    activeSlot.el.classList.remove('is-active');
    activeSlot.el.classList.add('is-leaving');

    // Новый слот появляется
    standbySlot.el.classList.add('is-active');

    // Очистка leaving через время transition
    const leavingSlot = activeSlot;
    setTimeout(() => {
      leavingSlot.el.classList.remove('is-leaving');
      leavingSlot.img.style.animation = 'none';
    }, 1400);

    // Swap слоты
    const tmp = activeSlot;
    activeSlot = standbySlot;
    standbySlot = tmp;

    // Прогресс-бар
    resetProgress();
  }

  function resetProgress() {
    if (!progressBarEl) return;
    progressBarEl.classList.remove('is-running');
    void progressBarEl.offsetWidth;
    progressBarEl.style.width = '0%';
    
    requestAnimationFrame(() => {
      progressBarEl.classList.add('is-running');
    });
  }

  // === Автоплей ===
  function startAutoplay() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      if (isPaused) return;
      advance();
    }, 6000);
  }

  function advance() {
    navigate(1);
  }

  function navigate(direction) {
    currentIdx += direction;
    
    if (currentIdx < 0) {
      currentIdx = sequence.length - 1;
    } else if (currentIdx >= sequence.length) {
      const lastItem = sequence[sequence.length - 1];
      sequence = shuffleNoRepeat(allSlides, lastItem);
      currentIdx = 0;
    }
    
    showSlide();
  }

  // === Навигация по кнопкам ===
  const prevBtn = heroContainer.querySelector('.hero-prev');
  const nextBtn = heroContainer.querySelector('.hero-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigate(-1);
      startAutoplay(); // Перезапуск таймера
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigate(1);
      startAutoplay(); // Перезапуск таймера
    });
  }

  // === Hover: пауза ===
  heroContainer.addEventListener('mouseenter', () => {
    isPaused = true;
    // Замораживаем прогресс-бар
    if (progressBarEl) {
      const computedWidth = getComputedStyle(progressBarEl).width;
      progressBarEl.classList.remove('is-running');
      progressBarEl.style.width = computedWidth;
    }
  });

  heroContainer.addEventListener('mouseleave', () => {
    isPaused = false;
    // Возобновляем прогресс-бар с текущей позиции
    if (progressBarEl) {
      requestAnimationFrame(() => {
        progressBarEl.classList.add('is-running');
      });
    }
  });

  // === Touch swipe для мобильных ===
  let heroTouchStartX = 0;
  let heroTouchStartY = 0;
  let isHeroSwiping = false;

  heroContainer.addEventListener('touchstart', (e) => {
    heroTouchStartX = e.changedTouches[0].clientX;
    heroTouchStartY = e.changedTouches[0].clientY;
    isHeroSwiping = true;
  }, { passive: true });

  heroContainer.addEventListener('touchmove', (e) => {
    if (!isHeroSwiping) return;
    const deltaX = Math.abs(e.changedTouches[0].clientX - heroTouchStartX);
    const deltaY = Math.abs(e.changedTouches[0].clientY - heroTouchStartY);
    // If horizontal swipe is dominant, prevent vertical scroll for better UX
    if (deltaX > deltaY && deltaX > 10) {
      e.preventDefault();
    }
  }, { passive: false });

  heroContainer.addEventListener('touchend', (e) => {
    if (!isHeroSwiping) return;
    isHeroSwiping = false;

    const deltaX = e.changedTouches[0].clientX - heroTouchStartX;
    const deltaY = Math.abs(e.changedTouches[0].clientY - heroTouchStartY);
    const threshold = 50;

    if (Math.abs(deltaX) > threshold && Math.abs(deltaX) > deltaY) {
      if (deltaX < 0) {
        navigate(1);  // Swipe left = next
      } else {
        navigate(-1); // Swipe right = prev
      }
      startAutoplay();
    }
  }, { passive: true });

  // === Запуск ===
  // Предзагрузим первое изображение
  const firstData = sequence[currentIdx];
  loadSlideData(activeSlot, firstData);
  activeSlot.el.classList.add('is-active');
  activeSlot.img.style.animation = 'none';
  void activeSlot.img.offsetWidth;
  activeSlot.img.style.animation = '';

  resetProgress();
  startAutoplay();
});
