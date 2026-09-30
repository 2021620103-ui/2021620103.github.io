/**
 * Google Style Start Homepage
 * Weather (Seoul & Jeju) + Google Search + Quotes + Utilities
 */

// ==========================================
// 1. Weather Module (Seoul & Jeju)
// ==========================================
const CITIES = {
  seoul: {
    name: '서울',
    lat: 37.5665,
    lon: 126.9780,
    tempEl: document.getElementById('seoulTemp'),
    condEl: document.getElementById('seoulCondition'),
    iconEl: document.getElementById('seoulIcon'),
    minMaxEl: document.getElementById('seoulMinMax'),
    feelsLikeEl: document.getElementById('seoulFeelsLike'),
    humidityEl: document.getElementById('seoulHumidity'),
    windEl: document.getElementById('seoulWind')
  },
  jeju: {
    name: '제주',
    lat: 33.4996,
    lon: 126.5312,
    tempEl: document.getElementById('jejuTemp'),
    condEl: document.getElementById('jejuCondition'),
    iconEl: document.getElementById('jejuIcon'),
    minMaxEl: document.getElementById('jejuMinMax'),
    feelsLikeEl: document.getElementById('jejuFeelsLike'),
    humidityEl: document.getElementById('jejuHumidity'),
    windEl: document.getElementById('jejuWind')
  }
};

/**
 * WMO Weather interpretation code mapper
 */
function getWeatherInfo(code, isDay = 1) {
  // WMO Codes
  switch (code) {
    case 0:
      return {
        text: '맑음',
        svg: isDay ? getSunSvg() : getMoonSvg()
      };
    case 1:
      return {
        text: '대체로 맑음',
        svg: isDay ? getSunCloudSvg() : getMoonCloudSvg()
      };
    case 2:
      return {
        text: '구름 조금',
        svg: getSunCloudSvg()
      };
    case 3:
      return {
        text: '흐림',
        svg: getOvercastSvg()
      };
    case 45:
    case 48:
      return {
        text: '안개',
        svg: getFogSvg()
      };
    case 51:
    case 53:
    case 55:
      return {
        text: '이슬비',
        svg: getDrizzleSvg()
      };
    case 56:
    case 57:
      return {
        text: '어는 이슬비',
        svg: getSnowSvg()
      };
    case 61:
    case 63:
    case 65:
      return {
        text: '비',
        svg: getRainSvg()
      };
    case 66:
    case 67:
      return {
        text: '어는 비',
        svg: getSnowSvg()
      };
    case 71:
    case 73:
    case 75:
    case 77:
      return {
        text: '눈',
        svg: getSnowSvg()
      };
    case 80:
    case 81:
    case 82:
      return {
        text: '소나기',
        svg: getShowersSvg()
      };
    case 85:
    case 86:
      return {
        text: '눈 소나기',
        svg: getSnowSvg()
      };
    case 95:
    case 96:
    case 99:
      return {
        text: '뇌우',
        svg: getThunderSvg()
      };
    default:
      return {
        text: '구름 조금',
        svg: getSunCloudSvg()
      };
  }
}

// Weather SVG Generators
function getSunSvg() {
  return `<svg class="weather-icon-svg" viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="10" fill="#fbbc05"/>
    <g stroke="#fbbc05" stroke-width="3" stroke-linecap="round">
      <line x1="24" y1="4" x2="24" y2="9"/>
      <line x1="24" y1="39" x2="24" y2="44"/>
      <line x1="4" y1="24" x2="9" y2="24"/>
      <line x1="39" y1="24" x2="44" y2="24"/>
      <line x1="9.86" y1="9.86" x2="13.39" y2="13.39"/>
      <line x1="34.61" y1="34.61" x2="38.14" y2="38.14"/>
      <line x1="9.86" y1="38.14" x2="13.39" y2="34.61"/>
      <line x1="34.61" y1="13.39" x2="38.14" y2="9.86"/>
    </g>
  </svg>`;
}

function getMoonSvg() {
  return `<svg class="weather-icon-svg" viewBox="0 0 48 48">
    <path fill="#fbbc05" d="M34 26.5A13.5 13.5 0 0 1 21.5 13a13.3 13.3 0 0 1 1-5 15 15 0 1 0 16.5 23.5 13.4 13.4 0 0 1-5-5z"/>
  </svg>`;
}

function getSunCloudSvg() {
  return `<svg class="weather-icon-svg" viewBox="0 0 48 48">
    <circle cx="19" cy="19" r="8" fill="#fbbc05"/>
    <path fill="#90caf9" d="M37 36H16a9 9 0 0 1-1.34-17.9 11.5 11.5 0 0 1 22.34 2.9A7.5 7.5 0 0 1 37 36z"/>
    <path fill="#e3f2fd" d="M36 34H17a7.5 7.5 0 0 1-1.12-14.92 9.5 9.5 0 0 1 18.52 2.42A6.5 6.5 0 0 1 36 34z"/>
  </svg>`;
}

function getMoonCloudSvg() {
  return `<svg class="weather-icon-svg" viewBox="0 0 48 48">
    <path fill="#fbbc05" d="M26 18a9 9 0 0 1-8.5-8.5 9 9 0 0 1 .6-3.3 10.5 10.5 0 1 0 11.2 14.8A8.8 8.8 0 0 1 26 18z"/>
    <path fill="#90caf9" d="M37 36H16a9 9 0 0 1-1.34-17.9 11.5 11.5 0 0 1 22.34 2.9A7.5 7.5 0 0 1 37 36z"/>
  </svg>`;
}

function getOvercastSvg() {
  return `<svg class="weather-icon-svg" viewBox="0 0 48 48">
    <path fill="#b0bec5" d="M34 35H15a9 9 0 0 1-1.3-17.9 11.5 11.5 0 0 1 22.3 2.9A7.5 7.5 0 0 1 34 35z"/>
    <path fill="#cfd8dc" d="M38 38H17a8 8 0 0 1-1.2-15.9 10.5 10.5 0 0 1 20.4 2.6A6.5 6.5 0 0 1 38 38z"/>
  </svg>`;
}

function getRainSvg() {
  return `<svg class="weather-icon-svg" viewBox="0 0 48 48">
    <path fill="#90caf9" d="M36 28H15a8 8 0 0 1-1.2-15.9 10.5 10.5 0 0 1 20.4 2.6A6.5 6.5 0 0 1 36 28z"/>
    <g stroke="#4285f4" stroke-width="2.5" stroke-linecap="round">
      <line x1="16" y1="33" x2="14" y2="40"/>
      <line x1="24" y1="33" x2="22" y2="40"/>
      <line x1="32" y1="33" x2="30" y2="40"/>
    </g>
  </svg>`;
}

function getDrizzleSvg() {
  return `<svg class="weather-icon-svg" viewBox="0 0 48 48">
    <path fill="#b0bec5" d="M36 28H15a8 8 0 0 1-1.2-15.9 10.5 10.5 0 0 1 20.4 2.6A6.5 6.5 0 0 1 36 28z"/>
    <g stroke="#64b5f6" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 3">
      <line x1="18" y1="32" x2="16" y2="38"/>
      <line x1="26" y1="32" x2="24" y2="38"/>
      <line x1="34" y1="32" x2="32" y2="38"/>
    </g>
  </svg>`;
}

function getShowersSvg() {
  return `<svg class="weather-icon-svg" viewBox="0 0 48 48">
    <circle cx="16" cy="16" r="7" fill="#fbbc05"/>
    <path fill="#78909c" d="M36 29H15a8 8 0 0 1-1.2-15.9 10.5 10.5 0 0 1 20.4 2.6A6.5 6.5 0 0 1 36 29z"/>
    <g stroke="#1976d2" stroke-width="2.5" stroke-linecap="round">
      <line x1="16" y1="34" x2="13" y2="42"/>
      <line x1="23" y1="34" x2="20" y2="42"/>
      <line x1="30" y1="34" x2="27" y2="42"/>
    </g>
  </svg>`;
}

function getSnowSvg() {
  return `<svg class="weather-icon-svg" viewBox="0 0 48 48">
    <path fill="#cfd8dc" d="M36 28H15a8 8 0 0 1-1.2-15.9 10.5 10.5 0 0 1 20.4 2.6A6.5 6.5 0 0 1 36 28z"/>
    <g fill="#90caf9">
      <circle cx="17" cy="35" r="2.5"/>
      <circle cx="25" cy="38" r="2.5"/>
      <circle cx="33" cy="35" r="2.5"/>
    </g>
  </svg>`;
}

function getThunderSvg() {
  return `<svg class="weather-icon-svg" viewBox="0 0 48 48">
    <path fill="#455a64" d="M36 26H15a8 8 0 0 1-1.2-15.9 10.5 10.5 0 0 1 20.4 2.6A6.5 6.5 0 0 1 36 26z"/>
    <polygon points="25,27 20,36 24,36 21,44 29,33 25,33" fill="#fbbc05"/>
  </svg>`;
}

function getFogSvg() {
  return `<svg class="weather-icon-svg" viewBox="0 0 48 48">
    <path fill="#cfd8dc" d="M34 22H16a7 7 0 0 1-1-13.9 9 9 0 0 1 17.5 2.2A5.5 5.5 0 0 1 34 22z"/>
    <g stroke="#90a4ae" stroke-width="3" stroke-linecap="round">
      <line x1="10" y1="28" x2="38" y2="28"/>
      <line x1="14" y1="34" x2="34" y2="34"/>
      <line x1="12" y1="40" x2="36" y2="40"/>
    </g>
  </svg>`;
}

/**
 * Fetch live weather from Open-Meteo API
 */
async function fetchCityWeather(cityKey) {
  const city = CITIES[cityKey];
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Weather fetch failed: ${response.status}`);
    const data = await response.json();

    const current = data.current;
    const daily = data.daily;

    const temp = Math.round(current.temperature_2m);
    const feelsLike = Math.round(current.apparent_temperature);
    const humidity = current.relative_humidity_2m;
    const wind = Math.round(current.wind_speed_10m);
    const weatherCode = current.weather_code;
    const isDay = current.is_day !== undefined ? current.is_day : 1;

    const maxTemp = Math.round(daily.temperature_2m_max[0]);
    const minTemp = Math.round(daily.temperature_2m_min[0]);

    const weatherInfo = getWeatherInfo(weatherCode, isDay);

    // Update DOM
    city.tempEl.innerHTML = `${temp}<span class="unit">°C</span>`;
    city.condEl.textContent = weatherInfo.text;
    city.iconEl.innerHTML = weatherInfo.svg;
    city.minMaxEl.textContent = `${maxTemp}° / ${minTemp}°`;
    city.feelsLikeEl.textContent = `${feelsLike}°C`;
    city.humidityEl.textContent = `${humidity}%`;
    city.windEl.textContent = `${wind} km/h`;

  } catch (error) {
    console.warn(`[Weather] Using fallback data for ${city.name}:`, error);
    applyFallbackWeather(cityKey);
  }
}

/**
 * Fallback values in case of offline/network issues
 */
function applyFallbackWeather(cityKey) {
  const city = CITIES[cityKey];
  const isSeoul = cityKey === 'seoul';
  
  const mock = isSeoul ? {
    temp: 20,
    cond: '대체로 맑음',
    icon: getSunCloudSvg(),
    minMax: '24° / 15°',
    feelsLike: '22°C',
    humidity: '80%',
    wind: '4 km/h'
  } : {
    temp: 24,
    cond: '맑음',
    icon: getSunSvg(),
    minMax: '25° / 19°',
    feelsLike: '26°C',
    humidity: '75%',
    wind: '7 km/h'
  };

  city.tempEl.innerHTML = `${mock.temp}<span class="unit">°C</span>`;
  city.condEl.textContent = mock.cond;
  city.iconEl.innerHTML = mock.icon;
  city.minMaxEl.textContent = mock.minMax;
  city.feelsLikeEl.textContent = mock.feelsLike;
  city.humidityEl.textContent = mock.humidity;
  city.windEl.textContent = mock.wind;
}

async function updateAllWeather() {
  const refreshBtn = document.getElementById('weatherRefreshBtn');
  if (refreshBtn) refreshBtn.classList.add('rotating');

  await Promise.all([
    fetchCityWeather('seoul'),
    fetchCityWeather('jeju')
  ]);

  if (refreshBtn) {
    setTimeout(() => {
      refreshBtn.classList.remove('rotating');
    }, 600);
  }
}


// ==========================================
// 2. Google Search & Autocomplete
// ==========================================
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchBoxWrapper = document.getElementById('searchBoxWrapper');
const clearBtn = document.getElementById('clearBtn');
const voiceBtn = document.getElementById('voiceBtn');
const lensBtn = document.getElementById('lensBtn');
const btnSearch = document.getElementById('btnSearch');
const btnLucky = document.getElementById('btnLucky');
const suggestionsDropdown = document.getElementById('suggestionsDropdown');
const suggestionsList = document.getElementById('suggestionsList');

const POPULAR_SUGGESTIONS = [
  '오늘의 주요 뉴스',
  '서울 날씨',
  '제주도 여행 코스',
  '실시간 환율 정보',
  '유튜브 인기 급상승 동영상',
  '프로그래밍 기초 강좌',
  'ChatGPT 바로가기',
  '국내 주식 증시 현황'
];

function initSearch() {
  // Input event: toggle clear button and display suggestions
  searchInput.addEventListener('input', () => {
    const val = searchInput.value.trim();
    if (val.length > 0) {
      clearBtn.classList.remove('hidden');
      renderSuggestions(val);
    } else {
      clearBtn.classList.add('hidden');
      closeSuggestions();
    }
  });

  // Focus event
  searchInput.addEventListener('focus', () => {
    searchBoxWrapper.classList.add('focused');
    const val = searchInput.value.trim();
    if (val.length > 0) {
      renderSuggestions(val);
    } else {
      renderRecentOrPopular();
    }
  });

  // Blur event with delay so clicks inside dropdown register
  document.addEventListener('click', (e) => {
    if (!searchBoxWrapper.contains(e.target)) {
      searchBoxWrapper.classList.remove('focused');
      closeSuggestions();
    }
  });

  // Clear button
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.classList.add('hidden');
    searchInput.focus();
    renderRecentOrPopular();
  });

  // Lucky button
  btnLucky.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}&btnI=1`;
    } else {
      window.location.href = 'https://www.google.com/doodles';
    }
  });

  // Voice Search (Web Speech API)
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.interimResults = false;

    let isListening = false;

    voiceBtn.addEventListener('click', () => {
      if (!isListening) {
        try {
          recognition.start();
          isListening = true;
          voiceBtn.classList.add('listening');
          showToast('🎙️ 듣고 있습니다... 말씀해 주세요.');
        } catch (err) {
          console.error('Speech recognition error:', err);
        }
      } else {
        recognition.stop();
        isListening = false;
        voiceBtn.classList.remove('listening');
      }
    });

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      searchInput.value = transcript;
      clearBtn.classList.remove('hidden');
      searchForm.submit();
    };

    recognition.onerror = () => {
      isListening = false;
      voiceBtn.classList.remove('listening');
      showToast('음성을 인식하지 못했습니다. 다시 시도해 주세요.');
    };

    recognition.onend = () => {
      isListening = false;
      voiceBtn.classList.remove('listening');
    };
  } else {
    voiceBtn.addEventListener('click', () => {
      showToast('이 브라우저에서는 음성 검색이 지원되지 않습니다.');
    });
  }

  // Google Lens image search simulation / redirect
  lensBtn.addEventListener('click', () => {
    window.location.href = 'https://images.google.com/';
  });

  // Form submit: save query to history
  searchForm.addEventListener('submit', (e) => {
    const query = searchInput.value.trim();
    if (!query) {
      e.preventDefault();
      searchInput.focus();
      return;
    }
    saveRecentSearch(query);
  });
}

function saveRecentSearch(query) {
  let recents = JSON.parse(localStorage.getItem('google_recent_searches') || '[]');
  recents = recents.filter(item => item !== query);
  recents.unshift(query);
  if (recents.length > 5) recents.pop();
  localStorage.setItem('google_recent_searches', JSON.stringify(recents));
}

function renderSuggestions(query) {
  const q = query.toLowerCase();
  const filtered = POPULAR_SUGGESTIONS.filter(s => s.toLowerCase().includes(q));

  if (filtered.length === 0) {
    closeSuggestions();
    return;
  }

  suggestionsList.innerHTML = filtered.map(item => `
    <li class="suggestion-item" data-query="${item}">
      <span class="suggestion-icon">
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </span>
      <span class="suggestion-text">${highlightMatch(item, query)}</span>
    </li>
  `).join('');

  attachSuggestionClickEvents();
  suggestionsDropdown.classList.remove('hidden');
}

function renderRecentOrPopular() {
  const recents = JSON.parse(localStorage.getItem('google_recent_searches') || '[]');
  const items = recents.length > 0 ? recents : POPULAR_SUGGESTIONS.slice(0, 4);

  suggestionsList.innerHTML = items.map(item => `
    <li class="suggestion-item" data-query="${item}">
      <span class="suggestion-icon">
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path fill="currentColor" d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
        </svg>
      </span>
      <span class="suggestion-text">${item}</span>
    </li>
  `).join('');

  attachSuggestionClickEvents();
  suggestionsDropdown.classList.remove('hidden');
}

function highlightMatch(text, query) {
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<strong>$1</strong>');
}

function attachSuggestionClickEvents() {
  const items = suggestionsList.querySelectorAll('.suggestion-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      const q = item.getAttribute('data-query');
      searchInput.value = q;
      saveRecentSearch(q);
      searchForm.submit();
    });
  });
}

function closeSuggestions() {
  suggestionsDropdown.classList.add('hidden');
}


// ==========================================
// 3. Quotes of the Day (명언) Engine
// ==========================================
const QUOTES = [
  {
    ko: "인생에서 가장 큰 영광은 결코 넘어지지 않는 데 있는 것이 아니라, 넘어질 때마다 일어서는 데 있다.",
    en: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "넬슨 만델라 (Nelson Mandela)"
  },
  {
    ko: "우리가 할 수 있는 가장 아름다운 경험은 신비로움이다. 그것은 모든 진정한 예술과 과학의 요람에 서 있는 근본적인 감정이다.",
    en: "The most beautiful experience we can have is the mysterious. It is the fundamental emotion that stands at the cradle of true art and true science.",
    author: "알베르트 아인슈타인 (Albert Einstein)"
  },
  {
    ko: "당신이 할 수 있다고 믿든, 할 수 없다고 믿든, 당신이 믿는 대로 될 것이다.",
    en: "Whether you think you can, or you think you can't – you're right.",
    author: "헨리 포드 (Henry Ford)"
  },
  {
    ko: "내일이란 오늘의 가장 훌륭한 자산이다.",
    en: "Tomorrow is the most important thing in life.",
    author: "존 웨인 (John Wayne)"
  },
  {
    ko: "꿈을 이룰 수 있는 비결은 단 하나, 용기를 가지고 한 걸음 내딛는 것이다.",
    en: "All our dreams can come true, if we have the courage to pursue them.",
    author: "월트 디즈니 (Walt Disney)"
  },
  {
    ko: "성공이란 열정을 잃지 않고 실패를 거듭해 나가는 능력이다.",
    en: "Success is stumbling from failure to failure with no loss of enthusiasm.",
    author: "윈스턴 처칠 (Winston Churchill)"
  },
  {
    ko: "가장 어두운 밤도 끝날 것이고, 태양은 다시 떠오를 것이다.",
    en: "Even the darkest night will end and the sun will rise.",
    author: "빅토르 위고 (Victor Hugo)"
  },
  {
    ko: "시작이 반이다.",
    en: "Well begun is half done.",
    author: "아리스토텔레스 (Aristotle)"
  },
  {
    ko: "단순함이 궁극의 정교함이다.",
    en: "Simplicity is the ultimate sophistication.",
    author: "레오나르도 다 빈치 (Leonardo da Vinci)"
  },
  {
    ko: "당신의 시간은 한정되어 있습니다. 그러니 다른 사람의 삶을 살며 시간을 낭비하지 마세요.",
    en: "Your time is limited, so don't waste it living someone else's life.",
    author: "스티브 잡스 (Steve Jobs)"
  },
  {
    ko: "천 리 길도 한 걸음부터.",
    en: "A journey of a thousand miles begins with a single step.",
    author: "노자 (Laozi)"
  },
  {
    ko: "배움에 왕도는 없다.",
    en: "There is no royal road to learning.",
    author: "유클리드 (Euclid)"
  },
  {
    ko: "행복은 목적지가 아니라 여행하는 방식이다.",
    en: "Happiness is not a state to arrive at, but a manner of traveling.",
    author: "마가렛 리 런벡 (Margaret Lee Runbeck)"
  },
  {
    ko: "고난은 사람의 진가를 시험하는 리트머스 시험지다.",
    en: "Adversity introduces a man to himself.",
    author: "에픽테토스 (Epictetus)"
  },
  {
    ko: "작은 기회로부터 종종 위대한 업적이 시작된다.",
    en: "Small opportunities are often the beginning of great enterprises.",
    author: "데모스테네스 (Demosthenes)"
  }
];

let currentQuoteIndex = 0;

function initQuotes() {
  const quoteText = document.getElementById('quoteText');
  const quoteEnText = document.getElementById('quoteEnText');
  const quoteAuthor = document.getElementById('quoteAuthor');
  const nextQuoteBtn = document.getElementById('nextQuoteBtn');
  const copyQuoteBtn = document.getElementById('copyQuoteBtn');

  // Random initial quote
  currentQuoteIndex = Math.floor(Math.random() * QUOTES.length);
  renderQuote(currentQuoteIndex);

  // Next Quote button
  nextQuoteBtn.addEventListener('click', () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * QUOTES.length);
    } while (nextIndex === currentQuoteIndex && QUOTES.length > 1);

    currentQuoteIndex = nextIndex;

    // Smooth transition
    quoteText.classList.add('quote-fading');
    quoteEnText.classList.add('quote-fading');
    quoteAuthor.classList.add('quote-fading');

    setTimeout(() => {
      renderQuote(currentQuoteIndex);
      quoteText.classList.remove('quote-fading');
      quoteEnText.classList.remove('quote-fading');
      quoteAuthor.classList.remove('quote-fading');
    }, 200);
  });

  // Copy Quote button
  copyQuoteBtn.addEventListener('click', async () => {
    const q = QUOTES[currentQuoteIndex];
    const fullText = `"${q.ko}"\n${q.author}`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullText);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = fullText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showToast('📋 명언이 클립보드에 복사되었습니다.');
    } catch (err) {
      showToast('명언 복사에 실패했습니다.');
    }
  });
}

function renderQuote(index) {
  const q = QUOTES[index];
  const quoteText = document.getElementById('quoteText');
  const quoteEnText = document.getElementById('quoteEnText');
  const quoteAuthor = document.getElementById('quoteAuthor');

  quoteText.textContent = q.ko;
  quoteEnText.textContent = q.en;
  quoteAuthor.textContent = `— ${q.author}`;
}


// ==========================================
// 4. Clock & Date
// ==========================================
function initClock() {
  const liveClock = document.getElementById('liveClock');
  const liveDate = document.getElementById('liveDate');

  const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

  function update() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    liveClock.textContent = `${hours}:${minutes}`;

    const month = now.getMonth() + 1;
    const date = now.getDate();
    const day = DAYS[now.getDay()];
    liveDate.textContent = `${month}월 ${date}일 (${day})`;
  }

  update();
  setInterval(update, 1000);
}


// ==========================================
// 5. Theme Toggle (Dark / Light Mode)
// ==========================================
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('google_start_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
  }

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    if (isDark) {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      localStorage.setItem('google_start_theme', 'light');
      showToast('☀️ 라이트 모드로 전환되었습니다.');
    } else {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      localStorage.setItem('google_start_theme', 'dark');
      showToast('🌙 다크 모드로 전환되었습니다.');
    }
  });
}


// ==========================================
// 6. Google Apps Dropdown Menu
// ==========================================
function initAppsMenu() {
  const appsBtn = document.getElementById('appsBtn');
  const appsPopup = document.getElementById('appsPopup');

  appsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    appsPopup.classList.toggle('show');
  });

  document.addEventListener('click', (e) => {
    if (!appsPopup.contains(e.target) && !appsBtn.contains(e.target)) {
      appsPopup.classList.remove('show');
    }
  });
}


// ==========================================
// 7. Toast Notification Utility
// ==========================================
function showToast(message, duration = 3000) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 250);
  }, duration);
}


// ==========================================
// 8. Global Keyboard Shortcuts
// ==========================================
function initShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Focus search on '/' or 'Ctrl+K' / 'Cmd+K' when not already focusing an input
    if ((e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
    // Escape to blur search & close dropdowns
    if (e.key === 'Escape') {
      searchInput.blur();
      closeSuggestions();
      document.getElementById('appsPopup').classList.remove('show');
    }
  });
}


// ==========================================
// Bootstrap Application
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initTheme();
  initAppsMenu();
  initSearch();
  initQuotes();
  initShortcuts();

  // Weather Refresh Button listener
  const weatherRefreshBtn = document.getElementById('weatherRefreshBtn');
  if (weatherRefreshBtn) {
    weatherRefreshBtn.addEventListener('click', () => {
      updateAllWeather();
      showToast('🔄 날씨 정보를 새로고침했습니다.');
    });
  }

  // Load live weather for Seoul and Jeju
  updateAllWeather();

  // Auto-refresh weather every 15 minutes
  setInterval(updateAllWeather, 15 * 60 * 1000);
});
