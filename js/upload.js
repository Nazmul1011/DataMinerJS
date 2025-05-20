document.addEventListener('DOMContentLoaded', () => {
    const uploadBox = document.getElementById('uploadBox');
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileNameDisplay = document.getElementById('uploadedFileName');
    const toPreviewLink = document.getElementById('toPreviewLink');
  
    let uploadedFile = null;
    let dataset = null;
  
    // Drag-and-drop and click handlers
    uploadBox.addEventListener('click', () => fileInput.click());
  
    uploadBox.addEventListener('dragover', e => {
      e.preventDefault();
      uploadBox.classList.add('dragover');
    });
  
    uploadBox.addEventListener('dragleave', e => {
      e.preventDefault();
      uploadBox.classList.remove('dragover');
    });
  
    uploadBox.addEventListener('drop', e => {
      e.preventDefault();
      uploadBox.classList.remove('dragover');
      if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        handleFile(fileInput.files[0]);
      }
    });
  
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length) {
        handleFile(fileInput.files[0]);
      }
    });
  
    function handleFile(file) {
      if (!file) return;
      uploadedFile = file;
      fileNameDisplay.textContent = file.name;
      uploadBtn.disabled = false;
    }
  
    uploadBtn.addEventListener('click', () => {
      if (!uploadedFile) return;
  
      const ext = uploadedFile.name.split('.').pop().toLowerCase();
      if (ext !== 'csv' && ext !== 'tsv') {
        alert("Only CSV or TSV files are supported.");
        return;
      }
  
      const delimiter = ext === 'tsv' ? '\t' : ',';
      const reader = new FileReader();
  
      reader.onload = (e) => {
        try {
          dataset = parseCSV(e.target.result, delimiter);
  
          // ✅ Store dataset in localStorage
          localStorage.setItem('datasetHeaders', JSON.stringify(dataset.headers));
          localStorage.setItem('datasetRows', JSON.stringify(dataset.rows));
  
          // ✅ Enable navigation to next step
          toPreviewLink.style.display = 'inline-block';
          alert("Dataset uploaded successfully!");
        } catch (err) {
          alert("Error reading file: " + err.message);
        }
      };
  
      reader.readAsText(uploadedFile);
    });
  
    function parseCSV(text, delimiter = ',') {
      const lines = text.trim().split(/\r?\n/).filter(l => l.trim());
      if (lines.length === 0) throw new Error("File is empty");
  
      const headers = lines[0].split(delimiter).map(h => h.trim());
      const rows = lines.slice(1).map(line => {
        const values = line.split(delimiter);
        const row = {};
        headers.forEach((h, i) => {
          row[h] = values[i] !== undefined ? values[i].trim() : '';
        });
        return row;
      });
  
      return { headers, rows };
    }
  });
  