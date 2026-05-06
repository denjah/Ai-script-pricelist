import sys

with open("z:/PROJECTS/PRICELIST_SCRIPT/index.html", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update title and meta description
content = content.replace("12 готовых ИИ-решений", "13 готовых ИИ-решений")
content = content.replace("12 готовых решений", "13 готовых решений")

# 2. Update slide numbers globally from / 08 to / 09
content = content.replace(" / 08</div>", " / 09</div>")

# 3. Insert new slide before slide-final
slide_final_marker = """  <!-- ============================================== -->
  <!-- === SLIDE 08: ФИНАЛ (КОНТАКТЫ)             === -->
  <!-- ============================================== -->
  <section class="slide slide-final" aria-label="Финальный экран и контакты">"""

new_slide = """  <!-- ============================================== -->
  <!-- === SLIDE 08: УСЛУГА 13                    === -->
  <!-- ============================================== -->
  <section class="slide slide-services" aria-label="Услуга 13: Obsidian PKM Architect">
    <!-- Декор -->
    <div class="slide-header-bar"></div>
    <div class="bg-figures"></div>
    <div class="slide-number">08 / 09</div>

    <!-- Услуга 13 -->
    <article class="service-col" id="service-13">
      <div class="service-num">13</div>
      <div class="service-label">Услуга 13</div>
      <h2 class="service-name">OBSIDIAN PKM ARCHITECT</h2>
      <p class="service-utp">Построение живой графовой базы знаний в Obsidian — от хаоса к системе</p>
      <div class="divider-h"></div>
      <p class="service-desc">ИИ-архитектор персональной и командной базы знаний на платформе Obsidian. Проектирую графы связей между заметками (Graph Database Architecture), создаю онтологии и таксономии, разрабатываю строгие YAML/Frontmatter-схемы метаданных и структурирую большие массивы данных (>10 000 файлов). На выходе — управляемая, searchable система с автоматическими MOC, дашбордами и ежедневными workflow. Экономит 15–20 часов в неделю на поиск и организацию информации.</p>
      
      <!-- Карусель скриншотов услуги 13 -->
      <div class="screenshot-carousel" data-service="13">
        <div class="carousel-loader"><div class="loader-bar"></div></div>
        <div class="carousel-viewport">
          <img src="IMAGES/SCREENSHOTS/12_-obsidian_01M.png" alt="Obsidian PKM 1" loading="lazy" decoding="async">
          <img src="IMAGES/SCREENSHOTS/12_-obsidian_02M.png" alt="Obsidian PKM 2" loading="lazy" decoding="async">
          <img src="IMAGES/SCREENSHOTS/12_-obsidian_03M.png" alt="Obsidian PKM 3" loading="lazy" decoding="async">
          <img src="IMAGES/SCREENSHOTS/12_-obsidian_04.jpg" alt="Obsidian PKM 4" loading="lazy" decoding="async">
        </div>
        <div class="carousel-dots"><span></span><span></span><span></span><span></span></div>
      </div>

      <div class="service-result">95%+ связность графа · Стандартизированные метаданные · Экономия 15–20 ч/нед на поиск информации</div>
      <p class="service-branches"><strong>Ветки развития:</strong> автоматические MOC, интеграция с AI-агентами, дашборды в Obsidian, экспорт в другие системы</p>
      
      <!-- Цена (для анимации) -->
      <div class="service-price-block">
        <div class="price-main-container">
          <span class="price-prefix">от </span>
          <span class="price-value" data-base="295000">295</span>
          <span class="price-zeros">000</span>
          <span class="price-currency">₽</span>
        </div>
        <span class="price-support">+ 22 000 ₽/мес поддержка · с НДС</span>
      </div>
    </article>
  </section>

  <!-- ============================================== -->
  <!-- === SLIDE 09: ФИНАЛ (КОНТАКТЫ)             === -->
  <!-- ============================================== -->
  <section class="slide slide-final" aria-label="Финальный экран и контакты">"""

content = content.replace(slide_final_marker, new_slide)

# Update the final slide number from 08 / 09 to 09 / 09
final_slide_number = """    <div class="slide-number">08 / 09</div>

    <!-- Левая колонка: контент + контакты -->"""
new_final_slide_number = """    <div class="slide-number">09 / 09</div>

    <!-- Левая колонка: контент + контакты -->"""
content = content.replace(final_slide_number, new_final_slide_number)

# 4. Add the 13th item into the grid
grid_end = """        <a href="#service-12" class="sog-card" aria-label="System Organizer">
          <div class="sog-num">12</div>
          <img class="sog-thumb" src="IMAGES/SCREENSHOTS/12_SYSTEM-ORGANIZER_02M.png" alt="System Organizer" loading="lazy" decoding="async">
          <div class="sog-name">System Organizer</div>
        </a>
      </div>
    </div>
  </section>"""

new_grid_end = """        <a href="#service-12" class="sog-card" aria-label="System Organizer">
          <div class="sog-num">12</div>
          <img class="sog-thumb" src="IMAGES/SCREENSHOTS/12_SYSTEM-ORGANIZER_02M.png" alt="System Organizer" loading="lazy" decoding="async">
          <div class="sog-name">System Organizer</div>
        </a>
        <a href="#service-13" class="sog-card" aria-label="Obsidian PKM Architect">
          <div class="sog-num">13</div>
          <img class="sog-thumb" src="IMAGES/SCREENSHOTS/12_-obsidian_01M.png" alt="Obsidian PKM Architect" loading="lazy" decoding="async">
          <div class="sog-name">Obsidian PKM Architect</div>
        </a>
      </div>
    </div>
  </section>"""

content = content.replace(grid_end, new_grid_end)

with open("z:/PROJECTS/PRICELIST_SCRIPT/index.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Done updating index.html")
