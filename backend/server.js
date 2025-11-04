// // const express = require("express");
// // const cors = require("cors");
// // const multer = require("multer");
// // const csv = require("csv-parser");
// // const fs = require("fs");
// // const path = require("path");

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // const upload = multer({ dest: "uploads/" });

// // // Upload CSV file
// // app.post("/upload", upload.single("file"), (req, res) => {
// //   if (!req.file) {
// //     return res.status(400).json({ error: "No file uploaded" });
// //   }

// //   const dataset = { columns: [], rows: [] };
// //   const filePath = path.join(__dirname, req.file.path);

// //   fs.createReadStream(filePath)
// //     .pipe(csv())
// //     .on("headers", (headers) => (dataset.columns = headers))
// //     .on("data", (row) => dataset.rows.push(Object.values(row)))
// //     .on("end", () => res.json(dataset))
// //     .on("error", (err) => {
// //       console.error("CSV Parsing Error:", err);
// //       res.status(500).json({ error: "CSV Parsing Failed" });
// //     });

// //   fs.unlink(filePath, (err) => {
// //     if (err) console.error("File deletion error:", err);
// //   });
// // });

// // // Start server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const csv = require("csv-parser");
// const fs = require("fs");
// const path = require("path");

// const app = express();
// app.use(cors({
//   origin: ["https://data-analytics-with-prediction-x9hw.vercel.app"], // ✅ your frontend URL
//   methods: ["GET", "POST"],
//   allowedHeaders: ["Content-Type"],
// }));

// app.use(express.json());

// const upload = multer({ dest: "uploads/" });

// // Upload CSV file
// app.post("/upload", upload.single("file"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   const dataset = { columns: [], rows: [] };
//   const filePath = path.join(__dirname, req.file.path);

//   fs.createReadStream(filePath)
//     .pipe(csv())
//     .on("headers", (headers) => (dataset.columns = headers))
//     .on("data", (row) => dataset.rows.push(Object.values(row)))
//     .on("end", () => res.json(dataset))
//     .on("error", (err) => {
//       console.error("CSV Parsing Error:", err);
//       res.status(500).json({ error: "CSV Parsing Failed" });
//     });

//   fs.unlink(filePath, (err) => {
//     if (err) console.error("File deletion error:", err);
//   });
// });

// // ✅ Add this simple test route
// app.get("/", (req, res) => {
//   res.send("Backend server is running successfully 🚀");
// });

// // ✅ Use Render's dynamic port
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

const app = express();

// ✅ Allow your frontend domain
app.use(cors({
  origin: ["https://data-analytics-with-prediction-x9hw.vercel.app"],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

const upload = multer({ dest: "uploads/" });

// Upload CSV file
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const dataset = { columns: [], rows: [] };
  const filePath = path.join(__dirname, req.file.path);

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("headers", (headers) => (dataset.columns = headers))
    .on("data", (row) => dataset.rows.push(Object.values(row)))
    .on("end", () => res.json(dataset))
    .on("error", (err) => {
      console.error("CSV Parsing Error:", err);
      res.status(500).json({ error: "CSV Parsing Failed" });
    });

  fs.unlink(filePath, (err) => {
    if (err) console.error("File deletion error:", err);
  });
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend server is running successfully 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
