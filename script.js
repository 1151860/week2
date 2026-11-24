const body = document.body;
const themes = ['theme-sun', 'theme-garden', 'theme-night'];
const themeNames = ['暖陽色', '森林綠', '靜夜藍'];
let themeIndex = 0;

document.querySelector('.theme-toggle').addEventListener('click', () => {
  body.classList.remove(...themes);
  themeIndex = (themeIndex + 1) % themes.length;
  body.classList.add(themes[themeIndex]);
  document.querySelector('.theme-toggle').setAttribute('aria-label', `目前配色：${themeNames[themeIndex]}，點擊切換`);
});

const featurePictures = {
  '星塵鬥士的埃及旅程': {
    file: 'images/stardust-crusaders.png',
    alt: '星塵鬥士篇章插圖',
    title: '星塵鬥士'
  },
  '不滅鑽石的杜王町小鎮': {
    file: 'images/diamond-is-unbreakable.png',
    alt: '不滅鑽石篇章插圖',
    title: '不滅鑽石'
  },
  '黃金之風的義大利冒險': {
    file: 'images/golden-wind.png',
    alt: '黃金之風篇章插圖',
    title: '黃金之風'
  },
  '石之海的監獄故事': {
    file: 'images/stone-ocean.png',
    alt: '石之海篇章插圖',
    title: '石之海'
  },
  '飆馬野郎的橫越大陸競賽': {
    file: 'images/steel-ball-run.png',
    alt: '飆馬野郎篇章插圖',
    title: '飆馬野郎'
  }
};

const featureNotes = {
  '星塵鬥士的埃及旅程': '承太郎和夥伴踏上前往埃及的旅程，迎戰各種替身能力。',
  '不滅鑽石的杜王町小鎮': '杜王町看似平靜，日常生活裡卻藏著神祕事件。',
  '黃金之風的義大利冒險': '喬魯諾和夥伴在義大利並肩行動，朝自己的理想前進。',
  '石之海的監獄故事': '徐倫在監獄中面對危機，逐步揭開背後的陰謀。',
  '飆馬野郎的橫越大陸競賽': '喬尼與傑洛加入橫越美國的賽馬，展開漫長冒險。'
};

function updateFeaturePicture() {
  const selected = document.querySelector('input[name="feature"]:checked');
  const picture = featurePictures[selected.value];
  const image = document.querySelector('#feature-image');
  const emptyMessage = document.querySelector('#feature-image-empty');
  const caption = document.querySelector('#feature-image-caption');
  document.querySelector('#part-note-text').textContent = featureNotes[selected.value];

  caption.textContent = picture ? `${picture.title}｜對應插圖` : '這部的插圖還沒提供';
  if (picture) {
    image.src = picture.file;
    image.alt = picture.alt;
    image.hidden = false;
    emptyMessage.hidden = true;
  } else {
    image.removeAttribute('src');
    image.hidden = true;
    emptyMessage.hidden = false;
  }
}

document.querySelectorAll('input[name="feature"]').forEach((choice) => {
  choice.addEventListener('change', updateFeaturePicture);
});
updateFeaturePicture();

document.querySelector('#feature-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const feature = form.elements.feature.value;
  const tone = form.elements.tone.value;
  document.querySelector('#feature-result').textContent = `《JOJO 的奇妙冒險》的「${feature}」，最值得推薦的是${tone}。`;
});

document.querySelector('#surprise-button').addEventListener('click', () => {
  const choices = [...document.querySelectorAll('input[name="feature"]')];
  const pick = choices[Math.floor(Math.random() * choices.length)];
  pick.checked = true;
  updateFeaturePicture();
  const label = pick.nextElementSibling.textContent;
  const tone = document.querySelector('#tone').value;
  document.querySelector('#feature-result').textContent = `驚喜推薦：《${label}》！可以從「${tone}」開始認識這一部。`;
});

document.querySelector('#guest-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const nickname = form.elements.nickname.value.trim();
  const favorite = form.elements.favorite.value;
  const status = form.elements.status.value;
  document.querySelector('#guest-result').textContent = `${nickname}，收到！「${favorite}」已記錄為你的${status}推薦。`;
});
