const select = document.getElementById("cryptoSelect");
const resultado = document.getElementById("resultado");

// 🔹 Lista fija (Binance usa símbolos)
const cryptos = [
  { symbol: "BTCUSDT", name: "Bitcoin" },
  { symbol: "ETHUSDT", name: "Ethereum" },
  { symbol: "BNBUSDT", name: "BNB" },
  { symbol: "SOLUSDT", name: "Solana" },
  { symbol: "ADAUSDT", name: "Cardano" },
  { symbol: "XRPUSDT", name: "XRP" },
  { symbol: "DOGEUSDT", name: "Dogecoin" }
];

// 🔹 Cargar lista
function cargarLista() {
  // Opción inicial
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Elige una cripto";
  defaultOption.value = "";
  select.appendChild(defaultOption);

  cryptos.forEach(coin => {
    const option = document.createElement("option");
    option.value = coin.symbol;
    option.textContent = coin.name;
    select.appendChild(option);
  });
}

// 🔹 Mostrar info
async function mostrarCrypto(symbol) {
  if (!symbol) return;

  resultado.innerHTML = "Cargando...";

  try {
    const res = await fetch(
      `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`
    );

    const data = await res.json();

    const precio = parseFloat(data.lastPrice);
    const cambio = parseFloat(data.priceChangePercent);
    const color = cambio >= 0 ? "green" : "red";

    resultado.innerHTML = `
      <div class="crypto-card">

        <div class="crypto-header">
          <h2>${symbol.replace("USDT", "")}</h2>
        </div>

        <div class="price">$${precio.toLocaleString()}</div>

        <div class="change-box ${color}">
          ${cambio.toFixed(2)}% (24h)
        </div>

        <div class="crypto-extra">
          <p>Par: ${symbol}</p>
          <p>Datos en tiempo real</p>
        </div>

      </div>
    `;

  } catch (error) {
    console.error("Error:", error);
    resultado.innerHTML = "Error al cargar datos";
  }
}

// 🔹 Evento
select.addEventListener("change", (e) => {
  mostrarCrypto(e.target.value);
});

// 🔹 Init
cargarLista();