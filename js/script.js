const select = document.getElementById("cryptoSelect");
const resultado = document.getElementById("resultado");

// 🔹 Cargar lista de criptos
async function cargarLista() {
  try {
    const res = await fetch("https://api.coinpaprika.com/v1/coins");
    const data = await res.json();

    // Filtrar solo activas y limitar a 50
    const coins = data.filter(c => c.is_active).slice(0, 50);

    // Opción inicial
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Elige una cripto";
    defaultOption.value = "";
    select.appendChild(defaultOption);

    // Llenar select
    coins.forEach(coin => {
      const option = document.createElement("option");
      option.value = coin.id;
      option.textContent = coin.name;
      select.appendChild(option);
    });

  } catch (error) {
    console.error("Error cargando lista:", error);
    resultado.innerHTML = "Error cargando criptos";
  }
}

// 🔹 Mostrar info de la cripto
async function mostrarCrypto(id) {
  if (!id) return;

  resultado.innerHTML = "Cargando...";

  try {
    const res = await fetch(`https://api.coinpaprika.com/v1/tickers/${id}`);
    const data = await res.json();

    const precio = data.quotes.USD.price;
    const cambio = data.quotes.USD.percent_change_24h;
    const color = cambio >= 0 ? "green" : "red";

    resultado.innerHTML = `
      <div class="crypto-card">

        <div class="crypto-header">
          <h2>${data.name}</h2>
        </div>

        <div class="price">$${precio.toLocaleString()}</div>

        <div class="change-box ${color}">
          ${cambio.toFixed(2)}% (24h)
        </div>

        <div class="crypto-extra">
          <p>Ranking: #${data.rank}</p>
          <p>Datos en tiempo real</p>
        </div>

      </div>
    `;

  } catch (error) {
    console.error("Error cargando cripto:", error);
    resultado.innerHTML = "Error al cargar datos";
  }
}

// 🔹 Evento al cambiar selección
select.addEventListener("change", (e) => {
  mostrarCrypto(e.target.value);
});

// 🔹 Inicializar
cargarLista();