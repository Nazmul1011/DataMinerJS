document.addEventListener('DOMContentLoaded', () => {
    const msgBox = document.getElementById('exportMsg');
  
    function simulateDownload(name) {
      msgBox.style.color = 'green';
      msgBox.textContent = `✅ "${name}" downloaded successfully!`;
    }
  
    document.getElementById('downloadReportBtn').addEventListener('click', () => {
      simulateDownload("model_report.pdf");
    });
  
    document.getElementById('downloadModelBtn').addEventListener('click', () => {
      simulateDownload("trained_model.pkl");
    });
  
    document.getElementById('resetBtn').addEventListener('click', () => {
      localStorage.clear();
      msgBox.style.color = '#d32f2f';
      msgBox.textContent = "🗑️ All session data cleared. Redirecting to start...";
  
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    });
  });
  