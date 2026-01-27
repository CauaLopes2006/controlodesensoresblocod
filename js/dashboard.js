// ====== SIMULAÇÃO DE DADOS (mais tarde vem do Arduino) ======

let temp = 24.5;
let hum  = 58;
let limi = 65;

// Gauge
function setGauge(value){
  const total = 251;
  const offset = total - (value / 100) * total;
  document.getElementById("limiVal").textContent = value.toFixed(0);
  document.getElementById("gaugeArc").style.strokeDashoffset = offset;
}

// Chart
const ctx = document.getElementById("thChart");
const labels = [];
const tempData = [];
const humData = [];

const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels,
    datasets: [
      { label:'Temperatura (°C)', data: tempData },
      { label:'Humidade (%)', data: humData }
    ]
  },
  options: {
    responsive:true,
    maintainAspectRatio:false
  }
});

// Atualização simulada
setInterval(() => {
  temp += (Math.random() - 0.5) * 0.3;
  hum  += (Math.random() - 0.5) * 1;
  limi += (Math.random() - 0.5) * 2;

  document.getElementById("tempVal").textContent = temp.toFixed(1);
  document.getElementById("humVal").textContent  = hum.toFixed(0);

  setGauge(limi);

  labels.push('');
  tempData.push(temp);
  humData.push(hum);

  if(labels.length > 15){
    labels.shift();
    tempData.shift();
    humData.shift();
  }

  chart.update();
}, 3000);
