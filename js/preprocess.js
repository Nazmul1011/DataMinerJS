document.addEventListener('DOMContentLoaded', () => {
    const headers = JSON.parse(localStorage.getItem('datasetHeaders') || '[]');
    const rawRows = JSON.parse(localStorage.getItem('datasetRows') || '[]');
  
    if (!headers.length || !rawRows.length) {
      alert("No dataset found. Please upload it first.");
      window.location.href = "index.html";
      return;
    }
  
    const dropMissing = document.getElementById('dropMissing');
    const fillMissing = document.getElementById('fillMissing');
    const normalize = document.getElementById('normalize');
    const encode = document.getElementById('encode');
    const applyBtn = document.getElementById('applyBtn');
  
    applyBtn.addEventListener('click', () => {
      let data = rawRows.map(r => ({ ...r })); // deep copy
  
      // Drop or fill missing
      if (dropMissing.checked && fillMissing.checked) {
        alert("Choose either drop or fill for missing values, not both.");
        return;
      }
  
      if (dropMissing.checked) {
        data = data.filter(row => headers.every(h => row[h] !== '' && row[h] != null));
      }
  
      if (fillMissing.checked) {
        headers.forEach(h => {
          const colVals = data.map(r => r[h]).filter(v => v !== '');
          const isNum = colVals.every(v => !isNaN(parseFloat(v)));
          if (isNum) {
            const mean = colVals.reduce((sum, v) => sum + parseFloat(v), 0) / colVals.length;
            data.forEach(r => {
              if (r[h] === '') r[h] = mean.toFixed(2);
            });
          } else {
            const freq = {};
            colVals.forEach(v => freq[v] = (freq[v] || 0) + 1);
            const mode = Object.entries(freq).sort((a,b) => b[1] - a[1])[0][0];
            data.forEach(r => {
              if (r[h] === '') r[h] = mode;
            });
          }
        });
      }
  
      if (normalize.checked) {
        headers.forEach(h => {
          const nums = data.map(r => parseFloat(r[h])).filter(v => !isNaN(v));
          if (!nums.length) return;
          const min = Math.min(...nums);
          const max = Math.max(...nums);
          if (max === min) return;
          data.forEach(r => {
            const val = parseFloat(r[h]);
            if (!isNaN(val)) r[h] = ((val - min) / (max - min)).toFixed(3);
          });
        });
      }
  
      if (encode.checked) {
        headers.forEach(h => {
          const isCat = data.some(r => isNaN(parseFloat(r[h])));
          if (!isCat) return;
          const uniqueVals = [...new Set(data.map(r => r[h]))];
          const map = {};
          uniqueVals.forEach((val, i) => map[val] = i);
          data.forEach(r => {
            r[h] = map[r[h]];
          });
        });
      }
  
      // Save to localStorage for next steps
      localStorage.setItem('processedRows', JSON.stringify(data));
  
      // Show preview
      const thead = document.querySelector('#previewTable thead tr');
      const tbody = document.querySelector('#previewTable tbody');
      thead.innerHTML = '';
      tbody.innerHTML = '';
  
      headers.forEach(h => {
        const th = document.createElement('th');
        th.textContent = h;
        thead.appendChild(th);
      });
  
      data.slice(0, 10).forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(h => {
          const td = document.createElement('td');
          td.textContent = row[h];
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
  
      alert("Preprocessing complete. You can now proceed to Modeling.");
    });
  });
  