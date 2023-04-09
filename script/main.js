
/// Definindo variáveis
const mapElement = document.getElementById('mapid');
const initialCoords = [51.505, -0.09];
const initialZoom = 13;

// Criando camadas de mapa
const map = L.map(mapElement).setView(initialCoords, initialZoom);

const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  maxZoom: 18,
});

const traffic = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?foo=bar', {
  attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  maxZoom: 18,
});

const pois = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?foo=poi', {
  attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  maxZoom: 18,
});

// Adicionando camadas ao mapa
streets.addTo(map);
traffic.addTo(map);

// Criando controle de camadas
function createLayerControl() {
  const baseMaps = {
    "Ruas": streets
  };

  const overlayMaps = {
    "Tráfego": traffic,
    "Pontos de interesse": pois
  };

  L.control.layers(baseMaps, overlayMaps).addTo(map);
}

createLayerControl();

// Adicionando a localização atual
const onLocationFound = (e) => {
  const radius = e.accuracy / 2;
  L.circle(e.latlng, {radius})
    .addTo(map)
    .bindPopup(`Você está dentro de ${radius.toFixed(2)} metros desse ponto`)
    .openPopup();
};

const onLocationError = (e) => {
  alert(e.message);
};

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({setView: true, maxZoom: 16});

// Adicionando evento de clique no botão
const button = document.querySelector('button');
button.addEventListener('click', getLocation);

// Função para obter a localização atual
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, onLocationError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Função para exibir a localização atual
function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  map.setView([latitude, longitude], 16);

  // Adicionando marcador para a localização atual
  const marker = L.marker([latitude, longitude]).addTo(map);
  marker.bindPopup("Você está aqui!").openPopup();
}
//modo escuro
const toggleThemeButton = document.querySelector("#dark-mode");
const body = document.querySelector("body");

toggleThemeButton.addEventListener("click", function () {
  body.classList.toggle("dark-mode");
});
