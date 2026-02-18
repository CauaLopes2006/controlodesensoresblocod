/* =====================
   SIMULAÇÃO DE DADOS
   ===================== */
let temp = 24.5;
let hum  = 58;
let limi = 65;

/* === AJUSTE DO GAUGE === */
function setGauge(value){
  const total = 251;
  const offset = total - (value / 100) * total;
  const arc = document.getElementById("gaugeArc");
  arc.style.transition = "stroke-dashoffset 1s ease";
  arc.style.strokeDashoffset = offset;
  document.getElementById("limiVal").textContent = value.toFixed(0);
}

/* === CONFIGURAÇÃO DO GRÁFICO === */
const canvas = document.getElementById("thChart");
const ctx = canvas.getContext("2d");
const gradientTemp = ctx.createLinearGradient(0, 0, 0, 280);
gradientTemp.addColorStop(0, "rgba(46,224,122,0.35)");
gradientTemp.addColorStop(1, "rgba(46,224,122,0)");

const gradientHum = ctx.createLinearGradient(0, 0, 0, 280);
gradientHum.addColorStop(0, "rgba(80,140,255,0.35)");
gradientHum.addColorStop(1, "rgba(80,140,255,0)");
const labels = [];
const tempData = [];
const humData = [];

const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels,
    datasets: [
      {
  label: 'Temperatura (°C)',
  data: tempData,
  borderColor: '#2ee07a',
  backgroundColor: gradientTemp,
  tension: 0.45,
  borderWidth: 3,
  fill: true,
  pointRadius: 0,
  pointHoverRadius: 6,
  pointHoverBackgroundColor: '#2ee07a',
  pointHoverBorderWidth: 2,
  pointHoverBorderColor: '#fff'
},
      {
  label: 'Humidade (%)',
  data: humData,
  borderColor: '#508cff',
  backgroundColor: gradientHum,
  tension: 0.45,
  borderWidth: 3,
  fill: true,
  pointRadius: 0,
  pointHoverRadius: 6,
  pointHoverBackgroundColor: '#508cff',
  pointHoverBorderWidth: 2,
  pointHoverBorderColor: '#fff'
}
    ]
  },
  options: {
  responsive: true,
  maintainAspectRatio: false,

  animation: {
    duration: 900,
    easing: 'easeOutQuart'
  },

  plugins: {
    legend: {
      labels: {
        color: '#e7eefc',
        font: { size: 13 }
      }
    },
    tooltip: {
      backgroundColor: "#121824",
      titleColor: "#2ee07a",
      bodyColor: "#e7eefc",
      borderColor: "#2ee07a",
      borderWidth: 1
    }
  },

  scales: {
    x: {
      ticks: { color: '#9fb0cc' },
      grid: { color: 'rgba(255,255,255,.05)' }
    },
    y: {
      ticks: { color: '#9fb0cc' },
      grid: { color: 'rgba(255,255,255,.05)' }
    }
  }
}
});
chart.canvas.style.filter = "drop-shadow(0 0 8px rgba(46,224,122,0.2))";
let demoInterval = null;
let isRunning = false;

const toggleBtn = document.getElementById("toggleDemo");
const statusEl = document.getElementById("systemStatus");

function atualizarDados(){
  temp += (Math.random() - 0.5) * 0.3;
  hum  += (Math.random() - 0.5) * 1;
  limi += (Math.random() - 0.5) * 2;

  document.getElementById("tempVal").textContent = temp.toFixed(1);
  const tempCard = document.querySelector(".temp-card");

tempCard.classList.remove("temp-normal","temp-warning","temp-danger");

if(temp < 26){
  tempCard.classList.add("temp-normal");
}
else if(temp < 28){
  tempCard.classList.add("temp-warning");
}
else{
  tempCard.classList.add("temp-danger");
}
  document.getElementById("humVal").textContent = hum.toFixed(0);

  setGauge(limi);

  const agora = new Date();
const hora = agora.toLocaleTimeString('pt-PT', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

labels.push(hora);
  tempData.push(temp);
  humData.push(hum);

  if(labels.length > 15){
    labels.shift();
    tempData.shift();
    humData.shift();
    const dadosMapa = JSON.parse(localStorage.getItem("dadosMapa")) || {};

// exemplo: associar LD1 aos valores atuais
dadosMapa["LD1"] = {
  temperatura: temp.toFixed(1),
  humidade: hum.toFixed(0),
  alerta: temp > 24
};

localStorage.setItem("dadosMapa", JSON.stringify(dadosMapa));
  }

  // Estatísticas
  const avgTemp = tempData.reduce((a,b)=>a+b,0)/tempData.length;
  const avgHum  = humData.reduce((a,b)=>a+b,0)/humData.length;
  const maxTemp = Math.max(...tempData);
  const minTemp = Math.min(...tempData);

  document.getElementById("avgTemp").textContent = avgTemp.toFixed(1)+"°C";
  document.getElementById("avgHum").textContent  = avgHum.toFixed(0)+"%";
  document.getElementById("maxTemp").textContent = maxTemp.toFixed(1)+"°C";
  document.getElementById("minTemp").textContent = minTemp.toFixed(1)+"°C";

  chart.update();
}

toggleBtn.addEventListener("click", () => {

  if(!isRunning){
    demoInterval = setInterval(atualizarDados, 2000);
    toggleBtn.textContent = "Parar Simulação";
    toggleBtn.classList.add("stop");

    statusEl.textContent = "🟢 Sistema Online";
    statusEl.classList.remove("offline");
    statusEl.classList.add("online");

    isRunning = true;

  } else {
    clearInterval(demoInterval);
    toggleBtn.textContent = "Iniciar Simulação";
    toggleBtn.classList.remove("stop");

    statusEl.textContent = "🔴 Sistema Pausado";
    statusEl.classList.remove("online");
    statusEl.classList.add("offline");

    isRunning = false;
  }

});
/* =====================
   STATUS DE SENSORES COM CORES DINÂMICAS
   ===================== */
function atualizarSensores() {
  const sensores = JSON.parse(localStorage.getItem('sensores')) || [];
  const ativo = sensores.length;

  const elCount = document.getElementById('sensorCount');
  const elCard = document.getElementById('sensorStatusCard');
  const elTitle = document.getElementById('sensorTitle');
  const elMsg = document.getElementById('sensorMsg');

  if (!elCount) return;

  elCount.textContent = ativo;

  if (ativo > 0) {
    // Status Normal (verde)
    elCount.style.color = 'var(--green)';
    elTitle.innerHTML = '🧩 Sensores Ativos';
    elMsg.textContent = 'Todos os sensores estão operacionais.';
    elCard.style.borderColor = 'rgba(46,224,122,.4)';
    elCard.style.boxShadow = '0 0 18px rgba(46,224,122,.15)';
  } else {
    // Status de alerta (nenhum sensor)
    elCount.style.color = '#ff4d4d';
    elTitle.innerHTML = '⚠️ Nenhum Sensor';
    elMsg.textContent = 'Sem sensores registados no sistema!';
    elCard.style.borderColor = 'rgba(255,77,77,.4)';
    elCard.style.boxShadow = '0 0 18px rgba(255,77,77,.15)';
  }
}

// Atualiza automaticamente a cada 5 segundos
setInterval(atualizarSensores, 5000);

// Atualiza assim que a página carrega
atualizarSensores();

/* FUTURA INTEGRAÇÃO: Para dados reais
fetch('/api/sensors')
  .then(res => res.json())
  .then(data => {
    // Atualiza valores reais
    temp = data.temperatura;
    hum  = data.humidade;
    limi = data.nivelSensor;
  });
*/
