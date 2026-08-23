'use strict'

// EDITE ESTE ARQUIVO para incluir, remover ou alterar conteúdos do site.
window.DuraySite = window.DuraySite || {}

window.DuraySite.data = {
  modalities: [
    { slug: 'boxe-adulto', name: 'Boxe', category: 'Adulto 12+', description: 'Modalidade de combate em pé baseada em movimentação, defesa e técnicas de golpes com as mãos.', benefits: ['Condicionamento físico', 'Coordenação e agilidade', 'Foco e disciplina'], image: 'assets/images/modality-boxe-yellow.webp', alt: 'Treino de Boxe para adultos' },
    { slug: 'muay-thai-adulto', name: 'Muay Thai', category: 'Adulto 12+', description: 'Arte marcial de combate em pé que desenvolve técnicas de ataque, defesa e movimentação.', benefits: ['Resistência física', 'Coordenação motora', 'Autoconfiança'], image: 'assets/images/modality-muay-thai-yellow.webp', alt: 'Treino de Muay Thai para adultos' },
    { slug: 'jiu-jitsu-adulto', name: 'Jiu-Jitsu', category: 'Adulto 12+', description: 'Arte marcial com ênfase em controle, estratégia, posições e técnicas de solo.', benefits: ['Raciocínio estratégico', 'Consciência corporal', 'Disciplina'], image: 'assets/images/modality-jiu-jitsu-yellow.webp', alt: 'Treino de Jiu-Jitsu para adultos' },
    { slug: 'kickboxing-adulto', name: 'Kickboxing', category: 'Adulto 12+', description: 'Modalidade de combate em pé que combina técnicas de socos, chutes e movimentação.', benefits: ['Condicionamento cardiovascular', 'Agilidade', 'Coordenação'], image: 'assets/images/modality-muay-thai-yellow.webp', alt: 'Treino ilustrativo de Kickboxing para adultos' },
    { slug: 'aikido-adulto', name: 'Aikido', category: 'Adulto 12+', description: 'Arte marcial japonesa voltada ao equilíbrio, controle de movimentos e técnicas de defesa.', benefits: ['Equilíbrio e postura', 'Concentração', 'Consciência corporal'], image: 'assets/images/modality-judo-yellow.webp', alt: 'Treino ilustrativo de Aikido para adultos' },
    { slug: 'defesa-pessoal-feminina', name: 'Defesa Pessoal Feminina', category: 'Adulto 12+', description: 'Prática orientada ao desenvolvimento de percepção, prevenção e fundamentos gerais de defesa pessoal.', benefits: ['Autoconfiança', 'Atenção e percepção', 'Condicionamento físico'], image: 'assets/images/modality-karate-yellow.webp', alt: 'Treino ilustrativo de Defesa Pessoal Feminina' },
    { slug: 'funcional-adulto', name: 'Treinamento Funcional', category: 'Adulto 12+', description: 'Treinamento físico baseado em movimentos integrados e exercícios adaptáveis a diferentes níveis.', benefits: ['Força e resistência', 'Mobilidade', 'Condicionamento geral'], image: 'assets/images/about-training-yellow.webp', alt: 'Treinamento funcional para adultos' },
    { slug: 'taekwondo-kids', name: 'Taekwondo', category: 'Kids 4 a 11 anos', description: 'Arte marcial que trabalha fundamentos técnicos, movimentação e disciplina de forma progressiva.', benefits: ['Coordenação motora', 'Disciplina', 'Equilíbrio'], image: 'assets/images/modality-taekwondo-kids.jpg', alt: 'Criança praticando Taekwondo com supervisão de um instrutor' },
    { slug: 'karate-kids', name: 'Karatê', category: 'Kids 4 a 11 anos', description: 'Arte marcial que desenvolve fundamentos de postura, movimentos técnicos e respeito.', benefits: ['Concentração', 'Coordenação', 'Disciplina'], image: 'assets/images/modality-karate-kids.jpg', alt: 'Crianças praticando Karatê em aula supervisionada' },
    { slug: 'boxe-kids', name: 'Boxe', category: 'Kids 4 a 11 anos', description: 'Prática adaptada ao público infantil com fundamentos de movimentação, coordenação e técnica.', benefits: ['Agilidade', 'Coordenação motora', 'Autoconfiança'], image: 'assets/images/modality-boxe-kids.jpg', alt: 'Criança praticando Boxe com aparadores e supervisão' },
    { slug: 'muay-thai-kids', name: 'Muay Thai', category: 'Kids 4 a 11 anos', description: 'Prática adaptada para crianças, com exercícios progressivos de coordenação, movimentação e disciplina.', benefits: ['Coordenação', 'Condicionamento', 'Disciplina'], image: 'assets/images/modality-muay-thai-kids.jpg', alt: 'Criança praticando Muay Thai com equipamentos de proteção' },
    { slug: 'jiu-jitsu-kids', name: 'Jiu-Jitsu', category: 'Kids 4 a 11 anos', description: 'Prática infantil baseada em movimentos, posições e atividades adequadas ao desenvolvimento motor.', benefits: ['Consciência corporal', 'Raciocínio', 'Respeito'], image: 'assets/images/modality-jiu-jitsu-kids.jpg', alt: 'Crianças praticando Jiu-Jitsu sobre o tatame' },
    { slug: 'ginastica-artistica-kids', name: 'Ginástica Artística', category: 'Kids 4 a 11 anos', description: 'Atividade corporal que trabalha movimentos básicos, equilíbrio, flexibilidade e coordenação.', benefits: ['Flexibilidade', 'Equilíbrio', 'Coordenação motora'], image: 'assets/images/modality-ginastica-artistica-kids.jpg', alt: 'Criança praticando Ginástica Artística com supervisão' },
  ],
  teachers: [
    { name: 'Gabriel Hilel', modality: 'Muay Thai', grade: 'EDITAR — graduação / faixa não informada', practiceYears: 'EDITAR — anos de prática não informados', teachingYears: 'Ministra aulas desde 2022', biography: 'Olá, me chamo João Gabriel, mais conhecido como Gabriel Hilel. Ministro aulas desde 2022 e sou referência na cidade, com mais de 200 horas de formação em seminários dos quais participei com diversos treinadores profissionais, como Rodney Costa, Renan Altamiro e Michael Charuto, entre outros. Sou árbitro profissional e atualmente atuo pela CAMTEC. Além disso, sou promotor de eventos e trago para nossa cidade seminários ministrados por treinadores profissionais de renome. Meu objetivo é mostrar que o Muay Thai vai muito além de apenas uma luta: é um estilo de vida.', specialties: ['Muay Thai', 'Arbitragem profissional', 'Seminários e eventos'], image: 'assets/images/teacher-gabriel-hilel.jpg', imageAlt: 'Professor Gabriel Hilel com equipamentos de treino de Muay Thai', isPlaceholder: false },
    { name: 'EDITAR — Professora 02', modality: 'EDITAR — modalidade', grade: 'EDITAR — graduação / faixa', practiceYears: 'EDITAR — anos de prática', teachingYears: 'EDITAR — anos ensinando', biography: 'EDITAR — insira a trajetória real, formação e abordagem de ensino da professora.', specialties: ['EDITAR — especialidade 01', 'EDITAR — especialidade 02'], image: 'assets/images/teacher-placeholder-02.webp' },
    { name: 'EDITAR — Professor 03', modality: 'EDITAR — modalidade', grade: 'EDITAR — graduação / faixa', practiceYears: 'EDITAR — anos de prática', teachingYears: 'EDITAR — anos ensinando', biography: 'EDITAR — insira a trajetória real, formação e abordagem de ensino do professor.', specialties: ['EDITAR — especialidade 01', 'EDITAR — especialidade 02'], image: 'assets/images/teacher-placeholder-03.webp' },
  ],
  schedule: [
    { modality: 'Jiu-Jitsu', days: [
      { day: 'Segunda-feira', times: [{ time: '21:00' }] },
      { day: 'Terça-feira', times: [{ time: '06:30' }, { time: '15:00' }, { time: '19:00', kids: true }, { time: '20:00' }] },
      { day: 'Quarta-feira', times: [{ time: '21:00' }] },
      { day: 'Quinta-feira', times: [{ time: '06:30' }, { time: '15:00' }, { time: '19:00', kids: true }, { time: '20:00' }] },
      { day: 'Sexta-feira', times: [{ time: '21:00' }] },
    ] },
    { modality: 'Muay Thai', days: [
      { day: 'Segunda-feira', times: [{ time: '07:00' }, { time: '10:00' }, { time: '15:00' }, { time: '18:00', kids: true }, { time: '19:00' }, { time: '20:00' }] },
      { day: 'Terça-feira', times: [{ time: '21:00' }] },
      { day: 'Quarta-feira', times: [{ time: '07:00' }, { time: '10:00' }, { time: '15:00' }, { time: '17:00' }, { time: '18:00', kids: true }, { time: '19:00' }, { time: '20:00' }] },
      { day: 'Quinta-feira', times: [{ time: '21:00' }] },
      { day: 'Sexta-feira', times: [{ time: '07:00' }, { time: '10:00' }, { time: '15:00' }, { time: '17:00' }, { time: '18:00', kids: true }, { time: '19:00' }, { time: '20:00' }] },
    ] },
    { modality: 'Boxe', days: [
      { day: 'Segunda-feira', times: [{ time: '09:00' }, { time: '17:00' }] },
      { day: 'Terça-feira', times: [{ time: '09:00' }, { time: '16:00', kids: true }, { time: '17:00' }, { time: '22:00' }] },
      { day: 'Quarta-feira', status: 'Sem aulas' },
      { day: 'Quinta-feira', times: [{ time: '09:00' }, { time: '16:00', kids: true }, { time: '17:00' }, { time: '22:00' }] },
      { day: 'Sexta-feira', status: 'Sem horário informado' },
    ] },
    { modality: 'Kickboxing', days: [
      { day: 'Segunda-feira', times: [{ time: '08:00' }] },
      { day: 'Terça-feira', times: [{ time: '08:00' }, { time: '14:00' }, { time: '18:00' }] },
      { day: 'Quarta-feira', status: 'Sem aulas' },
      { day: 'Quinta-feira', times: [{ time: '08:00' }, { time: '14:00' }, { time: '18:00' }] },
      { day: 'Sexta-feira', status: 'Sem horário informado' },
    ] },
    { modality: 'Karatê', days: [
      { day: 'Quarta-feira', times: [{ time: '14:00', kids: true }] },
      { day: 'Sexta-feira', times: [{ time: '14:00', kids: true }] },
    ] },
    { modality: 'Taekwondo', days: [
      { day: 'Quarta-feira', times: [{ time: '09:00', kids: true }] },
      { day: 'Sexta-feira', times: [{ time: '09:00', kids: true }] },
    ] },
    { modality: 'Ginástica Artística', days: [
      { day: 'Terça-feira', times: [{ time: '10:15', kids: true }] },
      { day: 'Quarta-feira', times: [{ time: '16:00', kids: true }] },
      { day: 'Quinta-feira', times: [{ time: '10:15', kids: true }] },
      { day: 'Sexta-feira', times: [{ time: '16:00', kids: true }] },
    ] },
    { modality: 'Defesa Pessoal', days: [
      { day: 'Terça-feira', times: [{ time: '06:00 às 07:00' }] },
      { day: 'Quinta-feira', times: [{ time: '06:00 às 07:00' }] },
    ] },
    { modality: 'Aikido', days: [
      { day: 'Quarta-feira', times: [{ time: '17:00 às 18:00' }] },
      { day: 'Sexta-feira', times: [{ time: '17:00 às 18:00' }] },
    ] },
    { modality: 'Funcional', days: [
      { day: 'Quarta-feira', times: [{ time: '06:00 às 07:00' }] },
      { day: 'Sexta-feira', times: [{ time: '06:00 às 07:00' }] },
    ] },
  ],
  // Cadastre eventos reais aqui. Use a data no formato AAAA-MM-DD.
  // Campos: id, name, date, time, location, description, shortDescription,
  // modality, image, imageAlt e gallery (lista opcional de imagens).
  events: [
    {
      id: 'evento-2026-05-17',
      date: '2026-05-17',
      image: 'assets/images/event-group-certificates-2026-05-17.jpg',
      imageAlt: 'Registro de evento realizado pela Durāy Fight Club em 17 de maio de 2026',
      description: 'Pela primeira vez em Campos dos Goytacazes, a Durāy Fight Club recebeu o Seminário Técnico de Muay Thai com Michael Charuto. Uma experiência de aprendizado, novas técnicas e evolução no esporte, com detalhes capazes de fazer a diferença na luta.',
      gallery: [],
    },
    {
      id: 'evento-2026-01-25',
      date: '2026-01-25',
      image: 'assets/images/event-group-certificates-2026-01-25.jpg',
      imageAlt: 'Registro de evento realizado pela Durāy Fight Club em 25 de janeiro de 2026',
      description: 'Seminário técnico de Muay Thai com o treinador Renan Altamiro, um dos principais nomes do Muay Thai nacional e reconhecido como melhor treinador do Rio de Janeiro em 2022, 2023 e 2024. O encontro também contou com a presença dos atletas Matheus Pinokio e Ramon Sayajin, proporcionando um dia de troca de conhecimento e aprendizado.',
      gallery: [],
    },
    {
      id: 'evento-2025-09-28',
      date: '2025-09-28',
      image: 'assets/images/event-group-certificates-2025-09-28.jpg',
      imageAlt: 'Registro de evento realizado pela Durāy Fight Club em 28 de setembro de 2025',
      description: 'Evento com o Grão-Mestre Celso Martins, presidente da Confederação Brasileira de Muay Thai Profissional, líder da Sukhothai Team e treinador de campeões brasileiros e mundiais.',
      gallery: [],
    },
    {
      id: 'evento-2025-04-06',
      date: '2025-04-06',
      image: 'assets/images/event-group-certificates.jpg',
      imageAlt: 'Registro de evento realizado pela Durāy Fight Club em 6 de abril de 2025',
      description: 'Evento com Rodney Costa, treinador de atletas em eventos nacionais e internacionais, como UFC, Bellator, WGP, Attack Fight e Maximum Muay Thai. Foi o primeiro e único treinador carioca a conquistar dois cinturões profissionais no Portuários Stadium, tradicional estádio de Muay Thai do Brasil. Também é colunista do Acervo Thai e comentarista esportivo em canais como Esporte Interativo e Fox Sports.',
      gallery: [],
    },
  ],
  testimonials: [
    { name: 'Jhulia Rangel', source: 'Avaliação do Google', rating: 5, testimonial: 'Excelente lugar, professores muito atenciosos!', image: null },
    { name: 'Kaic Pessanha Nunes', source: 'Avaliação do Google', rating: 5, testimonial: 'Academia é referência na região em todas as modalidades, e o ambiente é perfeito pra atender a necessidade dos alunos!', image: null },
    { name: 'Hellen Simões', source: 'Avaliação do Google', rating: 5, testimonial: 'Lugar amplo, ótimos equipamentos e profissionais capacitados. Atendimento excelente e ambiente muito agradável.', image: null },
    { name: 'Lindenberg Gomes', source: 'Avaliação do Google', rating: 5, testimonial: 'Melhor academia de artes marciais de toda a região! Excelentes profissionais e estrutura impecável!', image: null },
    { name: 'Daniel Pessanha', source: 'Avaliação do Google', rating: 5, testimonial: 'Amplo espaço, muito bom, com materiais de qualidade e mestres com bastante conhecimento e didáticos nas explicações. Super indico!!', image: null },
    { name: 'Davi Iessa', source: 'Avaliação do Google', rating: 5, testimonial: 'Academia boa disponível em vários horários e variedade de artes marciais muito bom!!', image: null },
  ],
  gallery: [
    { image: 'assets/images/gallery-training-bags.jpg', alt: 'Área de treinamento com sacos de pancada da Durāy Fight Club', caption: 'Área de treino com sacos de pancada' },
    { image: 'assets/images/gallery-boxing-ring.jpg', alt: 'Ringue de boxe da Durāy Fight Club', caption: 'Ringue e estrutura de treino' },
    { image: 'assets/images/gallery-academy-overview.jpg', alt: 'Visão ampla da estrutura interna da Durāy Fight Club', caption: 'Estrutura interna da academia' },
    { image: 'assets/images/gallery-certifications.jpg', alt: 'Parede de certificados da equipe da Durāy Fight Club', caption: 'Formação e trajetória da equipe' },
    { image: 'assets/images/gallery-training-area.jpg', alt: 'Área de treino com ringue e sacos de pancada da Durāy Fight Club', caption: 'Espaço preparado para evolução' },
  ],
}
