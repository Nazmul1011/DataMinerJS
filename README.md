# 🧠 Web-Based Interactive ML Pipeline (WEKA-Style)

A full-featured, browser-based machine learning pipeline simulator inspired by tools like **WEKA** — built using **HTML, CSS, JavaScript (Vanilla)**. This application allows users to upload datasets, preprocess data, apply ML models (classification, clustering, association), visualize results, and export final reports — all without writing a single line of code.

---

## 🚀 Key Features

- 📁 **Dataset Upload:** Drag-and-drop CSV or TSV file uploads
- 👁️ **Preview Interface:** Live metadata viewer (rows, columns, nulls, column types)
- 🧹 **Preprocessing Suite:** Missing value handling, normalization, encoding
- 🤖 **Model Training:** Choose task (Classification, Clustering, Association) with algorithm parameters
- 📊 **Visualization Dashboard:** Interactive charts (ROC, Clustering) via Chart.js
- 📈 **Results Panel:** Simulated accuracy, precision, recall, F1-score, and confusion matrix
- 📤 **Export Panel:** Simulated downloads (report/model) and reset functionality

---

## 🛠️ Built With

- **Frontend:**  
  - HTML5, CSS3  
  - Vanilla JavaScript  
  - Chart.js (for ROC and Scatter Plot visualization)

- **No Backend Required**  
  - Data is handled via `localStorage`  
  - Fully static, runs in any modern browser

---

## 📁 Project Structure

```
📦 project-root/
├── index.html               # Dataset Upload Page
├── preview.html             # Dataset Preview Page
├── preprocessing.html       # Data Preprocessing Page
├── modeling.html            # Algorithm Selection and Training Page
├── results.html             # Results Summary (Simulated Metrics)
├── visualizations.html      # ROC & Clustering Visualizations
├── export.html              # Export Reports / Reset Pipeline
│
├── js/
│   ├── upload.js            # Handles dataset upload and parsing
│   ├── preview.js           # Renders dataset preview and stats
│   ├── preprocess.js        # Applies preprocessing transformations
│   ├── model.js             # Manages algorithm selection and model training
│   ├── results.js           # Simulated results and confusion matrix display
│   ├── charts.js            # Chart rendering logic using Chart.js
│   └── export.js            # Download simulation and session reset
│
├── css/
│   └── style.css            # Common UI styling
```

---

## 🧪 ML Algorithms (Simulated)

Each modeling option provides adjustable parameters and stores config in `localStorage`:
- **Classification**
  - Decision Tree (`max_depth`)
  - KNN (`k`)
- **Clustering**
  - K-Means (`n_clusters`)
- **Association**
  - Apriori (`min_support`)

⚠️ *Note: Modeling is currently simulated — actual computation is not implemented but structured for integration.*

---

## 🖼️ Screenshots (Add in README)

You can add screenshots like:
```
![Upload Page](screenshots/upload.png)
![Modeling Page](screenshots/modeling.png)
```

---

## 📌 How to Use

1. Open `index.html` in a browser.
2. Upload a `.csv` or `.tsv` file.
3. Navigate through the tabs:
   - **Preview** the dataset
   - Apply **Preprocessing**
   - Select **Modeling Algorithm**
   - View **Results**
   - Explore **Visualizations**
   - **Export** or reset

> ⚠ All interactions are browser-local. No backend is needed.

---

## 🧠 Project Goals

This tool was created to:
- Help users understand ML workflows without coding
- Provide an intuitive GUI-based experience for beginners
- Mimic the functionality of traditional desktop tools (like WEKA) in the browser

---

## 👨‍💻 Author

**Nazmul Hasan**  
Bachelor of Computer Science & Engineering  
Green University of Bangladesh  
GitHub: [@Nazmul1011](https://github.com/Nazmul1011)

---

## 📄 License

This project is free to use and modify for **educational and academic** purposes.

---

## 🔗 Live Demo

To deploy and share online:
- Upload to [GitHub Pages](https://pages.github.com)
- Or host via Netlify / Vercel for a free static deployment
