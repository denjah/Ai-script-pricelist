document.addEventListener('DOMContentLoaded', () => {
  const figureFiles = [
    'Abstract-Shape-007.svg',
    'Abstract-Shape-009.svg',
    'Abstract-Shape-034-1.svg',
    'Abstract-Shape-034.svg',
    'Abstract-Shape-061.svg',
    'Abstract-Shape-072.svg',
    'Abstract-Shape-098.svg',
    'Abstract-Shape-112.svg',
    'Abstract-Shape-134.svg'
  ];

  const FADE_DUR = 4000; // 4 секунды на плавное появление/исчезновение
  const EMPTY_DUR = 1500; // 1.5 секунды пустоты
  const SHOW_DUR = 7000; // 7 секунд показа

  const containers = document.querySelectorAll('.bg-figures');
  
  containers.forEach(container => {
    let currentFigureIdx = -1;
    let currentAngle = Math.random() * 360;
    
    let direction = Math.random() > 0.5 ? 1 : -1;
    let baseSpeed = Math.random() * 0.015 + 0.005; // Медленное вращение
    let targetSpeed = 0; // Начинаем с 0, старт после полного появления
    let currentSpeed = 0; 
    
    let isTransitioning = true; // Сначала переход (появление)
    let lastChangeTime = Date.now() + 9999999; // Заблокируем смену до полного старта
    
    const layer1 = document.createElement('div');
    const layer2 = document.createElement('div');
    layer1.className = 'figure-layer'; // Изначально скрыт
    layer2.className = 'figure-layer';
    container.appendChild(layer1);
    container.appendChild(layer2);
    
    let activeLayer = layer1;
    let inactiveLayer = layer2;
    
    const getRandomFigure = (excludeIdx) => {
      let idx;
      do {
        idx = Math.floor(Math.random() * figureFiles.length);
      } while (idx === excludeIdx);
      return idx;
    };
    
    const loadFigure = async (layer, index) => {
      const url = `IMAGES/Figures/${encodeURIComponent(figureFiles[index])}`;
      try {
        const res = await fetch(url);
        const text = await res.text();
        layer.innerHTML = text;
        const svg = layer.querySelector('svg');
        if(svg) {
          svg.style.width = '100%';
          svg.style.height = '100%';
          svg.style.overflow = 'visible';
          // Делаем фигуры более видимыми (прозрачность 0.6)
          svg.style.opacity = '0.6'; 
          
          const elements = svg.querySelectorAll('*');
          elements.forEach(el => {
            if(['path', 'circle', 'rect', 'line', 'polyline', 'polygon'].includes(el.tagName.toLowerCase())) {
              el.style.stroke = '#9C8E82'; // На 10% светлее чем #8A7B6E
              el.style.strokeWidth = '0.5px';
              el.style.fill = 'none';
              // Гарантируем одинаковую толщину линий при любом масштабе
              el.setAttribute('vector-effect', 'non-scaling-stroke'); 
              el.removeAttribute('stroke');
              el.removeAttribute('stroke-width');
              el.removeAttribute('fill');
            }
          });
        }
      } catch (e) {
        console.error('Ошибка загрузки SVG фигуры', e);
      }
    };
    
    currentFigureIdx = getRandomFigure(-1);
    
    // Инициализация первой фигуры
    loadFigure(activeLayer, currentFigureIdx).then(() => {
      activeLayer.classList.add('active-layer');
      // Ждем окончания появления
      setTimeout(() => {
        targetSpeed = baseSpeed * direction; // Старт ротации
        lastChangeTime = Date.now();
        isTransitioning = false;
      }, FADE_DUR);
    });
    
    const animate = () => {
      // Плавное изменение скорости
      currentSpeed += (targetSpeed - currentSpeed) * 0.01; 
      currentAngle += currentSpeed;
      container.style.transform = `translate(-50%, -50%) rotate(${currentAngle}deg)`;
      
      const now = Date.now();
      
      if (now - lastChangeTime > SHOW_DUR && !isTransitioning) {
        isTransitioning = true;
        targetSpeed = 0; // Плавная остановка
        
        // 1. Начинаем исчезновение
        activeLayer.classList.remove('active-layer');
        
        // 2. Ждем исчезновения
        setTimeout(() => {
          
          // 3. Пустота 1.5 секунды, затем загружаем и показываем новую
          setTimeout(() => {
            const nextIdx = getRandomFigure(currentFigureIdx);
            loadFigure(inactiveLayer, nextIdx).then(() => {
              inactiveLayer.classList.add('active-layer');
              
              // 4. Ждем полного появления
              setTimeout(() => {
                 const temp = activeLayer;
                 activeLayer = inactiveLayer;
                 inactiveLayer = temp;
                 currentFigureIdx = nextIdx;
                 
                 direction = Math.random() > 0.5 ? 1 : -1;
                 baseSpeed = Math.random() * 0.015 + 0.005;
                 targetSpeed = baseSpeed * direction; // Старт ротации после появления
                 
                 lastChangeTime = Date.now();
                 isTransitioning = false;
              }, FADE_DUR); 
            });
          }, EMPTY_DUR);
          
        }, FADE_DUR);
      }
      
      requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  });
});
