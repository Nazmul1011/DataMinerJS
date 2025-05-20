document.addEventListener('DOMContentLoaded', () => {
    const chartTypeSelect = document.getElementById('chartSelect');
    const ctx = document.getElementById('chartCanvas').getContext('2d');
    let chartInstance = null;
  
    const drawROC = () => {
      const data = {
        labels: [0, 0.1, 0.3, 0.6, 0.8, 0.9, 1],
        datasets: [
          {
            label: 'ROC Curve',
            data: [0, 0.2, 0.45, 0.7, 0.85, 0.9, 1],
            borderColor: '#1a73e8',
            fill: false,
            tension: 0.3,
            pointRadius: 5,
            pointHoverRadius: 7
          },
          {
            label: 'Random Guess',
            data: [0, 0.1, 0.2, 0.4, 0.6, 0.8, 1],
            borderColor: '#888',
            borderDash: [5, 5],
            fill: false,
            pointRadius: 0
          }
        ]
      };
  
      const options = {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: { mode: 'nearest', intersect: false }
        },
        scales: {
          x: { title: { display: true, text: 'False Positive Rate' }, min: 0, max: 1 },
          y: { title: { display: true, text: 'True Positive Rate' }, min: 0, max: 1 }
        }
      };
  
      chartInstance = new Chart(ctx, {
        type: 'line',
        data,
        options
      });
    };
  
    const drawScatter = () => {
      const data = {
        datasets: [
          {
            label: 'Cluster 1',
            data: [
              { x: 1.2, y: 1.5 }, { x: 1.3, y: 1.7 }, { x: 1.4, y: 1.6 }
            ],
            backgroundColor: '#1a73e8'
          },
          {
            label: 'Cluster 2',
            data: [
              { x: 3, y: 3.4 }, { x: 3.2, y: 3.3 }, { x: 3.1, y: 3.5 }
            ],
            backgroundColor: '#f57c00'
          }
        ]
      };
  
      const options = {
        scales: {
          x: { title: { display: true, text: 'X Axis' } },
          y: { title: { display: true, text: 'Y Axis' } }
        },
        plugins: {
          legend: { position: 'bottom' }
        }
      };
  
      chartInstance = new Chart(ctx, {
        type: 'scatter',
        data,
        options
      });
    };
  
    const updateChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
      const selected = chartTypeSelect.value;
      if (selected === 'roc') {
        drawROC();
      } else if (selected === 'scatter') {
        drawScatter();
      }
    };
  
    chartTypeSelect.addEventListener('change', updateChart);
  
    // Initial chart
    updateChart();
  });
  