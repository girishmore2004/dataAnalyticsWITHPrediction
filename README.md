# 📊 Data Analytics with AI Prediction

An interactive **data analytics and AI-powered prediction platform** that allows users to upload CSV datasets, visualize data, select columns, and make predictions using multiple machine learning models — all through a responsive and intuitive interface.

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
✅ Select columns for analysis and prediction  
✅ Choose a target column to predict  
✅ Input new values to generate predictions  
✅ Automatically selects **best ML model** (Linear Regression, Random Forest, Gradient Boosting, etc.)  
✅ View **R² score** and **prediction results**  
✅ Multiple color **themes** (Light, Dark, Blue, Purple, Green)  
✅ Fully responsive UI built with **Bootstrap 5**

---

## 🧩 Tech Stack

### **Frontend (React)**
- React.js  
- React-Bootstrap  
- Axios  
- Deployed on **Vercel**

### **Backend (Node.js)**
- Express.js  
- Multer (for file uploads)  
- CSV-Parser (for reading CSV files)  
- Deployed on **Render**

### **AI Model (Flask)**
- Flask + Flask-CORS  
- Pandas, NumPy  
- Scikit-learn (ML algorithms)  
- Deployed on **Railway**

---

/data-analytics-with-ai-prediction
│
├── /frontend
│ ├── /public
│ ├── /src
│ │ ├── /components
│ │ │ ├── FileUpload.js
│ │ │ ├── DataTable.js
│ │ │ ├── PredictionForm.js
│ │ │ └── ThemeSelector.js
│ │ ├── App.js
│ │ ├── index.js
│ │ └── styles.js
│ └── package.json
│
├── /backend
│ ├── server.js
│ ├── package.json
│ ├── /uploads
│ └── .env
│
└── /ai-model
├── app.py
├── model.pkl
├── requirements.txt
└── /data


---

## ⚙️ Installation and Setup

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/girishmore2004/dataAnalyticsWITHPrediction.git
cd dataAnalyticsWITHPrediction

2️⃣ Setup Frontend (React)
cd frontend
npm install
npm start


Runs on http://localhost:3000

3️⃣ Setup Backend (Node.js + Express)
cd ../backend
npm install
node server.js


Runs on http://localhost:5000

4️⃣ Setup AI Model (Python + Flask)
cd ../ai-model
pip install -r requirements.txt
python app.py


Runs on http://localhost:8000

🔗 API Endpoints
Backend (Render)
Method	Endpoint	Description
POST	/upload	Uploads a CSV file
GET	/data	Fetches uploaded dataset
AI Model (Railway)
Method	Endpoint	Description
POST	/predict	Receives JSON input and returns model prediction
🌐 CORS Configuration

Make sure CORS is properly configured between:

Vercel (Frontend) → Render (Backend)

Render (Backend) → Railway (AI Model)

Example Flask setup:

from flask_cors import CORS
CORS(app, origins=["https://data-analytics-with-prediction-x9hw.vercel.app"])


Example Express setup:

app.use(cors({
  origin: "https://data-analytics-with-prediction-x9hw.vercel.app",
  methods: ["GET", "POST"],
  credentials: true
}));

🧪 Example Prediction Flow

1️⃣ User uploads a CSV file from the frontend.
2️⃣ The file is sent to the Node.js backend (Render).
3️⃣ Backend parses the CSV and sends the selected data to the Flask AI model (Railway).
4️⃣ Flask processes the data and predicts results using trained ML models.
5️⃣ The prediction and R² score are displayed on the frontend in a clean Bootstrap table.

🎨 UI Overview
Page	Description
Home	Upload CSV and preview data
Select Columns	Choose columns for analysis
Prediction Page	Enter new data and view model output
Theme Selector	Change color theme (Light/Dark/Blue/Purple/Green)
🧾 Environment Variables

Create .env file in backend:

PORT=5000


If your backend interacts with the AI model:

AI_MODEL_URL=https://dataanalyticswithprediction-production.up.railway.app/predict

🧰 Tools Used

Visual Studio Code

Git + GitHub

Postman (API testing)

Railway / Render / Vercel for deployment

💡 Troubleshooting
Issue	Cause	Solution
CORS Error	Domains not allowed in Flask/Express	Add frontend domain to CORS
405 Error	Wrong HTTP method or route	Ensure correct /predict POST route
404 Not Found	API URL mismatch	Verify backend + AI URLs
Network Error	Render/Railway app sleeping	Try refreshing after 30s
Git Push Error (non-fast-forward)	Local branch behind remote	Run git pull origin main --rebase before push
🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you would like to change.

🧑‍💻 Author

👤 Girish More
 

## 🛠️ Project Structure

