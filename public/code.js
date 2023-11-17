const previsaodotempo = {
  coord: {
    lon: 10.99,
    lat: 44.34,
  },
  weather: [
    {
      id: 501,
      main: "Rain",
      description: "moderate rain",
      icon: "10d",
    },
  ],
  base: "stations",
  main: {
    temp: 298.48,
    feels_like: 298.74,
    temp_min: 297.56,
    temp_max: 300.05,
    pressure: 1015,
    sea_level: 1015,
    humidity: 64,
    grnd_level: 933,
  },
  visibility: 10000,
  wind: {
    speed: 0.62,
    deg: 349,
    gust: 1.18,
  },
  rain: {
    "1h": 3.16,
  },
  clouds: {
    all: 100,
  },
  dt: 1661870592,
  sys: {
    type: 2,
    id: 2075663,
    country: "IT",
    sunrise: 1661834187,
    sunset: 1661882248,
  },
  timezone: 7200,
  id: 3163858,
  name: "Zocca",
  cod: 200,
};

const targetLanguage = 'pt';

function ktoc(kelvin) {
  var celsius = kelvin - 273.15;
  return celsius;
}

function mostrarTempo(infotempo) {
  const textToTranslate = infotempo.weather[0].description;

  const apiKey = 'AIzaSyB0M9DDWKWznYMknPDrSRSF9NZr86xbLEE';
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  const data = {
    q: textToTranslate,
    target: targetLanguage,
  };

  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      const translation = response.data.  translations[0].translatedText;
      document.getElementById('tempo').innerHTML = translation;
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      console.error('Erro na tradução:', xhr.responseText);
    }
  };

  xhr.send(JSON.stringify(data));
}

function mostrarTemperatura(infop) {
  document.getElementById("temp").innerHTML = ktoc(infop.main.temp).toFixed(0);
}

function mostrarUmidade(infoumidade) {
  document.getElementById("umidade").innerHTML = infoumidade.main.humidity;
}

const apiKey = 'c14cfeccbaf14e0f9de8f5243019e6af'; // Chave de API

function mostrarNoticias() {
  axios.get('https://newsapi.org/v2/top-headlines', {
    params: {
      country: 'br', // Defina o país das notícias (opcional)
      category: '', // Defina a categoria das notícias (opcional)
      apiKey: apiKey // Usa sua chave de API
    }
  })
  .then(response => {
    const noticias = response.data.articles;
    const noticiasHTML = noticias.map(noticia => {
      return `<div class="noticia">
                <h4>${noticia.author}</h3>
                <h3>${noticia.title}</h3>
                <a href="${noticia.url}" target="_blank">Leia mais</a>
                <br></br>
              </div>`;
    }).join('');

    document.getElementById('noticias').innerHTML = noticiasHTML;
  })
  .catch(error => {
    console.error(error);
  });
}

mostrarNoticias();
mostrarTempo(previsaodotempo);
mostrarTemperatura(previsaodotempo);
mostrarUmidade(previsaodotempo);