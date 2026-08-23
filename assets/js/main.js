'use strict'

document.documentElement.classList.add('js-enabled')
const { config, data, components } = window.DuraySite
const { academy, contact, colors, seo } = config

function applyConfiguration() {
  const variables = { '--color-bg': colors.background, '--color-surface': colors.surface, '--color-surface-raised': colors.surfaceRaised, '--color-text': colors.text, '--color-text-muted': colors.textMuted, '--color-accent': colors.accent, '--color-accent-dark': colors.accentDark }
  Object.entries(variables).forEach(([property, value]) => document.documentElement.style.setProperty(property, value))
  document.title = seo.title
  document.querySelector('meta[name="description"]').content = seo.description
  document.querySelector('meta[property="og:site_name"]').content = academy.name
  document.querySelector('meta[property="og:title"]').content = seo.title
  document.querySelector('meta[property="og:image"]').content = academy.socialImage
  document.querySelector('meta[name="twitter:title"]').content = seo.title
  document.querySelector('meta[name="twitter:image"]').content = academy.socialImage
  const brand = document.querySelector('.brand')
  brand.ariaLabel = `${academy.name} — Início`
  brand.querySelector('img').src = academy.logo
  brand.querySelector('.brand__name').innerHTML = `${academy.primaryName} <small>${academy.secondaryName}</small>`
  document.querySelectorAll('[data-academy-name]').forEach((element) => { element.textContent = academy.name })
  document.querySelectorAll('[data-academy-primary]').forEach((element) => { element.textContent = academy.primaryName })
  document.querySelector('#cta-mark').src = academy.ctaMark
  const message = contact.whatsappMessage.replace('{academy}', academy.name)
  const whatsappUrl = contact.whatsappNumber ? `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}` : ''
  const setOptionalLink = (element, href, fallback = '') => {
    if (href) {
      element.href = href
      element.removeAttribute('aria-disabled')
      element.removeAttribute('title')
      return
    }
    if (fallback) {
      element.href = fallback
      element.removeAttribute('target')
      element.removeAttribute('rel')
      element.removeAttribute('aria-disabled')
      element.title = 'EDITAR — contato ainda não configurado'
      return
    }
    element.removeAttribute('href')
    element.removeAttribute('target')
    element.removeAttribute('rel')
    element.setAttribute('aria-disabled', 'true')
    element.title = 'EDITAR — informação ainda não configurada'
  }
  const whatsappLink = document.querySelector('#whatsapp-link')
  if (whatsappLink) setOptionalLink(whatsappLink, whatsappUrl, '#contato')
  setOptionalLink(document.querySelector('#trial-link'), whatsappUrl, '#contato')
  document.querySelector('#contact-address').textContent = contact.address
  document.querySelector('#contact-phone').textContent = contact.phoneDisplay
  setOptionalLink(document.querySelector('#contact-phone'), contact.phoneNumber ? `tel:+${contact.phoneNumber}` : '')
  document.querySelector('#contact-whatsapp').textContent = contact.whatsappDisplay
  setOptionalLink(document.querySelector('#contact-whatsapp'), whatsappUrl)
  document.querySelector('#contact-instagram').textContent = contact.instagramHandle
  setOptionalLink(document.querySelector('#contact-instagram'), contact.instagramUrl)
  document.querySelector('#contact-hours-number').textContent = '05'
  document.querySelector('#contact-hours').innerHTML = contact.businessHours.map((item) => `<li>${item}</li>`).join('')
  if (contact.mapsEmbedUrl) {
    const mapLink = contact.mapsUrl
      ? `<a class="contact__map-link button button--primary" href="${contact.mapsUrl}" target="_blank" rel="noopener noreferrer">Abrir no Google Maps <span aria-hidden="true">↗</span></a>`
      : ''
    document.querySelector('#contact-map').innerHTML = `<iframe src="${contact.mapsEmbedUrl}" title="Localização da ${academy.name}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>${mapLink}`
  }
}

function setupNavigation() {
  const header = document.querySelector('#site-header')
  const toggle = document.querySelector('.menu-toggle')
  const navigation = document.querySelector('#primary-navigation')
  const closeMenu = (restoreFocus = false) => {
    const wasOpen = document.body.classList.contains('menu-open')
    document.body.classList.remove('menu-open')
    toggle.setAttribute('aria-expanded', 'false')
    toggle.setAttribute('aria-label', 'Abrir menu')
    if (restoreFocus && wasOpen) toggle.focus()
  }
  toggle.addEventListener('click', (event) => {
    event.stopPropagation()
    const open = !document.body.classList.contains('menu-open')
    document.body.classList.toggle('menu-open', open)
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu')
    if (open) requestAnimationFrame(() => navigation.querySelector('a')?.focus())
  })
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu()
    else if (event.target === navigation) closeMenu(true)
  })
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(true) })
  window.addEventListener('resize', () => { if (window.innerWidth >= 1024) closeMenu() })
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 32)
  window.addEventListener('scroll', updateHeader, { passive: true })
  updateHeader()
}

function renderContent() {
  const render = (selector, items, factory) => items.forEach((item, index) => document.querySelector(selector).append(factory(item, index)))
  data.modalities.forEach((item, index) => {
    const selector = item.category === 'Adulto 12+' ? '#adult-modalities-grid' : '#kids-modalities-grid'
    document.querySelector(selector).append(components.createModalityCard(item, index))
  })
  render('#team-grid', data.teachers, components.createTeacherCard)
  const scheduleByAudience = (kids) => data.schedule
    .map((item) => ({
      ...item,
      days: item.days.map((day) => {
        if (day.status) return kids ? null : day
        const times = day.times.filter((slot) => Boolean(slot.kids) === kids)
        return times.length ? { ...day, times } : null
      }).filter(Boolean),
    }))
    .filter((item) => item.days.length)

  render('#adult-schedule-week', scheduleByAudience(false), components.createScheduleDay)
  render('#kids-schedule-week', scheduleByAudience(true), components.createScheduleDay)
  render('#gallery-grid', data.gallery, components.createGalleryItem)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const events = [...(data.events || [])].filter((item) => item.date && !Number.isNaN(new Date(`${item.date}T12:00:00`).getTime()))
  const upcomingEvents = events
    .filter((item) => new Date(`${item.date}T12:00:00`) >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
  const pastEvents = events
    .filter((item) => new Date(`${item.date}T12:00:00`) < today)
    .sort((a, b) => b.date.localeCompare(a.date))
  const renderEventGroup = (selector, items, isPast) => {
    const container = document.querySelector(selector)
    const group = container.closest('.event-group')
    group.hidden = !items.length
    container.classList.toggle('events__grid--single', items.length === 1)
    if (!items.length) {
      container.innerHTML = ''
      return
    }
    items.forEach((item, index) => container.append(components.createEventCard(item, index, isPast)))
  }
  renderEventGroup('#upcoming-events-grid', upcomingEvents, false)
  renderEventGroup('#past-events-grid', pastEvents, true)
  render('#testimonials-grid', data.testimonials, components.createTestimonialCard)
}

function setupTeacherModal() {
  const modal = document.querySelector('#teacher-modal')
  document.querySelector('#team-grid').addEventListener('click', (event) => {
    const button = event.target.closest('[data-teacher-index]')
    if (!button) return
    const teacher = data.teachers[Number(button.dataset.teacherIndex)]
    const fields = { '#teacher-modal-name': teacher.name, '#teacher-modal-role': teacher.modality, '#teacher-modal-teaching': teacher.teachingYears, '#teacher-modal-bio': teacher.biography }
    Object.entries(fields).forEach(([selector, value]) => { document.querySelector(selector).textContent = value })
    document.querySelector('#teacher-modal-image').src = teacher.image
    document.querySelector('#teacher-modal-image').alt = teacher.imageAlt || `Retrato demonstrativo de ${teacher.name}`
    document.querySelector('#teacher-modal-specialties').innerHTML = teacher.specialties.map((item) => `<li>${item}</li>`).join('')
    modal.showModal()
  })
  modal.querySelector('.teacher-modal__close').addEventListener('click', () => modal.close())
  modal.addEventListener('click', (event) => { if (event.target === modal) modal.close() })
}

function setupModalityModal() {
  const modal = document.querySelector('#modality-modal')
  const action = document.querySelector('#modality-modal-action')
  const trialLink = document.querySelector('#trial-link')
  action.href = trialLink.href
  if (trialLink.target) action.target = trialLink.target
  if (trialLink.rel) action.rel = trialLink.rel

  document.querySelector('#modalities-groups').addEventListener('click', (event) => {
    const button = event.target.closest('[data-modality-index]')
    if (!button) return
    const modality = data.modalities[Number(button.dataset.modalityIndex)]
    document.querySelector('#modality-modal-name').textContent = modality.name
    document.querySelector('#modality-modal-category').textContent = modality.category
    document.querySelector('#modality-modal-description').textContent = modality.description
    document.querySelector('#modality-modal-benefits').innerHTML = modality.benefits.map((benefit) => `<li>${benefit}</li>`).join('')
    action.dataset.modalitySlug = modality.slug
    modal.showModal()
  })

  modal.querySelector('.modality-modal__close').addEventListener('click', () => modal.close())
  modal.addEventListener('click', (event) => { if (event.target === modal) modal.close() })
}

function setupBookingForm() {
  const modal = document.querySelector('#booking-modal')
  const form = document.querySelector('#booking-form')
  const ageInput = document.querySelector('#booking-age')
  const ageFeedback = document.querySelector('#booking-age-feedback')
  const modalitySelect = document.querySelector('#booking-modality')
  const daySelect = document.querySelector('#booking-day')
  const timeSelect = document.querySelector('#booking-time')
  const modalityBySlug = new Map(data.modalities.map((item) => [item.slug, item]))
  const scheduleAliases = {
    'Defesa Pessoal Feminina': 'Defesa Pessoal',
    'Treinamento Funcional': 'Funcional',
  }

  const updateModalitiesForAge = (preferredSlug = '') => {
    const age = Number(ageInput.value)
    const isUnderMinimumAge = ageInput.value !== '' && age < 4
    ageFeedback.hidden = !isUnderMinimumAge
    ageInput.setCustomValidity(isUnderMinimumAge ? 'Não temos modalidades disponíveis para crianças menores de 4 anos.' : '')
    const category = age >= 4 && age <= 11
      ? 'Kids 4 a 11 anos'
      : age >= 12 && age <= 100
        ? 'Adulto 12+'
        : ''
    const placeholder = ageInput.value && age < 4
      ? 'Aulas disponíveis a partir de 4 anos'
      : 'Informe a idade primeiro'

    modalitySelect.innerHTML = `<option value="">${category ? 'Selecione uma modalidade' : placeholder}</option>`
    data.modalities
      .filter((item) => item.category === category)
      .forEach((item) => {
        const option = document.createElement('option')
        option.value = item.slug
        option.textContent = item.name
        modalitySelect.append(option)
      })

    modalitySelect.disabled = !category
    if (preferredSlug && [...modalitySelect.options].some((option) => option.value === preferredSlug)) {
      modalitySelect.value = preferredSlug
    }
    updateAvailableDays()
  }

  const getAvailableDays = () => {
    const modality = modalityBySlug.get(modalitySelect.value)
    if (!modality) return []
    const scheduleName = scheduleAliases[modality.name] || modality.name
    const schedule = data.schedule.find((item) => item.modality === scheduleName)
    if (!schedule) return []
    const isKids = modality.category === 'Kids 4 a 11 anos'
    return schedule.days
      .map((day) => ({ ...day, times: (day.times || []).filter((slot) => Boolean(slot.kids) === isKids) }))
      .filter((day) => day.times.length)
  }

  const updateAvailableTimes = () => {
    const day = getAvailableDays().find((item) => item.day === daySelect.value)
    timeSelect.innerHTML = '<option value="">Selecione um horário</option>'
    ;(day?.times || []).forEach((slot) => {
      const option = document.createElement('option')
      option.value = slot.time
      option.textContent = slot.time
      timeSelect.append(option)
    })
    timeSelect.disabled = !day
  }

  const updateAvailableDays = () => {
    const days = getAvailableDays()
    daySelect.innerHTML = '<option value="">Selecione um dia</option>'
    days.forEach((day) => {
      const option = document.createElement('option')
      option.value = day.day
      option.textContent = day.day
      daySelect.append(option)
    })
    daySelect.disabled = !days.length
    updateAvailableTimes()
  }

  modalitySelect.addEventListener('change', updateAvailableDays)
  daySelect.addEventListener('change', updateAvailableTimes)
  ageInput.addEventListener('input', () => updateModalitiesForAge(modalitySelect.value))
  updateModalitiesForAge()

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('.js-booking-trigger')
    if (!trigger) return
    event.preventDefault()
    updateModalitiesForAge(trigger.dataset.modalitySlug || '')
    const openDialog = trigger.closest('dialog[open]')
    if (openDialog && openDialog !== modal) openDialog.close()
    modal.showModal()
    document.querySelector('#booking-name').focus()
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const selectedModality = modalityBySlug.get(modalitySelect.value)
    const message = [
      'Olá! Vim pelo site da Durāy Fight Club e gostaria de agendar uma aula experimental.',
      '',
      `Nome: ${document.querySelector('#booking-name').value.trim()}`,
      `Idade: ${document.querySelector('#booking-age').value} anos`,
      `Modalidade: ${selectedModality.name} — ${selectedModality.category}`,
      `Dia selecionado: ${daySelect.value}`,
      `Horário selecionado: ${timeSelect.value}`,
      `Experiência: ${document.querySelector('#booking-experience').value}`,
    ].join('\n')
    window.open(`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    modal.close()
  })

  modal.querySelector('.booking-modal__close').addEventListener('click', () => modal.close())
  modal.addEventListener('click', (event) => { if (event.target === modal) modal.close() })
}

function setupGallery() {
  const lightbox = document.querySelector('#gallery-lightbox')
  let activeIndex = 0
  const showImage = (index) => {
    activeIndex = (index + data.gallery.length) % data.gallery.length
    const item = data.gallery[activeIndex]
    document.querySelector('#lightbox-image').src = item.image
    document.querySelector('#lightbox-image').alt = item.alt
    document.querySelector('#lightbox-caption').textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(data.gallery.length).padStart(2, '0')} — ${item.caption}`
  }
  document.querySelector('#gallery-grid').addEventListener('click', (event) => {
    const button = event.target.closest('[data-gallery-index]')
    if (!button) return
    showImage(Number(button.dataset.galleryIndex))
    lightbox.showModal()
  })
  lightbox.querySelector('.lightbox__close').addEventListener('click', () => lightbox.close())
  lightbox.querySelector('.lightbox__control--previous').addEventListener('click', () => showImage(activeIndex - 1))
  lightbox.querySelector('.lightbox__control--next').addEventListener('click', () => showImage(activeIndex + 1))
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close() })
  lightbox.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') showImage(activeIndex - 1)
    if (event.key === 'ArrowRight') showImage(activeIndex + 1)
  })
}

function setupEvents() {
  const modal = document.querySelector('#event-modal')
  const eventsSection = document.querySelector('#eventos')
  const findEvent = (id) => (data.events || []).find((item) => String(item.id) === String(id))
  const eventWhatsappUrl = (item) => {
    const message = `Olá! Vim pelo site da Durāy Fight Club e gostaria de saber mais sobre o evento ${item.name}.`
    return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`
  }

  const openEvent = (item, focusGallery = false) => {
    const eventDate = new Date(`${item.date}T12:00:00`)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    document.querySelector('#event-modal-status').textContent = eventDate >= today ? 'Próximo evento' : 'Evento realizado'
    document.querySelector('#event-modal-name').textContent = item.name
    document.querySelector('#event-modal-date').textContent = components.formatEventDate(item.date)
    document.querySelector('#event-modal-location').textContent = item.location || ''
    document.querySelector('#event-modal-location-item').hidden = !item.location
    document.querySelector('#event-modal-description').textContent = item.description
    document.querySelector('#event-modal-image').src = item.image
    document.querySelector('#event-modal-image').alt = item.imageAlt || `Banner de ${item.name}`
    document.querySelector('#event-modal-time').textContent = item.time || ''
    document.querySelector('#event-modal-time-item').hidden = !item.time
    document.querySelector('#event-modal-modality').textContent = item.modality || ''
    document.querySelector('#event-modal-modality-item').hidden = !item.modality
    const gallerySection = document.querySelector('#event-modal-gallery-section')
    const gallery = document.querySelector('#event-modal-gallery')
    gallery.innerHTML = (item.gallery || []).map((photo) => `<img src="${photo.image}" alt="${photo.alt || `Foto do evento ${item.name}`}" loading="lazy" decoding="async">`).join('')
    gallerySection.hidden = !item.gallery?.length
    document.querySelector('#event-modal-whatsapp').href = eventWhatsappUrl(item)
    modal.showModal()
    if (focusGallery && item.gallery?.length) requestAnimationFrame(() => gallerySection.scrollIntoView({ block: 'nearest' }))
  }

  eventsSection.addEventListener('click', (event) => {
    const details = event.target.closest('[data-event-details]')
    const interest = event.target.closest('[data-event-interest]')
    if (details) {
      const item = findEvent(details.dataset.eventDetails)
      if (item) openEvent(item, details.dataset.focusGallery === 'true')
    }
    if (interest) {
      const item = findEvent(interest.dataset.eventInterest)
      if (item) window.open(eventWhatsappUrl(item), '_blank', 'noopener,noreferrer')
    }
  })
  modal.querySelector('.event-modal__close').addEventListener('click', () => modal.close())
  modal.addEventListener('click', (event) => { if (event.target === modal) modal.close() })
}

function setupAnimations() {
  const selectors = ['.hero__content', '.about__heading', '.about__media', '.about__content', '.stat', '.modalities__heading', '.modality-group__heading', '.modality-card', '.team__heading', '.teacher-card', '.schedule__heading', '.schedule-day', '.gallery__heading', '.gallery-item', '.events__heading', '.event-group__heading', '.event-card', '.events__empty', '.testimonials__heading', '.testimonial-card', '.contact__heading', '.contact__details', '.contact__map', '.cta__mark', '.cta__content']
  const targets = document.querySelectorAll(selectors.join(','))
  targets.forEach((element, index) => {
    element.classList.add('reveal')
    element.style.setProperty('--reveal-delay', `${(index % 3) * 70}ms`)
  })
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    targets.forEach((element) => element.classList.add('is-visible'))
    return
  }
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return
    entry.target.classList.add('is-visible')
    observer.unobserve(entry.target)
  }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
  targets.forEach((element) => observer.observe(element))
}

applyConfiguration()
setupNavigation()
renderContent()
setupModalityModal()
setupBookingForm()
setupTeacherModal()
setupGallery()
setupEvents()
setupAnimations()
