document.addEventListener('DOMContentLoaded', () => {
    const taskSelect = document.getElementById('taskSelect');
    const algorithmSelect = document.getElementById('algorithmSelect');
    const parameterFields = document.getElementById('parameterFields');
    const trainBtn = document.getElementById('trainBtn');
  
    const processedRows = JSON.parse(localStorage.getItem('processedRows') || '[]');
    const headers = JSON.parse(localStorage.getItem('datasetHeaders') || '[]');
  
    if (!headers.length || !processedRows.length) {
      alert("No preprocessed dataset found. Please complete preprocessing first.");
      window.location.href = "preprocessing.html";
      return;
    }
  
    const algorithms = {
      classification: [
        { name: 'Decision Tree', params: [{ name: 'max_depth', label: 'Max Depth', type: 'number', default: 5 }] },
        { name: 'KNN', params: [{ name: 'k', label: 'K (Neighbors)', type: 'number', default: 3 }] }
      ],
      clustering: [
        { name: 'K-Means', params: [{ name: 'n_clusters', label: 'Clusters', type: 'number', default: 3 }] }
      ],
      association: [
        { name: 'Apriori', params: [{ name: 'min_support', label: 'Min Support', type: 'number', step: 0.01, default: 0.5 }] }
      ]
    };
  
    function updateAlgorithms(task) {
      algorithmSelect.innerHTML = '';
      algorithms[task].forEach((algo, i) => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = algo.name;
        algorithmSelect.appendChild(opt);
      });
      updateParams(task, 0);
    }
  
    function updateParams(task, index) {
      parameterFields.innerHTML = '';
      const params = algorithms[task][index].params;
      params.forEach(param => {
        const label = document.createElement('label');
        label.textContent = param.label;
  
        const input = document.createElement('input');
        input.type = param.type || 'number';
        input.name = param.name;
        input.value = param.default;
        if (param.step) input.step = param.step;
  
        const wrapper = document.createElement('div');
        wrapper.style.marginTop = '0.75rem';
        wrapper.appendChild(label);
        wrapper.appendChild(document.createElement('br'));
        wrapper.appendChild(input);
  
        parameterFields.appendChild(wrapper);
      });
    }
  
    taskSelect.addEventListener('change', () => {
      updateAlgorithms(taskSelect.value);
    });
  
    algorithmSelect.addEventListener('change', () => {
      updateParams(taskSelect.value, parseInt(algorithmSelect.value));
    });
  
    trainBtn.addEventListener('click', () => {
      const task = taskSelect.value;
      const algoIndex = parseInt(algorithmSelect.value);
      const algoName = algorithms[task][algoIndex].name;
  
      const params = {};
      parameterFields.querySelectorAll('input').forEach(input => {
        params[input.name] = input.value;
      });
  
      const modelConfig = {
        task,
        algorithm: algoName,
        parameters: params
      };
  
      localStorage.setItem('modelConfig', JSON.stringify(modelConfig));
      alert("✅ Model configuration saved. Proceeding to results...");
      window.location.href = "results.html";
    });
  
    // Init
    updateAlgorithms(taskSelect.value);
  });
  