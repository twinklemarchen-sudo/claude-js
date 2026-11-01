// ===== 데이터 =====
const blocks = [
  { badge: '신용을 보호해주세요!', label: '내 신용조회차단', icon: '방패' },
  { badge: '명의를 보호해주세요!', label: '내 명의도용차단', icon: '사람·자물쇠' },
];

const services = [
  { name: '점수 올리기', tint: '#cfe3ff' },
  { name: '연체 방지', tint: '#e2e4ea' },
  { name: '신용조회차단', tint: '#ffd0d0' },
  { name: '명의도용차단', tint: '#ffd0d0' },
  { name: '대출가능진단', tint: '#cfe3ff', tag: 'N' },
  { name: '카드발급진단', tint: '#d9d2f5' },
  { name: '보험혜택진단', tint: '#f6d7de' },
  { name: '이름 어때', tint: '#cfe3ff', tag: 'HOT' },
];

const ads = [
  { title: '예시저축은행 신용대출', l1: '금리 최대 2% 할인', l2: '혜택을 받아볼 수 있어요!', big: '2%', bg: '#2d6fd6' },
  { title: '예시캐피탈 대환대출', l1: '여러 대출을 하나로', l2: '이자 부담을 줄여보세요', big: '1↓', bg: '#7a52d1' },
  { title: '예시카드 첫 결제', l1: '연회비 100% 캐시백', l2: '이번 달 한정 이벤트', big: '₩0', bg: '#e0654a' },
];

const benefits = [
  { kicker: '개인/커플/사업자/집주인', title: '내 신용을 제출할 때\n신용보고서', bg: '#f4f5f7', fg: '#16181d', icon: '보고서' },
  { kicker: '#이름분석 #이름랭킹 #이름추천', title: '나와 똑같은 이름\n전국에 몇 명?', bg: '#f4f5f7', fg: '#16181d', icon: '말풍선' },
  { kicker: '신용점수 예측하기', title: '대출 신규로 받으면\n내 신용점수는?', bg: '#FF0000', fg: '#ffffff', icon: '그래프' },
  { kicker: '무료 신용조회', title: '나의 신용점수\n무료로 조회해보세요', bg: '#f4f5f7', fg: '#16181d', icon: '게이지' },
  { kicker: '예시저축은행 신용대출', title: '내 대출한도가\n도착했습니다!', bg: '#fdf0ed', fg: '#16181d', icon: '알림' },
  { kicker: '맞춤 채무 조정', title: '해결되지 않는 연체\n회생파산 무료 진단', bg: '#fdf6e6', fg: '#16181d', icon: '건물' },
];

const perks = [
  { kicker: '맞춤형 대출상품', title: '내 신용점수로\n대출진단 받기', bg: '#efecfb', circle: '#ddd6f6' },
  { kicker: '보험혜택진단', title: '나에게 맞는\n혜택 받기', bg: '#fdf6e6', circle: '#f7e6b8' },
  { kicker: '맞춤형 카드상품', title: '내 신용에 맞는\n퍼스널카드 찾기!', bg: '#fcebf1', circle: '#f6d2df' },
  { kicker: '맞춤 채무조정 솔루션', title: '채무나 연체\n있으신가요?', bg: '#edf2fa', circle: '#d6e2f4' },
];

// ===== 공통: 페이지 점 만들기 =====
// container 안에 점 버튼 n개를 만들고, 클릭하면 onClick(i)를 호출한다.
// 반환값 setActive(i)로 현재 점을 바꾼다.
function makeDots(container, n, onClick) {
  const buttons = [];
  for (let i = 0; i < n; i++) {
    const btn = document.createElement('button');
    btn.setAttribute('aria-label', `${i + 1}번째`);
    btn.addEventListener('click', () => onClick(i));
    container.insertBefore(btn, container.querySelector('.ad-note')); // 광고 문구 앞에 넣기
    buttons.push(btn);
  }
  return function setActive(cur) {
    buttons.forEach((btn, i) => btn.classList.toggle('on', i === cur));
  };
}

// ===== 히어로 슬라이더 =====
const hero = document.getElementById('hero');
const heroCards = hero.querySelectorAll('.hero-card');
const HERO_PAGES = 3; // 마지막 카드는 3페이지에서 함께 보이므로 점은 3개

const setHeroDot = makeDots(document.getElementById('heroDots'), HERO_PAGES, (i) => {
  hero.scrollTo({ left: heroCards[i].offsetLeft - hero.offsetLeft, behavior: 'smooth' });
});
setHeroDot(0);

hero.addEventListener('scroll', () => {
  // 스크롤 위치와 가장 가까운 카드 찾기
  let nearest = 0;
  heroCards.forEach((card, i) => {
    const d = Math.abs(card.offsetLeft - hero.offsetLeft - hero.scrollLeft);
    const best = Math.abs(heroCards[nearest].offsetLeft - hero.offsetLeft - hero.scrollLeft);
    if (d < best) nearest = i;
  });
  setHeroDot(Math.min(nearest, HERO_PAGES - 1));
});

// ===== 신용조회차단 / 명의도용차단 토글 =====
const protect = document.getElementById('protect');
const side = protect.querySelector('.side');

blocks.forEach((b) => {
  let released = true; // true = 해제 중, false = 차단 중

  const el = document.createElement('div');
  el.className = 'block';
  el.innerHTML = `
    <span class="badge">${b.badge}</span>
    <div class="block-body">
      <div class="label">${b.label}</div>
      <button class="status"></button>
      <div class="ph">${b.icon}</div>
    </div>`;

  const status = el.querySelector('.status');
  const render = () => {
    status.textContent = (released ? '해제 중' : '차단 중') + ' ›';
    status.classList.toggle('blocking', !released);
  };
  status.addEventListener('click', () => {
    released = !released;
    render();
  });
  render();

  protect.insertBefore(el, side);
});

// ===== 서비스 아이콘 =====
document.getElementById('services').innerHTML = services.map((s) => `
  <a href="#" class="service">
    <div class="service-icon">
      <i style="background:${s.tint}"></i>
      ${s.tag ? `<span class="tag">${s.tag}</span>` : ''}
    </div>${s.name}
  </a>`).join('');

// ===== 광고 배너 (4초마다 자동 넘김) =====
let adIndex = 0;
const setAdDot = makeDots(document.getElementById('adDots'), ads.length, (i) => showAd(i));

function showAd(i) {
  adIndex = i;
  const ad = ads[i];
  document.getElementById('adTitle').textContent = ad.title;
  document.getElementById('adDesc').innerHTML = `${ad.l1}<br>${ad.l2}`;
  const big = document.getElementById('adBig');
  big.textContent = ad.big;
  big.style.background = ad.bg;
  setAdDot(i);
}
showAd(0);
setInterval(() => showAd((adIndex + 1) % ads.length), 4000);

// ===== 혜택 정보 카드 =====
document.getElementById('benefits').innerHTML = benefits.map((c) => `
  <a href="#" class="benefit" style="background:${c.bg};color:${c.fg}">
    <div class="kicker">${c.kicker}</div>
    <div class="benefit-title">${c.title}</div>
    <div class="ph">${c.icon}</div>
  </a>`).join('');

// ===== 세상에 이런 혜택이 =====
document.getElementById('perks').insertAdjacentHTML('afterbegin', perks.map((p) => `
  <a href="#" class="perk" style="background:${p.bg}">
    <div class="perk-circle" style="background:${p.circle}"></div>
    <div class="perk-kicker">${p.kicker}</div>
    <div class="perk-title">${p.title}</div>
  </a>`).join(''));

// ===== 전체메뉴 토글 =====
const menuBtn = document.querySelector('.menu-btn');
const menuPopup = document.querySelector('.menu-popup');

menuBtn.addEventListener('click', () => {
  menuPopup.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!menuBtn.contains(e.target) && !menuPopup.contains(e.target)) {
    menuPopup.classList.remove('active');
  }
});

// ===== 검색 모달 토글 =====
const searchIcon = document.getElementById('search');
const searchModal = document.querySelector('.search-modal');
const searchModalClose = document.querySelector('.search-modal-close');
const searchModalBackdrop = document.querySelector('.search-modal-backdrop');

searchIcon.addEventListener('click', () => {
  searchModal.classList.toggle('active');
});

searchModalClose.addEventListener('click', () => {
  searchModal.classList.remove('active');
});

searchModalBackdrop.addEventListener('click', () => {
  searchModal.classList.remove('active');
});

// ===== 신용점수 탭 메뉴 =====
const scoreDisplay = document.getElementById('score-display');
const tabBtns = document.querySelectorAll('.tab-btn');

tabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    tabBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    scoreDisplay.textContent = btn.dataset.score;
  });
});

// ===== #small 카드 내부 전용 Swiper =====
// #hero는 기존 가로 스크롤 그대로 유지합니다.
if (typeof Swiper !== 'undefined' && document.querySelector('#small .small-swiper')) {
  new Swiper('#small .small-swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 550,
    nested: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    observer: true,
    observeParents: true
  });
}
