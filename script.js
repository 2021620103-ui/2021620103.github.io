const cities = [
  { name: "서울", latitude: 37.5665, longitude: 126.978 },
  { name: "제주", latitude: 33.4996, longitude: 126.5312 },
];

const quotes = [
  { text: "성공은 매일 반복되는 작은 노력들의 합이다.", author: "로버트 콜리어" },
  { text: "천 리 길도 한 걸음부터 시작된다.", author: "노자" },
  { text: "행복은 습관이다. 그것을 몸에 지녀라.", author: "엘버트 허버드" },
  { text: "미래는 오늘 우리가 무엇을 하는가에 달려 있다.", author: "마하트마 간디" },
  { text: "완벽한 때를 기다리지 말고, 지금 이 순간을 완벽하게 만들어라.", author: "조이벨 C." },
  { text: "할 수 있다고 믿으면 이미 절반은 이룬 것이다.", author: "시어도어 루스벨트" },
  { text: "삶이 있는 한 희망은 있다.", author: "키케로" },
];

const weatherCodes = {
  0: ["맑음", "☀️"], 1: ["대체로 맑음", "🌤️"], 2: ["구름 조금", "⛅"], 3: ["흐림", "☁️"],
  45: ["안개", "🌫️"], 48: ["서리 안개", "🌫️"], 51: ["약한 이슬비", "🌦️"], 53: ["이슬비", "🌦️"],
  55: ["강한 이슬비", "🌧️"], 61: ["약한 비", "🌦️"], 63: ["비", "🌧️"], 65: ["강한 비", "🌧️"],
  71: ["약한 눈", "🌨️"], 73: ["눈", "❄️"], 75: ["강한 눈", "❄️"], 80: ["소나기", "🌦️"],
  81: ["소나기", "🌧️"], 82: ["강한 소나기", "⛈️"], 95: ["뇌우", "⛈️"], 96: ["우박 동반 뇌우", "⛈️"], 99: ["강한 뇌우", "⛈️"],
};

const weatherList = document.querySelector("#weatherList");
const weatherUpdated = document.querySelector("#weatherUpdated");
const refreshWeather = document.querySelector("#refreshWeather");
const quoteText = document.querySelector("#quoteText");
const quoteAuthor = document.querySelector("#quoteAuthor");
const searchInput = document.querySelector("#searchInput");

function setDateAndGreeting() {
  const now = new Date();
  document.querySelector("#headerDate").textContent = new Intl.DateTimeFormat("ko-KR", {
    month: "long", day: "numeric", weekday: "short",
  }).format(now);
  const hour = now.getHours();
  document.querySelector("#greeting").textContent = hour < 12 ? "좋은 아침이에요." : hour < 18 ? "좋은 오후예요." : "편안한 저녁이에요.";
}

function showQuote(index) {
  const quote = quotes[index % quotes.length];
  quoteText.textContent = quote.text;
  quoteAuthor.textContent = `— ${quote.author}`;
  quoteText.animate([{ opacity: 0, transform: "translateY(5px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 280 });
}

let quoteIndex = Math.floor(Date.now() / 86400000) % quotes.length;
showQuote(quoteIndex);
document.querySelector("#nextQuote").addEventListener("click", () => showQuote(++quoteIndex));

async function fetchWeather() {
  refreshWeather.disabled = true;
  weatherUpdated.textContent = "날씨 정보를 업데이트하는 중이에요.";
  const params = new URLSearchParams({
    latitude: cities.map(city => city.latitude).join(","),
    longitude: cities.map(city => city.longitude).join(","),
    current: "temperature_2m,apparent_temperature,weather_code",
    timezone: "Asia/Seoul",
  });

  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!response.ok) throw new Error("날씨 서버 응답 오류");
    const payload = await response.json();
    const results = Array.isArray(payload) ? payload : [payload];
    weatherList.innerHTML = results.map((data, index) => {
      const current = data.current;
      const [description, icon] = weatherCodes[current.weather_code] ?? ["날씨 정보", "🌡️"];
      return `<div class="weather-item">
        <div class="weather-icon" aria-hidden="true">${icon}</div>
        <div class="weather-copy">
          <p class="weather-city">${cities[index].name}</p>
          <p class="weather-temp">${Math.round(current.temperature_2m)}°</p>
          <p class="weather-desc">${description} · 체감 ${Math.round(current.apparent_temperature)}°</p>
        </div>
      </div>`;
    }).join("");
    weatherUpdated.textContent = `방금 업데이트 · Open-Meteo 제공`;
  } catch (error) {
    weatherList.innerHTML = `<p class="weather-error">날씨 정보를 불러오지 못했어요.<br>잠시 후 새로고침해 주세요.</p>`;
    weatherUpdated.textContent = "네트워크 연결을 확인해 주세요.";
  } finally {
    refreshWeather.disabled = false;
  }
}

refreshWeather.addEventListener("click", fetchWeather);
document.addEventListener("keydown", event => {
  if (event.key === "/" && document.activeElement !== searchInput) {
    event.preventDefault();
    searchInput.focus();
  }
});

setDateAndGreeting();
fetchWeather();
