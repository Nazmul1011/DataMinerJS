document.addEventListener('DOMContentLoaded', () => {
    const modelConfig = JSON.parse(localStorage.getItem('modelConfig') || '{}');
    const processedRows = JSON.parse(localStorage.getItem('processedRows') || '[]');
  
    if (!modelConfig.algorithm || !processedRows.length) {
      alert("Missing model configuration or processed data. Please return to modeling.");
      window.location.href = "modeling.html";
      return;
    }
  
    // Simulated output
    const simulatedResults = {
      accuracy: "0.91",
      precision: "0.89",
      recall: "0.94",
      f1: "0.91",
      confusion: {
        tp: 45,
        fn: 5,
        fp: 6,
        tn: 44
      }
    };
  
    // Debug log
    console.log("Results loaded:", simulatedResults);
  
    function setText(id, value) {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
      else console.warn(`Missing element ID: ${id}`);
    }
  
    setText('accuracyVal', simulatedResults.accuracy);
    setText('precisionVal', simulatedResults.precision);
    setText('recallVal', simulatedResults.recall);
    setText('f1Val', simulatedResults.f1);
  
    setText('tp', simulatedResults.confusion.tp);
    setText('fn', simulatedResults.confusion.fn);
    setText('fp', simulatedResults.confusion.fp);
    setText('tn', simulatedResults.confusion.tn);
  });
  