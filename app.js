// --- 명언 데이터 ---
const quotes = [
    { text: "삶이 있는 한 희망은 있다.", author: "키케로" },
    { text: "산다는것 그것은 치열한 전투이다.", author: "로망로랑" },
    { text: "하루에 3시간을 걸으면 7년 후에 지구를 한바퀴 돌 수 있다.", author: "사무엘존슨" },
    { text: "언제나 현재에 집중할수 있다면 행복할것이다.", author: "파울로 코엘료" },
    { text: "진정으로 웃으려면 고통을 참아야하며, 나아가 고통을 즐길 줄 알아야 해.", author: "찰리 채플린" },
    { text: "신은 용기있는자를 결코 버리지 않는다.", author: "켄러" },
    { text: "피할수 없으면 즐겨라.", author: "로버트 엘리엇" },
    { text: "단순하게 살아라. 현대인은 쓸데없는 절차와 일 때문에 얼마나 복잡한 삶을 살아가는가?", author: "이다설" },
    { text: "먼저 자신을 용서하라. 그래야 타인도 용서할 수 있다.", author: "세네카" }
];

// 랜덤 명언 표시
function displayRandomQuote() {
    const quoteContainer = document.getElementById('quote-container');
    if (!quoteContainer) return;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteContainer.innerText = `"${quote.text}" - ${quote.author}`;
}

// --- 날씨 API (Open-Meteo) ---
// 서울: 37.5665, 126.9780
// 제주: 33.4996, 126.5312
const weatherCodeMap = {
    0: '맑음 ☀️',
    1: '대체로 맑음 🌤️',
    2: '부분 흐림 ⛅',
    3: '흐림 ☁️',
    45: '안개 🌫️',
    48: '안개 🌫️',
    51: '가벼운 이슬비 🌧️',
    53: '이슬비 🌧️',
    55: '강한 이슬비 🌧️',
    61: '가벼운 비 🌧️',
    63: '비 🌧️',
    65: '강한 비 🌧️',
    71: '가벼운 눈 ❄️',
    73: '눈 ❄️',
    75: '강한 눈 ❄️',
    80: '가벼운 소나기 🌦️',
    81: '소나기 🌦️',
    82: '강한 소나기 🌦️',
    95: '천둥번개 ⛈️',
    96: '천둥번개와 우박 ⛈️',
    99: '강한 천둥번개와 우박 ⛈️'
};

async function fetchWeather(lat, lon, elementId, cityName) {
    const el = document.getElementById(elementId);
    if (!el) return;

    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`);
        if (!response.ok) throw new Error('날씨 정보를 가져오는데 실패했습니다.');
        const data = await response.json();
        const temp = data.current_weather.temperature;
        const code = data.current_weather.weathercode;
        const weatherDesc = weatherCodeMap[code] || '맑음 ☀️';
        
        el.innerText = `${cityName}: ${temp}°C ${weatherDesc}`;
    } catch (error) {
        console.error(`[${cityName} 날씨 조회 실패]:`, error);
        el.innerText = `${cityName} 날씨: 연결 오류`;
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 명언 표시
    displayRandomQuote();

    // 명언 클릭 시 다른 명언으로 갱신
    const quoteContainer = document.getElementById('quote-container');
    if (quoteContainer) {
        quoteContainer.addEventListener('click', displayRandomQuote);
        quoteContainer.title = "클릭하시면 다른 명언으로 바뀝니다";
    }

    // 날씨 정보 호출
    fetchWeather(37.5665, 126.9780, 'weather-seoul', '서울');
    fetchWeather(33.4996, 126.5312, 'weather-jeju', '제주');

    // 10분 주기 날씨 자동 갱신
    setInterval(() => {
        fetchWeather(37.5665, 126.9780, 'weather-seoul', '서울');
        fetchWeather(33.4996, 126.5312, 'weather-jeju', '제주');
    }, 600000);

    // I'm Feeling Lucky 버튼 이벤트
    const luckyBtn = document.getElementById('lucky-btn');
    if (luckyBtn) {
        luckyBtn.addEventListener('click', () => {
            const searchInput = document.querySelector('.search-input');
            const query = searchInput ? searchInput.value.trim() : '';
            if (query) {
                window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}&btnI=1`;
            } else {
                window.location.href = "https://www.google.com/doodles";
            }
        });
    }
});
