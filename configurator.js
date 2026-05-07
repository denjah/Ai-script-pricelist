/**
 * Hybrid Price Configurator — Dynamic JSON Version
 * Works with multiple services automatically
 */
class ServiceConfigurator {
  constructor(containerId, jsonPath) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.jsonPath = jsonPath;
    this.data = null;
    this.currentStep = 1;

    // Reactive state
    this.state = {
      type: null,
      volume: 0,
      options: new Set(),
      deadline: null,
      currency: 'RUB',
      mode: 'initial' // initial | wizard | manual
    };

    // Currency rates (can be globalized later if needed)
    this.rates = { RUB: 1, USD: 0.011, EUR: 0.01, BTC: 0.00000015 };
    this.currencySymbols = { RUB: '₽', USD: '$', EUR: '€', BTC: '₿' };

    this.init();
  }

  async init() {
    try {
      const response = await fetch(this.jsonPath);
      this.data = await response.json();
      
      this.setDefaultState();
      this.renderAll();
      this.bindEvents();
      this.calculatePrice(); // Ensure initial price is shown
    } catch (error) {
      console.error(`Error loading data for ${this.container.id}:`, error);
    }
  }

  setDefaultState() {
    const s2 = this.data.wizard.step2;
    this.state.volume = s2.volume.default;
    this.state.deadline = this.data.manual.deadlineDefault;
    // By default options are empty, unless you want to load defaults
  }

  // ================= RENDER =================
  renderAll() {
    this.renderChips();
    this.renderStep1();
    this.renderStep2AndManual();
    this.renderStep3Labels();
  }

  renderChips() {
    const chipsContainer = this.container.querySelector('.cfg-chips');
    if (!chipsContainer) return;
    
    chipsContainer.innerHTML = this.data.preSettings.map(preset => `
      <button class="cfg-chip ${preset.popular ? 'popular' : ''}" data-preset="${preset.id}" type="button">
        ${preset.name} <span class="chip-price">${this.formatPrice(preset.price)}</span>
      </button>
    `).join('');
  }

  renderStep1() {
    const cardsContainer = this.container.querySelector('.cfg-type-cards');
    if (!cardsContainer) return;

    const title = this.container.querySelector('.cfg-step-panel[data-step="1"] .cfg-step-title');
    if (title && this.data.wizard.step1.title) title.textContent = this.data.wizard.step1.title;

    cardsContainer.innerHTML = this.data.wizard.step1.options.map(opt => `
      <div class="cfg-type-card ${this.state.type === opt.id ? 'active' : ''}" data-type="${opt.id}" tabindex="0" role="button">
        <span class="cfg-type-icon">${opt.icon}</span>
        <span class="cfg-type-label">${opt.label}</span>
        <div class="cfg-tooltip">
          <div class="cfg-tooltip-header"><span>${opt.icon}</span> ${opt.tooltipTitle}</div>
          <p>${opt.tooltipText}</p>
        </div>
      </div>
    `).join('');
  }

  renderStep3Labels() {
    const s3 = this.data.wizard.step3;
    if (!s3) return;
    
    const primary = this.container.querySelector('#cfg-book-wizard');
    const secondary = this.container.querySelector('#cfg-discuss-wizard');
    
    if (primary) primary.textContent = s3.ctaPrimary;
    if (secondary) secondary.textContent = s3.ctaSecondary;
  }

  renderStep2AndManual() {
    const s2 = this.data.wizard.step2;
    
    // Render range sliders
    const renderVolume = (prefix) => {
      const label = this.container.querySelector(`#${prefix}volume-label`);
      const range = this.container.querySelector(`#${prefix}volume-range`) || this.container.querySelector(`#${prefix}volume`);
      
      if (label) label.textContent = s2.volume.label;
      if (range) {
        range.min = s2.volume.min;
        range.max = s2.volume.max;
        range.step = s2.volume.step;
        range.value = this.state.volume;
      }
    };
    renderVolume('cfg-');
    renderVolume('cfg-manual-');

    this.updateVolumeDisplays();

    // Render checkboxes in both wizard and manual modes
    const checksContainers = this.container.querySelectorAll('.cfg-checks');
    checksContainers.forEach(container => {
      container.innerHTML = s2.checkboxes.map(chk => `
        <label class="cfg-check">
          <input type="checkbox" class="${container.closest('.cfg-manual') ? 'cfg-manual-check' : ''}" value="${chk.id}" ${this.state.options.has(chk.id) ? 'checked' : ''}>
          <span class="cfg-check-box"></span>
          <span class="cfg-check-label">${chk.label} <span class="check-price">+${this.formatPrice(chk.priceDelta)}</span></span>
        </label>
      `).join('');
    });

    // Render deadline selects
    const selects = [
      this.container.querySelector('#cfg-deadline'),
      this.container.querySelector('#cfg-manual-deadline')
    ];
    selects.forEach(sel => {
      if (!sel) return;
      sel.innerHTML = s2.deadline.map(dl => `
        <option value="${dl.id}" ${this.state.deadline === dl.id ? 'selected' : ''}>
          ${dl.label} ${dl.priceDelta !== 0 ? `(${dl.priceDelta > 0 ? '+' : ''}${this.formatPrice(dl.priceDelta)})` : ''}
        </option>
      `).join('');
    });
  }

  updateVolumeDisplays() {
    const valWiz = this.container.querySelector('#cfg-volume-value');
    const valMan = this.container.querySelector('#cfg-manual-volume-value');
    if (valWiz) valWiz.textContent = this.state.volume;
    if (valMan) valMan.textContent = this.state.volume;
  }

  // ================= EVENTS =================
  bindEvents() {
    // Mode Switchers
    this.container.querySelector('.cfg-cta-btn')?.addEventListener('click', () => this.switchMode('wizard'));
    this.container.querySelector('.cfg-manual-toggle')?.addEventListener('click', (e) => {
      const btn = e.currentTarget;
      btn.classList.toggle('expanded');
      const body = this.container.querySelector('.cfg-manual-body');
      if (body) body.classList.toggle('open');
      this.switchMode('manual');
    });
    this.container.querySelector('.cfg-close-wizard')?.addEventListener('click', () => this.switchMode('initial'));

    // Magnetic CTA
    const ctaBtn = this.container.querySelector('.cfg-cta-btn');
    if (ctaBtn) {
      ctaBtn.addEventListener('mousemove', (e) => {
        const rect = ctaBtn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        ctaBtn.style.transform = `translate(${x * 0.15}px, ${y * 0.35}px) scale(1.02)`;
        ctaBtn.style.transition = 'transform 0.1s ease-out';
      });
      ctaBtn.addEventListener('mouseleave', () => {
        ctaBtn.style.transform = '';
        ctaBtn.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      });
    }

    // Wizard Navigation
    this.container.querySelector('.cfg-nav-next')?.addEventListener('click', () => this.changeStep(1));
    this.container.querySelector('.cfg-nav-prev')?.addEventListener('click', () => this.changeStep(-1));

    // Step 1: Type selection
    this.container.querySelector('.cfg-type-cards')?.addEventListener('click', (e) => {
      const card = e.target.closest('.cfg-type-card');
      if (!card) return;
      
      this.state.type = card.dataset.type;
      this.container.querySelectorAll('.cfg-type-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      
      setTimeout(() => this.changeStep(1), 300);
      this.calculatePrice();
    });

    // Step 2 & Manual: Range Sliders
    const ranges = [
      this.container.querySelector('#cfg-volume-range'),
      this.container.querySelector('#cfg-manual-volume')
    ];
    ranges.forEach(r => r?.addEventListener('input', (e) => {
      this.state.volume = parseInt(e.target.value, 10);
      ranges.forEach(range => { if (range && range !== e.target) range.value = this.state.volume; });
      this.updateVolumeDisplays();
      this.calculatePrice();
    }));

    // Step 2 & Manual: Checkboxes (Delegated)
    this.container.querySelectorAll('.cfg-checks').forEach(wrap => {
      wrap.addEventListener('change', (e) => {
        if (e.target.type !== 'checkbox') return;
        const id = e.target.value;
        if (e.target.checked) this.state.options.add(id);
        else this.state.options.delete(id);
        
        // Sync across containers
        this.container.querySelectorAll(`.cfg-checks input[value="${id}"]`).forEach(chk => {
          chk.checked = e.target.checked;
        });
        this.calculatePrice();
      });
    });

    // Step 2 & Manual: Selects
    const selects = [
      this.container.querySelector('#cfg-deadline'),
      this.container.querySelector('#cfg-manual-deadline')
    ];
    selects.forEach(s => s?.addEventListener('change', (e) => {
      this.state.deadline = e.target.value;
      selects.forEach(sel => { if (sel && sel !== e.target) sel.value = this.state.deadline; });
      this.calculatePrice();
    }));

    // Currencies
    this.container.querySelector('.cfg-currency-switch')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.cfg-curr-btn');
      if (!btn) return;
      
      this.state.currency = btn.dataset.currency;
      this.container.querySelectorAll('.cfg-curr-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      this.renderChips();
      this.renderStep2AndManual();
      this.calculatePrice();
    });

    // Presets (Chips)
    this.container.querySelector('.cfg-chips')?.addEventListener('click', (e) => {
      const chip = e.target.closest('.cfg-chip');
      if (!chip) return;
      
      // Update UI active state
      this.container.querySelectorAll('.cfg-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      
      this.applyPreset(chip.dataset.preset);
    });

    // Booking Buttons
    const bookBtn = this.container.querySelector('#cfg-book-wizard');
    if (bookBtn) {
      bookBtn.addEventListener('click', () => {
        const formSection = document.querySelector('.slide-final');
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth' });
          const taskField = document.querySelector('textarea[name="task"]');
          if (taskField && this.state.type) {
             const typeObj = this.data.wizard.step1.options.find(o => o.id === this.state.type);
             const typeLabel = typeObj ? typeObj.label : 'Не выбран';
             const optionsArr = Array.from(this.state.options).map(id => this.data.wizard.step2.checkboxes.find(c => c.id === id)?.label || id);
             
             // Recalculate price just to get total string
             let total = this.data.basePrice + (this.state.volume * this.data.wizard.step2.volume.pricePerUnit);
             this.state.options.forEach(optId => {
               const chk = this.data.wizard.step2.checkboxes.find(c => c.id === optId);
               if (chk) total += chk.priceDelta;
             });
             const dl = this.data.wizard.step2.deadline.find(d => d.id === this.state.deadline);
             if (dl) total += dl.priceDelta;

             taskField.value = `${this.data.serviceName} — ${this.formatPrice(total)} | Тип: ${typeLabel} | Объём: ${this.state.volume} | Опции: ${optionsArr.join(', ') || 'нет'}`;
          }
        }
      });
    }

    const discussBtn = this.container.querySelector('#cfg-discuss-wizard');
    if (discussBtn) {
      discussBtn.addEventListener('click', () => {
        document.querySelector('.slide-final')?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  // ================= LOGIC =================
  switchMode(mode) {
    this.state.mode = mode;
    this.container.dataset.mode = mode;
    
    // Manage visibility manually as fallback if CSS fails
    const initial = this.container.querySelector('.cfg-initial');
    const wizard = this.container.querySelector('.cfg-wizard');
    const manual = this.container.querySelector('.cfg-manual');
    
    if (initial) initial.style.display = mode === 'initial' ? 'flex' : 'none';
    if (wizard) wizard.style.display = mode === 'wizard' ? 'flex' : 'none';
    
    // We only visually show manual toggler in "initial" state usually, or always open
    // By architecture, cfg-manual stays within wizard or initial flow depending on design
    if (mode === 'wizard') {
      this.currentStep = 1;
      this.updateWizardUI();
    }
  }

  changeStep(delta) {
    this.currentStep += delta;
    if (this.currentStep < 1) this.currentStep = 1;
    if (this.currentStep > 3) this.currentStep = 3;
    this.updateWizardUI();
  }

  updateWizardUI() {
    this.container.querySelectorAll('.cfg-step-panel').forEach(p => {
      p.classList.toggle('active', parseInt(p.dataset.step) === this.currentStep);
    });
    
    this.container.querySelectorAll('.cfg-step-indicator').forEach((ind, i) => {
      ind.classList.toggle('active', i + 1 === this.currentStep);
      ind.classList.toggle('completed', i + 1 < this.currentStep);
    });

    const stepLines = this.container.querySelectorAll('.cfg-step-line');
    stepLines.forEach((ln, i) => ln.classList.toggle('filled', i < this.currentStep - 1));

    const prev = this.container.querySelector('.cfg-nav-prev');
    const next = this.container.querySelector('.cfg-nav-next');
    
    if (prev) prev.style.visibility = this.currentStep === 1 ? 'hidden' : 'visible';
    if (next) {
      if (this.currentStep === 3) {
        next.style.display = 'none';
      } else {
        next.style.display = 'inline-flex';
        next.disabled = (this.currentStep === 1 && !this.state.type);
      }
    }
  }

  applyPreset(presetId) {
    const preset = this.data.preSettings.find(p => p.id === presetId);
    if (!preset) return;

    // Dynamic preset logic based on IDs present in the service data
    const availableChecks = this.data.wizard.step2.checkboxes.map(c => c.id);
    
    if (presetId === 'minimum') {
      this.state.type = 'research';
      this.state.volume = this.data.wizard.step2.volume.min;
      this.state.options.clear();
      this.state.deadline = '1month';
    } else if (presetId === 'optimal') {
      this.state.type = 'new';
      this.state.volume = this.data.wizard.step2.volume.default;
      this.state.options.clear();
      if (availableChecks.includes('bitrix')) this.state.options.add('bitrix');
        } else if (presetId === 'full') {
      this.state.type = 'new';
      this.state.volume = Math.round(this.data.wizard.step2.volume.max * 0.5);
      this.state.options.clear();
      ['bitrix', 'telegram', 'pdf', 'email', 'transcription', 'sentiment', 'templates', 'objections', 'debrief', '1c', 'forecast', 'autopurchase', 'optimization', 'visual', 'content', 'analysis', 'brandkit', 'calendar', 'interactive', 'calibration', 'commutation', 'ai', 'remote', 'search', 'scoring', 'documents', 'competitors', 'notifications', 'knowledge', 'security', 'integration', 'reports', 'training', 'cleaning', 'formulas', 'prediction', 'visualization', 'files', 'crm', 'duplicates', 'yaml', 'rag', 'graph', 'plugins', 'team'].forEach(id => {
        if (availableChecks.includes(id)) this.state.options.add(id);
      });
      this.state.deadline = '1month';
    } else if (presetId === 'enterprise') {
      this.state.type = 'new';
      this.state.volume = this.data.wizard.step2.volume.max;
      this.state.options.clear();
      availableChecks.forEach(id => this.state.options.add(id));
      this.state.deadline = this.data.wizard.step2.deadline[0].id; // Usually first is fastest/custom
    }

    this.renderStep1();
    this.renderStep2AndManual();
    this.calculatePrice();
    this.switchMode('wizard');
    this.changeStep(2); // Jump directly to calculation/step 3
  }

  calculatePrice() {
    if (!this.data) return;

    let total = this.data.basePrice;
    const s2 = this.data.wizard.step2;

    // 1. Volume
    const volumeDelta = this.state.volume * s2.volume.pricePerUnit;
    total += volumeDelta;

    // 2. Options
    let optionsTotal = 0;
    const optionsBreakdown = [];
    this.state.options.forEach(optId => {
      const chk = s2.checkboxes.find(c => c.id === optId);
      if (chk) {
        optionsTotal += chk.priceDelta;
        optionsBreakdown.push({ label: chk.label, price: chk.priceDelta });
      }
    });
    total += optionsTotal;

    // 3. Deadline
    const dl = s2.deadline.find(d => d.id === this.state.deadline);
    if (dl) total += dl.priceDelta;

    // Update Totals
    const formatted = this.formatPrice(total);
    const totalWiz = this.container.querySelector('#cfg-total-value');
    const totalMan = this.container.querySelector('#cfg-manual-result-value');
    const totalTog = this.container.querySelector('#cfg-toggle-price-value');
    
    if (totalWiz && totalWiz.textContent !== formatted) this.animateValue(totalWiz, formatted);
    if (totalMan && totalMan.textContent !== formatted) this.animateValue(totalMan, formatted);
    if (totalTog && totalTog.textContent !== formatted) totalTog.textContent = formatted;

    // Update Breakdown
    const breakdown = this.container.querySelector('#cfg-breakdown');
    if (breakdown) {
      let html = `<div class="cfg-price-row"><span class="row-label">Базовая часть:</span> <span class="row-value">${this.formatPrice(this.data.basePrice)}</span></div>`;
      html += `<div class="cfg-price-row"><span class="row-label">Объём (${this.state.volume}):</span> <span class="row-value">${this.formatPrice(volumeDelta)}</span></div>`;
      optionsBreakdown.forEach(opt => {
        html += `<div class="cfg-price-row row-addon"><span class="row-label">+ ${opt.label}</span> <span class="row-value">${this.formatPrice(opt.price)}</span></div>`;
      });
      if (dl && dl.priceDelta !== 0) {
        html += `<div class="cfg-price-row"><span class="row-label">Сроки (${dl.label}):</span> <span class="row-value">${this.formatPrice(dl.priceDelta)}</span></div>`;
      }
      
      const supportPrice = this.data.monthlySupportDefault || 12000;
      html += `<div class="cfg-price-divider"></div>`;
      html += `<div class="cfg-price-row"><span class="row-label">Ежемесячная поддержка:</span> <span class="row-value">${this.formatPrice(supportPrice)}/мес</span></div>`;

      breakdown.innerHTML = html;
    }
  }

  formatPrice(rubValue) {
    const val = rubValue * (this.rates[this.state.currency] || 1);
    const symbol = this.currencySymbols[this.state.currency];
    
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: this.state.currency,
      maximumFractionDigits: this.state.currency === 'BTC' ? 4 : 0
    }).format(val).replace(this.state.currency, symbol);
  }

  animateValue(element, newStr) {
    element.style.transform = 'scale(1.05)';
    element.style.color = 'var(--accent-light)';
    element.textContent = newStr;
    setTimeout(() => { 
      element.style.transform = 'scale(1)'; 
      element.style.color = ''; 
    }, 200);
  }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  new ServiceConfigurator('cfg-service-01', 'services-json/01-deep-client-analysis.json');
  new ServiceConfigurator('cfg-service-02', 'services-json/02-ai-lead-qualifier.json');
  new ServiceConfigurator('cfg-service-03', 'services-json/03-ai-communications-analyst.json');
  new ServiceConfigurator('cfg-service-04', 'services-json/04-ai-persona-generator.json');
  new ServiceConfigurator('cfg-service-05', 'services-json/05-ai-sales-coach.json');
  new ServiceConfigurator('cfg-service-06', 'services-json/06-ai-warehouse-procurement.json');
  new ServiceConfigurator('cfg-service-07', 'services-json/07-ai-marketing-assistant.json');
  new ServiceConfigurator('cfg-service-08', 'services-json/08-ai-visualization-control.json');
  new ServiceConfigurator('cfg-service-09', 'services-json/09-ai-tender-assistant.json');
  new ServiceConfigurator('cfg-service-10', 'services-json/10-ai-corporate-assistant.json');
  new ServiceConfigurator('cfg-service-11', 'services-json/11-ai-smart-google-sheets.json');
  new ServiceConfigurator('cfg-service-12', 'services-json/12-ai-system-organizer.json');
  new ServiceConfigurator('cfg-service-13', 'services-json/13-obsidian-pkm-architect.json');
});
