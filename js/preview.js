document.addEventListener('DOMContentLoaded', () => {
    const headers = JSON.parse(localStorage.getItem('datasetHeaders') || '[]');
    const rows = JSON.parse(localStorage.getItem('datasetRows') || '[]');
  
    if (!headers.length || !rows.length) {
      alert("No dataset found. Please upload it again.");
      window.location.href = "index.html";
      return;
    }
  
    // Show metadata
    document.getElementById('metaRows').textContent = rows.length;
    document.getElementById('metaColumns').textContent = headers.length;
  
    let missing = 0;
    const colTypes = {};
    rows.forEach(row => {
      headers.forEach(h => {
        const val = row[h];
        if (val === '' || val == null) missing++;
        if (!(h in colTypes)) colTypes[h] = [];
        colTypes[h].push(val);
      });
    });
    document.getElementById('metaNulls').textContent = missing;
  
    // Column Type Detection
    const typesList = document.getElementById('metaColTypes');
    headers.forEach(h => {
      const values = colTypes[h];
      const isNumeric = values.every(v => !isNaN(parseFloat(v)));
      const type = isNumeric ? "Numeric" : "Categorical";
      const li = document.createElement('li');
      li.textContent = `${h}: ${type}`;
      typesList.appendChild(li);
    });
  
    // Table Preview
    const thead = document.querySelector('#datasetTable thead tr');
    const tbody = document.querySelector('#datasetTable tbody');
  
    headers.forEach(h => {
      const th = document.createElement('th');
      th.textContent = h;
      thead.appendChild(th);
    });
  
    rows.slice(0, 20).forEach(row => {
      const tr = document.createElement('tr');
      headers.forEach(h => {
        const td = document.createElement('td');
        td.textContent = row[h];
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  });
  