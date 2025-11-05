Absolutely ✅ — here’s the **entire README.md** placed **inside one complete Markdown code block** so you can just **copy-paste directly** into your GitHub repository without any formatting issues 👇

---

```markdown
# 📊 Data Analytics with AI Prediction

An interactive **data analytics and AI-powered prediction platform** that enables users to upload CSV datasets, visualize data, select columns, and generate predictions using advanced machine learning models — all from a clean, responsive web interface.

---

## 🚀 Deployment Details

| Component | Technology | Deployment Platform | Live URL |
|------------|-------------|---------------------|-----------|
| **Frontend** | React (Bootstrap) | [Vercel](https://vercel.com/) | 🔗 [https://data-analytics-with-prediction-x9hw.vercel.app](https://data-analytics-with-prediction-x9hw.vercel.app) |
| **Backend (File Upload API)** | Node.js + Express | [Render](https://render.com/) | 🔗 [https://dataanalyticswithprediction.onrender.com](https://dataanalyticswithprediction.onrender.com) |
| **AI Model API** | Python (Flask + Scikit-learn) | [Railway](https://railway.app/) | 🔗 [https://dataanalyticswithprediction-production.up.railway.app/](https://dataanalyticswithprediction-production.up.railway.app/) |

---

## 🧠 Features

✅ Upload and parse **CSV datasets**  
✅ View dataset structure (columns and rows)  
✅ Select specific columns for analysis  
✅ Choose a **target column** to predict  
✅ Input new data values for predictions  
✅ Automatically selects the **best ML model** among:
  - Linear Regression  
  - Decision Tree  
  - Random Forest  
  - Gradient Boosting  
  - Support Vector Regressor  
  - Neural Network Regressor  
✅ Displays **R² score** and prediction result  
✅ Multiple UI **themes** (Light, Dark, Blue, Purple, Green)  
✅ 100% **responsive design** built with Bootstrap 5  

---

## 🧩 Tech Stack

### **Frontend (React)**
- React.js  
- React-Bootstrap  
- Axios for API calls  
- Hosted on **Vercel**

### **Backend (Node.js)**
- Express.js for API routing  
- Multer for file upload  
- CSV-Parser for CSV reading  
- Hosted on **Render**

### **AI Model (Flask)**
- Flask + Flask-CORS  
- Pandas, NumPy  
- Scikit-learn (Machine Learning)  
- Hosted on **Railway**

---

## 🛠️ Project Structure

```

dataAnalyticsWITHPrediction/
│
├── /frontend/                         # React Frontend
│   ├── /components/                   # Reusable UI components
│   ├── /pages/                        # Main pages (Home, Prediction, etc.)
│   ├── App.js                         # Route and component configuration
│   ├── index.js                       # Entry point
│   └── package.json                   # Dependencies for frontend
│
├── /backend/                          # Node.js Backend
│   ├── server.js                      # Express server
│   ├── package.json                   # Dependencies for backend
│   └── uploads/                       # Temporary uploaded CSVs
│
├── /ai-model/                         # Flask AI Model
│   ├── app.py                         # Flask ML model API
│   ├── requirements.txt               # Python dependencies
│   └── best_model.pkl                 # Trained model file (auto-saved)
│
└── README.md                          # Project documentation

````

---

## ⚙️ How to Run Locally

### **1. Clone the Repository**
```bash
git clone https://github.com/girishmore2004/dataAnalyticsWITHPrediction.git
cd dataAnalyticsWITHPrediction
````

### **2. Setup Backend (Node.js)**

```bash
cd backend
npm install
npm start
```

### **3. Setup AI Model (Flask)**

```bash
cd ai-model
pip install -r requirements.txt
python app.py
```

### **4. Setup Frontend (React)**

```bash
cd frontend
npm install
npm start
```

Now open **[http://localhost:3000](http://localhost:3000)** in your browser 🚀

---

## 🌐 Environment Variables

### **For Backend (.env in `/backend`)**

```
PORT=5000
```

### **For AI Model (Railway Variables)**

```
PORT=8080
```

---

## 📦 API Endpoints

### **1. Backend (Node.js - Render)**

| Method | Endpoint  | Description               |
| ------ | --------- | ------------------------- |
| `POST` | `/upload` | Upload and parse CSV file |
| `GET`  | `/`       | Test API status           |

### **2. AI Model (Flask - Railway)**

| Method | Endpoint   | Description                                  |
| ------ | ---------- | -------------------------------------------- |
| `GET`  | `/`        | Check API health                             |
| `POST` | `/predict` | Send dataset and input values for prediction |

---

## 🧮 Sample Prediction Payload

```json
{
  "dataset": {
    "columns": ["Age", "Salary", "Experience", "Score"],
    "rows": [
      [25, 40000, 2, 60],
      [30, 50000, 3, 70],
      [35, 60000, 5, 80]
    ]
  },
  "selectedColumns": ["Age", "Salary", "Experience", "Score"],
  "targetColumn": "Score",
  "inputValues": [28, 45000, 2.5, 0]
}
```

✅ The API will return:

```json
{
  "prediction": 65.43,
  "targetColumn": "Score",
  "r2_score": 0.87,
  "best_model": "RandomForestRegressor"
}
```

---

## 🧰 Troubleshooting

| Issue                    | Possible Fix                                                                     |
| ------------------------ | -------------------------------------------------------------------------------- |
| ❌ `CORS` error           | Ensure CORS is enabled in Flask (`Flask-CORS`) and frontend uses correct API URL |
| ❌ 405 Method Not Allowed | Check if `/predict` is `POST`, not `GET`                                         |
| ❌ Not Found (404)        | Verify Railway API URL ends with `/predict`                                      |
| ❌ Model not responding   | Restart Railway service or redeploy Flask app                                    |

---

## 👨‍💻 Author

**Girish More**

---

## ⭐ Acknowledgements

* [Scikit-learn](https://scikit-learn.org/)
* [Flask](https://flask.palletsprojects.com/)
* [Bootstrap](https://getbootstrap.com/)
* [Render](https://render.com/)
* [Railway](https://railway.app/)
* [Vercel](https://vercel.com/)

---

## 🏁 Conclusion

This project demonstrates seamless integration between **React**, **Node.js**, and **Flask AI models**, allowing users to experience **data analytics and ML predictions** in real-time through a modern, responsive web interface.

```
---
```
