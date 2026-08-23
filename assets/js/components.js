'use strict'

window.DuraySite = window.DuraySite || {}

function createModalityCard(item, index) {
  const card = document.createElement('article')
  card.className = 'modality-card'
  card.dataset.modality = item.slug
  card.dataset.category = item.category
  card.innerHTML = `<div class="modality-card__media"><img src="${item.image}" alt="${item.alt}" loading="lazy" decoding="async" width="1456" height="1088"><span>${item.category}</span></div><div class="modality-card__body"><p class="modality-card__number">${String(index + 1).padStart(2, '0')}</p><h3>${item.name}</h3><p>${item.category}</p><button type="button" data-modality-index="${index}" aria-label="Mais informações sobre ${item.name}, ${item.category}">Mais informações <span aria-hidden="true">↗</span></button></div>`
  return card
}

function createTeacherCard(teacher, index) {
  const card = document.createElement('article')
  card.className = 'teacher-card'
  const imageAlt = teacher.imageAlt || `Retrato demonstrativo de ${teacher.name}`
  const badge = teacher.isPlaceholder === false ? teacher.modality : 'EDITAR'
  card.innerHTML = `<button type="button" data-teacher-index="${index}" aria-label="Ver perfil completo de ${teacher.name}"><span class="teacher-card__media"><img src="${teacher.image}" alt="${imageAlt}" loading="lazy" decoding="async" width="1024" height="1280"><small>${badge}</small></span><span class="teacher-card__body"><span class="teacher-card__index">${String(index + 1).padStart(2, '0')}</span><h3>${teacher.name}</h3><span>${teacher.modality}</span><em>Ver perfil <span aria-hidden="true">↗</span></em></span></button>`
  return card
}

function createScheduleDay(item, index) {
  const card = document.createElement('article')
  card.className = 'schedule-day'
  card.innerHTML = `<header class="schedule-day__header"><span>${String(index + 1).padStart(2, '0')}</span><div><small>Modalidade</small><h3>${item.modality}</h3></div></header><ul class="schedule-day__classes">${item.days.map((day) => `<li><strong class="schedule-day__weekday">${day.day}</strong>${day.status ? `<p class="schedule-day__status">${day.status}</p>` : `<div class="schedule-day__times">${day.times.map((slot) => `<div class="schedule-time${slot.kids ? ' schedule-time--kids' : ''}"><time>${slot.time}</time><small>Duração: 1 hora</small>${slot.kids ? '<em>Kids</em>' : ''}</div>`).join('')}</div>`}</li>`).join('')}</ul>`
  return card
}

function createGalleryItem(item, index) {
  const figure = document.createElement('figure')
  figure.className = `gallery-item gallery-item--${(index % 3) + 1}`
  figure.innerHTML = `<button type="button" data-gallery-index="${index}" aria-label="Ampliar: ${item.alt}"><img src="${item.image}" alt="${item.alt}" loading="lazy" decoding="async"><span class="gallery-item__overlay"><small>EDITAR</small><strong>${item.caption}</strong><em aria-hidden="true">↗</em></span></button>`
  return figure
}

function formatEventDate(date) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
    .format(new Date(`${date}T12:00:00`))
    .replace('.', '')
}

function createEventCard(item, index, isPast = false) {
  const card = document.createElement('article')
  card.className = `event-card${isPast ? ' event-card--past' : ''}`
  const modality = item.modality ? `<span class="event-card__tag">${item.modality}</span>` : ''
  const meta = [item.time, item.location].filter(Boolean).map((value) => `<span>${value}</span>`).join('')
  const title = item.name ? `<h4>${item.name}</h4>` : ''
  const description = item.shortDescription || item.description ? `<p>${item.shortDescription || item.description}</p>` : ''
  const hasDetails = Boolean(item.name || item.time || item.location || item.description || item.modality || item.gallery?.length)
  const interestButton = !isPast && item.name ? `<button class="button button--primary event-card__interest" type="button" data-event-interest="${item.id}">Tenho interesse <span aria-hidden="true">↗</span></button>` : ''
  const galleryButton = isPast && item.gallery?.length ? `<button class="button button--outline" type="button" data-event-details="${item.id}" data-focus-gallery="true">Ver fotos <span aria-hidden="true">↗</span></button>` : ''
  const detailsButton = hasDetails ? `<button class="button button--outline" type="button" data-event-details="${item.id}">Ver detalhes <span aria-hidden="true">↗</span></button>` : ''
  const body = hasDetails ? `<div class="event-card__body">${meta ? `<div class="event-card__meta">${meta}</div>` : ''}${modality}${title}${description}<div class="event-card__actions">${detailsButton}${galleryButton}${interestButton}</div></div>` : ''
  card.innerHTML = `<div class="event-card__media"><img src="${item.image}" alt="${item.imageAlt || 'Imagem do evento'}" loading="lazy" decoding="async"><time datetime="${item.date}">${formatEventDate(item.date)}</time></div>${body}`
  card.style.setProperty('--event-index', index)
  return card
}

function createTestimonialCard(item, index) {
  const initials = item.name.split(' ').slice(0, 2).map((word) => word[0]).join('')
  const avatar = item.image ? `<img src="${item.image}" alt="Foto de ${item.name}" loading="lazy" decoding="async">` : `<span aria-hidden="true">${initials}</span>`
  const stars = Array.from({ length: 5 }, (_, star) => `<span class="${star < item.rating ? 'is-filled' : ''}" aria-hidden="true">★</span>`).join('')
  const card = document.createElement('article')
  card.className = 'testimonial-card'
  card.innerHTML = `<div class="testimonial-card__topline"><span class="testimonial-card__number">${String(index + 1).padStart(2, '0')}</span><span class="testimonial-card__label">${item.source}</span></div><div class="testimonial-card__rating" aria-label="${item.rating} de 5 estrelas">${stars}</div><blockquote>“${item.testimonial}”</blockquote><footer><div class="testimonial-card__avatar">${avatar}</div><div><h3>${item.name}</h3><span>${item.source}</span></div></footer>`
  return card
}

window.DuraySite.components = { createModalityCard, createTeacherCard, createScheduleDay, createGalleryItem, createEventCard, createTestimonialCard, formatEventDate }
