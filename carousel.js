/**
 * Screenshot Carousel Controller
 * - Загрузочная полоска 0.5с при входе во viewport
 * - Эффект: новый слайд появляется ПОД текущим (z-index layering)
 * - Анимация: рост с 0.85 до 1.0 с рандомным смещением
 * - Ч/Б фото тонированы под фон
 * - Hover: пауза + цвет
 * - Manual Navigation (Prev/Next)
 */
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.screenshot-carousel');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        initCarousel(entry.target);
      } else {
        stopCarousel(entry.target);
      }
    });
  }, { threshold: 0.25 });

  carousels.forEach(c => observer.observe(c));

  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function initCarousel(carousel) {
    if (carousel._running) return;
    carousel._running = true;
    carousel._paused = false;

    const loader = carousel.querySelector('.carousel-loader');
    const viewport = carousel.querySelector('.carousel-viewport');
    const images = viewport.querySelectorAll('img');
    const dots = carousel.querySelectorAll('.carousel-dots span');

    // Sequence setup
    const indices = Array.from({ length: images.length }, (_, i) => i);
    carousel._shuffledIndices = shuffleArray(indices);
    carousel._sequenceIdx = 0;

    // Сброс состояния
    loader.classList.remove('done', 'filling');
    images.forEach(img => {
      img.classList.remove('active', 'leaving');
      img.style.animation = 'none';
    });
    dots.forEach(d => d.classList.remove('active'));

    injectNav(carousel, images, dots);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        loader.classList.add('filling');
      });
    });

    carousel._loaderTimeout = setTimeout(() => {
      loader.classList.add('done');
      const startIdx = carousel._shuffledIndices[carousel._sequenceIdx];
      showSlide(carousel, images, dots, startIdx);
      startAutoplay(carousel, images, dots);
    }, 550);
  }

  function showSlide(carousel, images, dots, newIdx) {
    const viewport = carousel.querySelector('.carousel-viewport');
    const oldImg = viewport.querySelector('img.active');
    
    // Старый слайд уходит наверх (z-index: 2) и исчезает
    if (oldImg) {
      oldImg.classList.remove('active');
      oldImg.classList.add('leaving');
      // Очистка класса после завершения transition (0.8s)
      setTimeout(() => {
        oldImg.classList.remove('leaving');
        oldImg.style.animation = 'none';
      }, 850);
    }

    // Новый слайд появляется под ним (z-index: 1)
    const newImg = images[newIdx];
    
    // Рандомное смещение (Scale 0.85 оставляет 15% запаса, т.е. ±7.5%)
    const rx = (Math.random() * 12 - 6).toFixed(2);
    const ry = (Math.random() * 12 - 6).toFixed(2);
    
    newImg.style.setProperty('--rand-x', rx + '%');
    newImg.style.setProperty('--rand-y', ry + '%');
    
    // Перезапуск анимации
    newImg.style.animation = 'none';
    void newImg.offsetWidth; 
    newImg.style.animation = '';
    
    newImg.classList.remove('leaving');
    newImg.classList.add('active');

    dots.forEach((d, i) => {
      d.classList.toggle('active', i === newIdx);
    });

    carousel._currentIdx = newIdx;
  }

  function injectNav(carousel, images, dots) {
    if (carousel.querySelector('.carousel-nav')) return;

    const nav = document.createElement('div');
    nav.className = 'carousel-nav';
    nav.innerHTML = `
      <button class="nav-btn prev" title="Назад">
        <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
      </button>
      <button class="nav-btn next" title="Вперед">
        <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
      </button>
    `;

    nav.querySelector('.prev').addEventListener('click', (e) => {
      e.stopPropagation();
      navigate(carousel, images, dots, -1);
    });

    nav.querySelector('.next').addEventListener('click', (e) => {
      e.stopPropagation();
      navigate(carousel, images, dots, 1);
    });

    carousel.appendChild(nav);
  }

  function navigate(carousel, images, dots, direction) {
    carousel._sequenceIdx += direction;
    
    if (carousel._sequenceIdx < 0) {
      carousel._sequenceIdx = carousel._shuffledIndices.length - 1;
    } else if (carousel._sequenceIdx >= carousel._shuffledIndices.length) {
      carousel._sequenceIdx = 0;
    }
    
    const nextIdx = carousel._shuffledIndices[carousel._sequenceIdx];
    showSlide(carousel, images, dots, nextIdx);
    startAutoplay(carousel, images, dots);
  }

  function startAutoplay(carousel, images, dots) {
    clearInterval(carousel._interval);
    carousel._interval = setInterval(() => {
      if (carousel._paused) return;
      
      carousel._sequenceIdx++;
      if (carousel._sequenceIdx >= carousel._shuffledIndices.length) {
        const lastIdx = carousel._shuffledIndices[carousel._shuffledIndices.length - 1];
        carousel._shuffledIndices = shuffleArray(carousel._shuffledIndices);
        if (carousel._shuffledIndices[0] === lastIdx && carousel._shuffledIndices.length > 1) {
           [carousel._shuffledIndices[0], carousel._shuffledIndices[1]] = [carousel._shuffledIndices[1], carousel._shuffledIndices[0]];
        }
        carousel._sequenceIdx = 0;
      }
      
      const nextIdx = carousel._shuffledIndices[carousel._sequenceIdx];
      showSlide(carousel, images, dots, nextIdx);
    }, 5000);
  }

  function stopCarousel(carousel) {
    if (!carousel._running) return;
    carousel._running = false;
    carousel._paused = false;

    clearTimeout(carousel._loaderTimeout);
    clearInterval(carousel._interval);
    carousel._interval = null;

    const images = carousel.querySelectorAll('.carousel-viewport img');
    const dots = carousel.querySelectorAll('.carousel-dots span');
    images.forEach(img => {
      img.classList.remove('active', 'leaving');
      img.style.animation = 'none';
    });
    dots.forEach(d => d.classList.remove('active'));

    const loader = carousel.querySelector('.carousel-loader');
    loader.classList.remove('done', 'filling');
  }

  carousels.forEach(carousel => {
    carousel.addEventListener('mouseenter', () => carousel._paused = true);
    carousel.addEventListener('mouseleave', () => carousel._paused = false);
  });
});
