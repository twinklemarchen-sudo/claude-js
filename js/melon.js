const SLIDE_COUNT = 12;

const topSlides = document.getElementById('topSlides');
const chartList = document.getElementById('chartList');
const errorBox = document.getElementById('melError');

const escapeHtml = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// 120px 썸네일을 300px로 요청하고, 실패하면 원본 사용
const largeCover = (url) => url.replace('/resize/120/', '/resize/300/');

const itemHtml = (song) => `
  <div class="mel-poster">
    <span class="mel-rank">${song.rank}</span>
    <img src="${escapeHtml(largeCover(song.albumCover))}" alt="${escapeHtml(song.title)} 앨범 커버" loading="lazy"
         onerror="this.onerror=null;this.src='${escapeHtml(song.albumCover)}'">
  </div>
  <p class="mel-title" title="${escapeHtml(song.title)}">${escapeHtml(song.title)}</p>
  <p class="mel-artist" title="${escapeHtml(song.artist)}">${escapeHtml(song.artist)}</p>
  <div class="mel-actions">
    <span class="mel-like">${song.likes.toLocaleString('ko-KR')}</span>
    <button type="button" class="mel-play">듣기</button>
  </div>`;

const initSwiper = () => {
  new Swiper('.top-swiper', {
    slidesPerView: 2,
    spaceBetween: 12,
    speed: 500,
    navigation: { prevEl: '.mel-prev', nextEl: '.mel-next' },
    pagination: { el: '.top-swiper .swiper-pagination', clickable: true },
    breakpoints: {
      640: { slidesPerView: 3, spaceBetween: 16 },
      900: { slidesPerView: 4, spaceBetween: 20 }
    }
  });
};

fetch('./melon.json')
  .then((res) => {
    if (!res.ok) throw new Error(res.status);
    return res.json();
  })
  .then((songs) => {
    const sorted = [...songs].sort((a, b) => a.rank - b.rank);
    topSlides.innerHTML = sorted.slice(0, SLIDE_COUNT)
      .map((song) => `<div class="swiper-slide"><article>${itemHtml(song)}</article></div>`).join('');
    chartList.innerHTML = sorted.slice(SLIDE_COUNT)
      .map((song) => `<li>${itemHtml(song)}</li>`).join('');
    initSwiper();
  })
  .catch(() => {
    errorBox.hidden = false;
    errorBox.textContent = 'melon.json을 불러오지 못했습니다. 파일을 직접 열지 말고 로컬 서버(예: VS Code Live Server)로 실행해 주세요.';
  });
