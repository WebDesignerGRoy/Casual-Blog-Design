/* ===== DATA ===== */
const stories = [
  {
    id: "1", slug: "the-art-of-slowing-down",
    title: "The Art of Slowing Down",
    excerpt: "In a world that celebrates speed, there is a quiet revolution happening in kitchens, studios, and gardens — where people are choosing to do less, but with greater intention.",
    category: "Slow Living",
    image: "./image/hero-featured.jpg",
    date: "March 2026", readTime: "8 min read", author: "Elena Marsh", featured: true,
    body: "There's a peculiar kind of courage in choosing to be still. Not the stillness of stagnation, but the deliberate, breathing kind — the sort that lets you hear your own thoughts for the first time in weeks.\n\nI discovered this on a Tuesday, of all days. The most unremarkable day of the week became the canvas for something quietly extraordinary. I had stepped away from my desk, left my phone on the kitchen counter, and walked — just walked — to the end of my street and back.\n\n\"We are so busy making a living that we forget to make a life,\" a friend once told me over lukewarm coffee. I'd nodded politely at the time, the way you do when something is too true to fully absorb in the moment.\n\nThe slow living movement isn't about doing nothing. It's about doing the right things at the right pace. It's about kneading bread instead of buying it. It's about writing letters instead of texts. It's about having one deep conversation instead of twelve shallow ones.\n\nIn my grandmother's kitchen, time moved differently. She never rushed a risotto. She stirred it the way you'd comfort a child — patiently, rhythmically, knowing that the good things come to those who are willing to stand still long enough to receive them.\n\nPerhaps that's the real art: not of slowing down, but of showing up — fully, presently — to the life that's already happening around you."
  },
  {
    id: "2", slug: "letters-we-never-sent",
    title: "Letters We Never Sent",
    excerpt: "A meditation on the words we carry with us, the conversations left unfinished, and the beauty of putting pen to paper.",
    category: "Reflections",
    image: "./image/story-1.jpg",
    date: "February 2026", readTime: "6 min read", author: "Mara Collins"
  },
  {
    id: "3", slug: "growing-where-youre-planted",
    title: "Growing Where You're Planted",
    excerpt: "How tending a garden became a metaphor for tending to myself — roots, weeds, and all.",
    category: "Culture & Place",
    image: "./image/story-2.jpg",
    date: "February 2026", readTime: "7 min read", author: "Juno Park"
  },
  {
    id: "4", slug: "hands-that-shape-us",
    title: "Hands That Shape Us",
    excerpt: "Inside the studios of makers who believe that craft is not just about creating objects, but about understanding ourselves.",
    category: "Creative Practice",
    image: "./image/story-3.jpg",
    date: "January 2026", readTime: "10 min read", author: "Ravi Menon"
  },
  {
    id: "5", slug: "the-table-is-set",
    title: "The Table Is Set",
    excerpt: "What our kitchens reveal about who we are, where we've been, and how we want to live.",
    category: "Slow Living",
    image: "./image/story-4.jpg",
    date: "January 2026", readTime: "5 min read", author: "Sophie Laurent"
  },
  {
    id: "6", slug: "colour-theory-of-feeling",
    title: "A Colour Theory of Feeling",
    excerpt: "An artist's exploration of how colour shapes mood, memory, and the way we inhabit space.",
    category: "Creative Practice",
    image: "./image/story-5.jpg",
    date: "December 2025", readTime: "9 min read", author: "Kit Nakamura"
  },
  {
    id: "7", slug: "where-the-land-meets-the-sea",
    title: "Where the Land Meets the Sea",
    excerpt: "A coastal journey through the liminal spaces that teach us about impermanence and belonging.",
    category: "Culture & Place",
    image: "./image/story-6.jpg",
    date: "December 2025", readTime: "7 min read", author: "Amira Osei"
  }
];

const categories = [
  { name: "Slow Living", description: "Embracing presence and intention in everyday life" },
  { name: "Creative Practice", description: "Conversations with makers, artists, and thoughtful creators" },
  { name: "Reflections", description: "Personal essays on the things that shape us" },
  { name: "Culture & Place", description: "Exploring how place and community define who we are" }
];

const collections = [
  { name: "Slow Living", count: 12, description: "Embracing presence", icon: "📖" },
  { name: "Creative Practice", count: 8, description: "The maker's way", icon: "🎨" },
  { name: "Culture & Place", count: 10, description: "Stories of belonging", icon: "📍" },
  { name: "Reflections", count: 15, description: "Looking inward", icon: "🪶" }
];

const handDrawnSVG = `<svg width="200" height="8" viewBox="0 0 200 8" style="opacity:.4"><path d="M1 5.5C20 2 40 7 60 4C80 1 100 6 120 3.5C140 1 160 6.5 180 3C190 1.5 199 4.5 199 4.5" stroke="hsl(30,45%,55%)" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`;

/* ===== ROUTER ===== */
const app = document.getElementById('app');
let currentPage = 'home';
let currentSlug = '';
let activeCategory = 'All';

function navigate(page, slug) {
  currentPage = page;
  currentSlug = slug || '';
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateNavActive();
}

function updateNavActive() {
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === currentPage);
  });
}

/* ===== EVENT DELEGATION ===== */
document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-page]');
  if (link) {
    e.preventDefault();
    closeMobileMenu();
    navigate(link.dataset.page, link.dataset.slug);
    return;
  }
  const storyLink = e.target.closest('[data-story]');
  if (storyLink) {
    e.preventDefault();
    closeMobileMenu();
    navigate('story-detail', storyLink.dataset.story);
    return;
  }
  const filterBtn = e.target.closest('[data-filter]');
  if (filterBtn) {
    activeCategory = filterBtn.dataset.filter;
    render();
    return;
  }
});

/* ===== MOBILE MENU ===== */
const mobileToggle = document.getElementById('mobile-toggle');
const mobileDrawer = document.getElementById('mobile-drawer');
const iconMenu = mobileToggle.querySelector('.icon-menu');
const iconClose = mobileToggle.querySelector('.icon-close');

mobileToggle.addEventListener('click', () => {
  const isOpen = !mobileDrawer.classList.contains('hidden');
  if (isOpen) closeMobileMenu();
  else openMobileMenu();
});

function openMobileMenu() {
  mobileDrawer.classList.remove('hidden');
  iconMenu.classList.add('hidden');
  iconClose.classList.remove('hidden');
}
function closeMobileMenu() {
  mobileDrawer.classList.add('hidden');
  iconMenu.classList.remove('hidden');
  iconClose.classList.add('hidden');
}

/* ===== RENDERERS ===== */
function render() {
  switch (currentPage) {
    case 'home': app.innerHTML = renderHome(); break;
    case 'stories': app.innerHTML = renderStories(); break;
    case 'topics': app.innerHTML = renderTopics(); break;
    case 'about': app.innerHTML = renderAbout(); break;
    case 'story-detail': app.innerHTML = renderStoryDetail(); break;
    default: app.innerHTML = render404();
  }
  app.classList.add('fade-in');
  requestAnimationFrame(() => { app.style.animation = 'none'; requestAnimationFrame(() => { app.style.animation = ''; }); });
}

function renderHome() {
  const featured = stories.find(s => s.featured);
  const grid = stories.filter(s => !s.featured);
  return `
    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <a href="#" data-story="${featured.slug}" class="hero-link" style="display:block">
          <div class="hero-grid">
            <div class="img-wrap-relative film-grain">
              <img src="${featured.image}" alt="${featured.title}" class="hero-img" />
            </div>
            <div>
              <span class="hero-category hand-underline">${featured.category}</span>
              <h1 class="hero-title">${featured.title}</h1>
              <p class="hero-excerpt">${featured.excerpt}</p>
              <div class="hero-meta">
                <span>${featured.author}</span>
                <span class="meta-dot">·</span>
                <span>${featured.readTime}</span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>

    <!-- Editorial Grid -->
    <section class="container section-pad">
      <h2 class="section-title">Recent Stories</h2>
      <div class="editorial-grid">
        ${grid[0] ? `
        <a href="#" data-story="${grid[0].slug}" class="card-large card-link" style="display:block">
          <div class="card-img-wrap film-grain"><img src="${grid[0].image}" alt="${grid[0].title}" class="card-img card-img-large" /></div>
          <span class="card-category">${grid[0].category}</span>
          <h3 class="card-title" style="font-size:1.5rem">${grid[0].title}</h3>
          <p class="card-excerpt">${grid[0].excerpt}</p>
        </a>` : ''}
        <div class="stack-col">
          ${grid.slice(1,3).map(s => `
          <a href="#" data-story="${s.slug}" class="card-horizontal card-link">
            <div class="img-wrap-relative film-grain"><img src="${s.image}" alt="${s.title}" class="card-img-sm" /></div>
            <div class="card-h-body">
              <span class="card-category">${s.category}</span>
              <h3 class="card-h-title">${s.title}</h3>
              <span class="card-read-time">${s.readTime}</span>
            </div>
          </a>`).join('')}
        </div>
        ${grid.slice(3).map(s => `
        <a href="#" data-story="${s.slug}" class="card-bottom card-link" style="display:block">
          <div class="card-img-wrap film-grain"><img src="${s.image}" alt="${s.title}" class="card-img card-img-bottom" loading="lazy" /></div>
          <span class="card-category">${s.category}</span>
          <h3 class="card-title">${s.title}</h3>
          <p class="card-excerpt">${s.excerpt}</p>
        </a>`).join('')}
      </div>
    </section>

    <!-- Conversation Starter -->
    <section class="convo-section">
      <div class="convo-inner">
        <div class="svg-divider">${handDrawnSVG}</div>
        <p class="convo-label">The Conversation Starter</p>
        <blockquote class="convo-quote">"What would you do differently if you knew no one was watching?"</blockquote>
        <p class="convo-sub">A question to sit with — no right answers, just honest ones.</p>
        <div class="svg-divider">${handDrawnSVG}</div>
      </div>
    </section>

    <!-- Collections -->
    <section class="container section-pad">
      <h2 class="section-title">Curated Collections</h2>
      <p class="section-desc">Themed gatherings of stories for when you want to go deeper on the things that matter.</p>
      <div class="collections-grid">
        ${collections.map(c => `
        <a href="#" data-page="topics" class="collection-card" style="display:block">
          <div class="collection-icon" style="font-size:1.5rem">${c.icon}</div>
          <h3 class="collection-name">${c.name}</h3>
          <p class="collection-desc">${c.description}</p>
          <span class="collection-count">${c.count} stories</span>
        </a>`).join('')}
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter-section">
      <div class="newsletter-inner">
        <svg width="48" height="36" viewBox="0 0 48 36" style="margin:0 auto 1.5rem;opacity:.6">
          <rect x="2" y="2" width="44" height="32" rx="2" fill="none" stroke="hsl(30,45%,55%)" stroke-width="1.5"/>
          <path d="M2 2L24 20L46 2" fill="none" stroke="hsl(30,45%,55%)" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <h2 class="newsletter-title">Pull up a chair</h2>
        <p class="newsletter-desc">Join the conversation. A gentle letter lands in your inbox — stories, reflections, and quiet inspiration. No noise, no spam, just warmth.</p>
        <form class="newsletter-form" onsubmit="event.preventDefault(); alert('Welcome to the conversation ✉️'); this.reset();">
          <input type="email" placeholder="your@email.com" required class="newsletter-input" />
          <button type="submit" class="newsletter-btn">Join In</button>
        </form>
      </div>
    </section>
  `;
}

function renderStories() {
  return `
    <section class="container section-pad fade-in">
      <h1 class="section-title" style="font-size:1.875rem">All Stories</h1>
      <p class="section-desc">Every conversation, reflection, and quiet discovery — gathered in one place.</p>
      <div class="stories-list">
        ${stories.map((s, i) => `
        <a href="#" data-story="${s.slug}" class="story-row" style="display:grid">
          <div class="img-wrap-relative film-grain${i % 2 === 1 ? ' ' + 'style="order:2"' : ''}" ${i % 2 === 1 ? 'style="order:2"' : ''}>
            <img src="${s.image}" alt="${s.title}" class="story-row-img" loading="lazy" />
          </div>
          <div ${i % 2 === 1 ? 'style="order:1"' : ''}>
            <span class="card-category hand-underline">${s.category}</span>
            <h2 class="story-row-title">${s.title}</h2>
            <p class="story-row-excerpt">${s.excerpt}</p>
            <div class="hero-meta"><span>${s.author}</span><span class="meta-dot">·</span><span>${s.readTime}</span></div>
          </div>
        </a>`).join('')}
      </div>
    </section>
  `;
}

function renderTopics() {
  const filtered = activeCategory === 'All' ? stories : stories.filter(s => s.category === activeCategory);
  return `
    <section class="container section-pad fade-in">
      <h1 class="section-title" style="font-size:1.875rem">Topics</h1>
      <p class="section-desc">Browse by the themes that matter to you.</p>
      <div class="filter-bar">
        <button data-filter="All" class="filter-btn${activeCategory === 'All' ? ' active' : ''}">All</button>
        ${categories.map(c => `<button data-filter="${c.name}" class="filter-btn${activeCategory === c.name ? ' active' : ''}">${c.name}</button>`).join('')}
      </div>
      <div class="topics-grid">
        ${filtered.map(s => `
        <a href="#" data-story="${s.slug}" class="topic-card" style="display:block">
          <div class="img-wrap-relative film-grain"><img src="${s.image}" alt="${s.title}" class="topic-card-img" loading="lazy" /></div>
          <span class="card-category">${s.category}</span>
          <h3 class="topic-card-title">${s.title}</h3>
          <p class="card-excerpt">${s.excerpt}</p>
        </a>`).join('')}
      </div>
    </section>
  `;
}

function renderAbout() {
  return `
    <div class="fade-in">
      <div class="about-header">
        <span class="card-category hand-underline" style="margin-bottom:1.5rem;display:inline-block">Our Manifesto</span>
        <h1 class="about-title">A quiet corner for the curious</h1>
        <p class="about-subtitle">House of Conversation is a home for stories that aren't in a hurry to be told.</p>
      </div>
      <div class="svg-divider">${handDrawnSVG}</div>
      <div class="about-body">
        <p class="drop-cap">We started this project because we believed something was missing from the internet — a place where ideas could breathe. Where stories didn't compete for attention but simply existed, patiently waiting for the right reader at the right moment.</p>
        <p>Think of us as the independent bookshop of the digital world. The kind of place where someone might hand you a magazine and say, "I think you'd like this." Where the shelves are curated with care, not algorithms.</p>
        <blockquote>"We don't want to be the loudest voice in the room. We want to be the friend who listens."</blockquote>
        <p>Our stories explore slow living, creative practice, cultural reflections, and the tender, complicated art of being human. We're drawn to makers, thinkers, and quiet revolutionaries — people who do things with their hands and hearts.</p>
        <p>We believe in the power of long conversations, handwritten letters, and ideas that need more than a headline to unfold. If that sounds like your kind of thing, pull up a chair.</p>
        <div class="svg-divider"><svg width="120" height="8" viewBox="0 0 200 8" style="opacity:.3"><path d="M1 5.5C20 2 40 7 60 4C80 1 100 6 120 3.5C140 1 160 6.5 180 3C190 1.5 199 4.5 199 4.5" stroke="hsl(30,45%,55%)" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg></div>
        <p class="about-sign">With warmth,<br/>The House of Conversation team</p>
      </div>
    </div>
  `;
}

function renderStoryDetail() {
  const story = stories.find(s => s.slug === currentSlug);
  if (!story) return render404();

  const related = stories.filter(s => s.id !== story.id).slice(0, 3);
  const bodyText = story.body || story.excerpt;
  const paragraphs = bodyText.split('\n\n');

  const bodyHTML = paragraphs.map((p, i) => {
    if (p.startsWith('"') && p.endsWith('"')) {
      return `<blockquote>${p}</blockquote>`;
    }
    return `<p${i === 0 ? ' class="drop-cap"' : ''}>${p}</p>`;
  }).join('');

  return `
    <article class="fade-in">
      <div class="img-wrap-relative film-grain">
        <img src="${story.image}" alt="${story.title}" class="story-hero-img" />
      </div>
      <div class="story-content">
        <span class="card-category hand-underline" style="display:inline-block;margin-bottom:1.5rem">${story.category}</span>
        <h1 class="story-detail-title">${story.title}</h1>
        <div class="story-detail-meta">
          <span>${story.author}</span><span class="meta-dot">·</span>
          <span>${story.date}</span><span class="meta-dot">·</span>
          <span>${story.readTime}</span>
        </div>
        <div class="story-body">${bodyHTML}</div>
      </div>
      <div class="svg-divider">${handDrawnSVG}</div>
      <section class="container" style="padding-bottom:5rem">
        <h2 class="section-title">Continue the conversation</h2>
        <div class="related-grid">
          ${related.map(s => `
          <a href="#" data-story="${s.slug}" class="related-card" style="display:block">
            <div class="img-wrap-relative film-grain"><img src="${s.image}" alt="${s.title}" class="related-img" loading="lazy" /></div>
            <span class="card-category">${s.category}</span>
            <h3 class="related-title">${s.title}</h3>
          </a>`).join('')}
        </div>
      </section>
    </article>
  `;
}

function render404() {
  return `
    <div class="not-found fade-in">
      <svg width="200" height="100" viewBox="0 0 200 100" style="margin-bottom:2rem;opacity:.6">
        <text x="50%" y="65" text-anchor="middle" font-family="'Playfair Display',serif" font-size="72" fill="hsl(30,45%,55%)">404</text>
        <path d="M20 85C50 80 80 90 100 82C120 74 150 88 180 83" stroke="hsl(30,45%,55%)" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      </svg>
      <h1>This page wandered off</h1>
      <p>Like a good conversation, some paths are worth exploring — but this one seems to have ended. Let's find our way back.</p>
      <a href="#" data-page="home" class="return-btn">Return home</a>
    </div>
  `;
}

/* ===== INIT ===== */
render();
