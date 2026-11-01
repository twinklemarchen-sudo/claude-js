// ===== 설정 =====
const marqueeText = 'POUR THE MOONLIGHT';
const marqueeSpeed = 30; // 초 (한 바퀴 도는 시간)

// ===== 데이터 =====
const flavors = [
  { name: 'WHITE PEACH', note: 'Soft · floral · 13%', bg: '#f2c9b8', ink: '#16151a' },
  { name: 'YUZU', note: 'Bright · zesty · 13%', bg: 'oklch(0.88 0.13 95)', ink: '#16151a' },
  { name: 'ORIGINAL', note: 'Clean · crisp · 16.5%', bg: '#16151a', ink: '#f6f3ec' },
  { name: 'PLUM', note: 'Tart · deep · 13%', bg: 'oklch(0.55 0.13 350)', ink: '#f6f3ec' },
  { name: 'GREEN APPLE', note: 'Fresh · sharp · 13%', bg: 'oklch(0.82 0.12 140)', ink: '#16151a' },
  { name: 'STRAWBERRY', note: 'Sweet · juicy · 13%', bg: 'oklch(0.7 0.16 20)', ink: '#16151a' },
];

const moments = [
  { col: '7 / span 4', label: 'toast under clear sky' },
  { col: '2 / span 4', label: 'cocktail — peach spritz' },
  { col: '9 / span 4', label: 'food pairing — anju' },
  { col: '3 / span 4', label: 'friends, night market' },
  { col: '6 / span 4', label: 'bottle, studio light' },
];

const stories = [
  { tag: 'Guide', title: 'How to pour your first round at a Korean table', body: 'Two hands, turn away, never fill your own glass.', bg: '#f2c9b8' },
  { tag: 'Recipe', title: 'Three yuzu cocktails for long summer nights', body: 'Five minutes, a shaker, plenty of ice.', bg: 'oklch(0.88 0.13 95)' },
  { tag: 'Pairing', title: 'Spicy, salty, crispy: what to eat with plum', body: 'The best anju to balance tart fruit notes.', bg: '#c9d3e6' },
];

// ===== 마퀴: 같은 문장 줄을 두 번 이어 붙여 무한히 흐르게 =====
function makeMarquee(el, text) {
  const run = Array.from({ length: 8 }, () => text).join('  ');
  const inner = document.createElement('div');
  inner.className = 'marquee-inner';
  inner.style.setProperty('--speed', marqueeSpeed + 's');
  for (let k = 0; k < 2; k++) {
    const line = document.createElement('div');
    line.textContent = run;
    inner.appendChild(line);
  }
  el.appendChild(inner);
}

makeMarquee(document.getElementById('marqueeTop'), marqueeText + ' ✦');
makeMarquee(document.getElementById('marqueeTag'), '#DALBIT');

// ===== 맛 슬라이더 =====
const track = document.getElementById('flavorTrack');

flavors.forEach((f) => {
  const card = document.createElement('div');
  card.className = 'flavor';
  card.style.background = f.bg;
  card.style.color = f.ink;
  card.innerHTML = `
    <div class="flavor-text">
      <div class="flavor-name">${f.name}</div>
      <div class="flavor-note">${f.note}</div>
    </div>
    <div class="ph">bottle shot</div>
    <div class="flavor-btn">View more</div>
  `;
  track.appendChild(card);
});

let index = 0;
const maxIndex = flavors.length - 1;

function moveTrack() {
  track.style.transform = `translateX(calc(${-index} * (var(--card-w) + 20px)))`;
}

document.getElementById('prevBtn').addEventListener('click', () => {
  index = Math.max(0, index - 1);
  moveTrack();
});

document.getElementById('nextBtn').addEventListener('click', () => {
  index = Math.min(maxIndex, index + 1);
  moveTrack();
});

// ===== 순간 =====
const momentsGrid = document.getElementById('momentsGrid');

moments.forEach((m) => {
  const tile = document.createElement('div');
  tile.className = 'moment';
  tile.style.gridColumn = m.col;
  tile.textContent = m.label;
  momentsGrid.appendChild(tile);
});

// ===== 이야기 =====
const storiesGrid = document.getElementById('storiesGrid');

stories.forEach((s) => {
  const card = document.createElement('div');
  card.className = 'story';
  card.style.background = s.bg;
  card.innerHTML = `
    <div class="story-tag">${s.tag}</div>
    <div class="story-text">
      <div class="story-title">${s.title}</div>
      <div class="story-body">${s.body}</div>
    </div>
  `;
  storiesGrid.appendChild(card);
});
