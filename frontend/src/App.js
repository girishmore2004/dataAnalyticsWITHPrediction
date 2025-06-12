// // // import React, { useState } from "react";
// // // import axios from "axios";
// // // import { Container, Button, Form, Table, Row, Col } from "react-bootstrap";
// // // import DataVisualization from "./components/Visualization";

// // // function App() {
// // //   const [file, setFile] = useState(null);
// // //   const [dataset, setDataset] = useState(null);
// // //   const [selectedColumns, setSelectedColumns] = useState([]);
// // //   const [predictionResult, setPredictionResult] = useState(null);
// // //   const [showPredictionForm, setShowPredictionForm] = useState(false);
// // //   const [inputValues, setInputValues] = useState({});
// // //   const [targetColumn, setTargetColumn] = useState("");
// // //   const [darkMode, setDarkMode] = useState(false);

// // //   const handleFileChange = (e) => setFile(e.target.files[0]);

// // //   const handleUpload = async () => {
// // //     if (!file) {
// // //       alert("Please select a file first!");
// // //       return;
// // //     }
// // //     const formData = new FormData();
// // //     formData.append("file", file);

// // //     try {
// // //       const response = await axios.post("http://localhost:5000/upload", formData);
// // //       setDataset(response.data);
// // //     } catch (error) {
// // //       console.error("Error uploading file:", error);
// // //     }
// // //   };

// // //   const handleColumnSelect = (col) => {
// // //     setSelectedColumns((prev) =>
// // //       prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
// // //     );
// // //   };

// // //   const handleShowPredictionForm = () => {
// // //     if (selectedColumns.length < 2) {
// // //       alert("Please select at least two columns for prediction.");
// // //       return;
// // //     }
// // //     setShowPredictionForm(true);
// // //   };

// // //   const handleTargetColumnSelect = (e) => {
// // //     setTargetColumn(e.target.value);
// // //     const initialValues = {};
// // //     selectedColumns
// // //       .filter((col) => col !== e.target.value)
// // //       .forEach((col) => {
// // //         initialValues[col] = "";
// // //       });
// // //     setInputValues(initialValues);
// // //   };

// // //   const handleInputChange = (col, value) => {
// // //     setInputValues((prev) => ({
// // //       ...prev,
// // //       [col]: value,
// // //     }));
// // //   };

// // //   const handlePrediction = async () => {
// // //     try {
// // //       const formattedInputValues = {};
// // //       for (const [key, value] of Object.entries(inputValues)) {
// // //         formattedInputValues[key] = parseFloat(value);
// // //       }

// // //       const response = await axios.post("http://127.0.0.1:5001/predict", {
// // //         dataset,
// // //         selectedColumns,
// // //         targetColumn,
// // //         inputValues: formattedInputValues,
// // //       });
// // //       setPredictionResult(response.data);
// // //     } catch (error) {
// // //       console.error("Error fetching prediction:", error);
// // //       alert("Prediction failed. Please check the input values and try again.");
// // //     }
// // //   };

// // //   const toggleDarkMode = () => setDarkMode(!darkMode);

// // //   const themeStyles = {
// // //     light: {
// // //       backgroundColor: "#ffffff",
// // //       textColor: "#000000",
// // //       buttonColor: "#4CAF50",
// // //       buttonTextColor: "#ffffff",
// // //       tableHeaderColor: "#f8f9fa",
// // //     },
// // //     dark: {
// // //       backgroundColor: "#121212",
// // //       textColor: "#ffffff",
// // //       buttonColor: "#4CAF50",
// // //       buttonTextColor: "#ffffff",
// // //       tableHeaderColor: "#333333",
// // //     },
// // //   };

// // //   const currentTheme = darkMode ? themeStyles.dark : themeStyles.light;

// // //   return (
// // //     <Container
// // //       fluid
// // //       style={{
// // //         backgroundColor: currentTheme.backgroundColor,
// // //         color: currentTheme.textColor,
// // //         minHeight: "100vh",
// // //         padding: "20px",
// // //       }}
// // //     >
// // //       <Row className="mb-4">
// // //         <Col>
// // //           <h2 className="mt-3">📊 Dataset Analyzer</h2>
// // //         </Col>
// // //         <Col className="d-flex justify-content-end">
// // //           <Button
// // //             onClick={toggleDarkMode}
// // //             style={{
// // //               backgroundColor: currentTheme.buttonColor,
// // //               color: currentTheme.buttonTextColor,
// // //               border: "none",
// // //               padding: "10px 20px",
// // //               borderRadius: "8px",
// // //               cursor: "pointer",
// // //             }}
// // //           >
// // //             {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
// // //           </Button>
// // //         </Col>
// // //       </Row>

// // //       <Row className="mb-4">
// // //         <Col md={8}>
// // //           <Form.Group>
// // //             <Form.Label>Select CSV File</Form.Label>
// // //             <Form.Control
// // //               type="file"
// // //               accept=".csv"
// // //               onChange={handleFileChange}
// // //               style={{
// // //                 backgroundColor: currentTheme.backgroundColor,
// // //                 color: currentTheme.textColor,
// // //               }}
// // //             />
// // //           </Form.Group>
// // //         </Col>
// // //         <Col md={4} className="d-flex align-items-end ">
// // //           <Button
// // //             onClick={handleUpload}
// // //             className="w-100"
// // //             style={{
// // //               backgroundColor: currentTheme.buttonColor,
// // //               color: currentTheme.buttonTextColor,
// // //               marginTop:10,
// // //             }}
// // //           >
// // //             📤 Upload
// // //           </Button>
// // //         </Col>
// // //       </Row>

// // //       {dataset && (
// // //         <div className="mb-4">
// // //           <h3>Dataset Preview</h3>
// // //           <div style={{ maxHeight: "400px", overflowY: "auto" }}>
// // //             <Table striped bordered hover>
// // //               <thead style={{ backgroundColor: currentTheme.tableHeaderColor }}>
// // //                 <tr>
// // //                   {dataset.columns.map((col, index) => (
// // //                     <th key={index}>
// // //                       <Form.Check
// // //                         type="checkbox"
// // //                         label={col}
// // //                         onChange={() => handleColumnSelect(col)}
// // //                         style={{ color: currentTheme.textColor }}
// // //                       />
// // //                     </th>
// // //                   ))}
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {dataset.rows.map((row, rowIndex) => (
// // //                   <tr key={rowIndex}>
// // //                     {row.map((cell, colIndex) => (
// // //                       <td key={colIndex}>{cell}</td>
// // //                     ))}
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </Table>
// // //           </div>
// // //           <Button
// // //             className="mt-3"
// // //             onClick={handleShowPredictionForm}
// // //             style={{
// // //               backgroundColor: currentTheme.buttonColor,
// // //               color: currentTheme.buttonTextColor,
// // //               border: "none",
// // //               padding: "10px 20px",
// // //               borderRadius: "5px",
// // //               cursor: "pointer",
// // //             }}
// // //           >
// // //             Predict
// // //           </Button>
// // //         </div>
// // //       )}

// // //       {showPredictionForm && (
// // //         <Form className="mb-4">
// // //           <h4>Select Target Column for Prediction</h4>
// // //           <Form.Select
// // //             onChange={handleTargetColumnSelect}
// // //             style={{
// // //               backgroundColor: currentTheme.backgroundColor,
// // //               color: currentTheme.textColor,
// // //             }}
// // //           >
// // //             <option value="">Select a column to predict</option>
// // //             {selectedColumns.map((col, index) => (
// // //               <option key={index} value={col}>
// // //                 {col}
// // //               </option>
// // //             ))}
// // //           </Form.Select>

// // //           {targetColumn && (
// // //             <>
// // //               <h4 className="mt-3">Enter Input Values for Prediction</h4>
// // //               {selectedColumns
// // //                 .filter((col) => col !== targetColumn)
// // //                 .map((col, index) => (
// // //                   <Form.Group key={index} className="mb-2">
// // //                     <Form.Label>{col}</Form.Label>
// // //                     <Form.Control
// // //                       type="text"
// // //                       value={inputValues[col]}
// // //                       onChange={(e) => handleInputChange(col, e.target.value)}
// // //                       style={{
// // //                         backgroundColor: currentTheme.backgroundColor,
// // //                         color: currentTheme.textColor,
// // //                       }}
// // //                     />
// // //                   </Form.Group>
// // //                 ))}
// // //               <Button
// // //                 onClick={handlePrediction}
// // //                 style={{
// // //                   backgroundColor: currentTheme.buttonColor,
// // //                   color: currentTheme.buttonTextColor,
// // //                   border: "none",
// // //                   padding: "10px 20px",
// // //                   borderRadius: "5px",
// // //                   cursor: "pointer",
// // //                 }}
// // //               >
// // //                 Get Prediction
// // //               </Button>
// // //             </>
// // //           )}
// // //         </Form>
// // //       )}

// // //       {predictionResult && (
// // //         <div className="mb-4">
// // //           <h3>Prediction Result</h3>
// // //           <pre>{JSON.stringify(predictionResult, null, 2)}</pre>
// // //         </div>
// // //       )}

// // //       {dataset && selectedColumns.length > 1 && (
// // //         <DataVisualization
// // //           data={dataset}
// // //           selectedColumns={selectedColumns}
// // //           darkMode={darkMode}
// // //         />
// // //       )}
// // //     </Container>
// // //   );
// // // }

// // // export default App;

// // import React, { useState } from "react";
// // import axios from "axios";
// // import { Container, Button, Form, Table, Row, Col, Navbar, Nav } from "react-bootstrap";
// // import DataVisualization from "./components/Visualization";
// // import "./App.css"; // Custom CSS for animations and themes

// // function App() {
// //   const [file, setFile] = useState(null);
// //   const [dataset, setDataset] = useState(null);
// //   const [selectedColumns, setSelectedColumns] = useState([]);
// //   const [predictionResult, setPredictionResult] = useState(null);
// //   const [showPredictionForm, setShowPredictionForm] = useState(false);
// //   const [inputValues, setInputValues] = useState({});
// //   const [targetColumn, setTargetColumn] = useState("");
// //   const [theme, setTheme] = useState("light"); // Default theme

// //   const themes = {
// //     light: {
// //       backgroundColor: "#ffffff",
// //       textColor: "#000000",
// //       buttonColor: "#4CAF50",
// //       buttonTextColor: "#ffffff",
// //       tableHeaderColor: "#f8f9fa",
// //       navbarColor: "#f8f9fa",
// //     },
// //     dark: {
// //       backgroundColor: "#121212",
// //       textColor: "#ffffff",
// //       buttonColor: "#4CAF50",
// //       buttonTextColor: "#ffffff",
// //       tableHeaderColor: "#333333",
// //       navbarColor: "#333333",
// //     },
// //     blue: {
// //       backgroundColor: "#e3f2fd",
// //       textColor: "#000000",
// //       buttonColor: "#2196F3",
// //       buttonTextColor: "#ffffff",
// //       tableHeaderColor: "#bbdefb",
// //       navbarColor: "#bbdefb",
// //     },
// //     purple: {
// //       backgroundColor: "#f3e5f5",
// //       textColor: "#000000",
// //       buttonColor: "#9C27B0",
// //       buttonTextColor: "#ffffff",
// //       tableHeaderColor: "#e1bee7",
// //       navbarColor: "#e1bee7",
// //     },
// //   };

// //   const currentTheme = themes[theme];

// //   const handleFileChange = (e) => setFile(e.target.files[0]);

// //   const handleUpload = async () => {
// //     if (!file) {
// //       alert("Please select a file first!");
// //       return;
// //     }
// //     const formData = new FormData();
// //     formData.append("file", file);

// //     try {
// //       const response = await axios.post("http://localhost:5000/upload", formData);
// //       setDataset(response.data);
// //     } catch (error) {
// //       console.error("Error uploading file:", error);
// //     }
// //   };

// //   const handleColumnSelect = (col) => {
// //     setSelectedColumns((prev) =>
// //       prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
// //     );
// //   };

// //   const handleShowPredictionForm = () => {
// //     if (selectedColumns.length < 2) {
// //       alert("Please select at least two columns for prediction.");
// //       return;
// //     }
// //     setShowPredictionForm(true);
// //   };

// //   const handleTargetColumnSelect = (e) => {
// //     setTargetColumn(e.target.value);
// //     const initialValues = {};
// //     selectedColumns
// //       .filter((col) => col !== e.target.value)
// //       .forEach((col) => {
// //         initialValues[col] = "";
// //       });
// //     setInputValues(initialValues);
// //   };

// //   const handleInputChange = (col, value) => {
// //     setInputValues((prev) => ({
// //       ...prev,
// //       [col]: value,
// //     }));
// //   };

// //   const handlePrediction = async () => {
// //     try {
// //       const formattedInputValues = {};
// //       for (const [key, value] of Object.entries(inputValues)) {
// //         formattedInputValues[key] = parseFloat(value);
// //       }

// //       const response = await axios.post("http://127.0.0.1:5001/predict", {
// //         dataset,
// //         selectedColumns,
// //         targetColumn,
// //         inputValues: formattedInputValues,
// //       });
// //       setPredictionResult(response.data);
// //     } catch (error) {
// //       console.error("Error fetching prediction:", error);
// //       alert("Prediction failed. Please check the input values and try again.");
// //     }
// //   };

// //   const toggleTheme = (selectedTheme) => setTheme(selectedTheme);

// //   return (
// //     <div
// //       style={{
// //         backgroundColor: currentTheme.backgroundColor,
// //         color: currentTheme.textColor,
// //         minHeight: "100vh",
// //       }}
// //     >
// //       {/* Navbar */}
// //       <Navbar
// //         expand="lg"
// //         style={{ backgroundColor: currentTheme.navbarColor, padding: "10px 20px" }}
// //       >
// //         <Navbar.Brand href="#home" style={{ color: currentTheme.textColor }}>
// //           📊 Dataset Analyzer
// //         </Navbar.Brand>
// //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
// //         <Navbar.Collapse id="basic-navbar-nav">
// //           <Nav className="me-auto">
// //             <Nav.Link href="#home" style={{ color: currentTheme.textColor }}>
// //               Home
// //             </Nav.Link>
// //             <Nav.Link href="#features" style={{ color: currentTheme.textColor }}>
// //               Features
// //             </Nav.Link>
// //             <Nav.Link href="#upload" style={{ color: currentTheme.textColor }}>
// //               Upload Dataset
// //             </Nav.Link>
// //           </Nav>
// //           <div>
// //             <Button
// //               onClick={() => toggleTheme("light")}
// //               style={{
// //                 backgroundColor: themes.light.buttonColor,
// //                 color: themes.light.buttonTextColor,
// //                 marginRight: "10px",
// //               }}
// //             >
// //               Light
// //             </Button>
// //             <Button
// //               onClick={() => toggleTheme("dark")}
// //               style={{
// //                 backgroundColor: themes.dark.buttonColor,
// //                 color: themes.dark.buttonTextColor,
// //                 marginRight: "10px",
// //               }}
// //             >
// //               Dark
// //             </Button>
// //             <Button
// //               onClick={() => toggleTheme("blue")}
// //               style={{
// //                 backgroundColor: themes.blue.buttonColor,
// //                 color: themes.blue.buttonTextColor,
// //                 marginRight: "10px",
// //               }}
// //             >
// //               Blue
// //             </Button>
// //             <Button
// //               onClick={() => toggleTheme("purple")}
// //               style={{
// //                 backgroundColor: themes.purple.buttonColor,
// //                 color: themes.purple.buttonTextColor,
// //               }}
// //             >
// //               Purple
// //             </Button>
// //           </div>
// //         </Navbar.Collapse>
// //       </Navbar>

// //       {/* Front Page */}
// //       <div
// //         id="home"
// //         style={{
// //           padding: "100px 20px",
// //           textAlign: "center",
// //           backgroundColor: currentTheme.backgroundColor,
// //           color: currentTheme.textColor,
// //         }}
// //       >
// //         <h1>Welcome to Dataset Analyzer</h1>
// //         <p>Analyze and visualize your datasets with ease.</p>
// //         <Button
// //           href="#upload"
// //           style={{
// //             backgroundColor: currentTheme.buttonColor,
// //             color: currentTheme.buttonTextColor,
// //           }}
// //         >
// //           Get Started
// //         </Button>
// //       </div>

// //       {/* Features Section */}
// //       <div
// //         id="features"
// //         style={{
// //           padding: "50px 20px",
// //           backgroundColor: currentTheme.backgroundColor,
// //           color: currentTheme.textColor,
// //         }}
// //       >
// //         <h2>Features</h2>
// //         <Row>
// //           <Col md={4}>
// //             <h3>📊 Data Visualization</h3>
// //             <p>Visualize your data with interactive charts.</p>
// //           </Col>
// //           <Col md={4}>
// //             <h3>🔮 Predictions</h3>
// //             <p>Make predictions using machine learning models.</p>
// //           </Col>
// //           <Col md={4}>
// //             <h3>🎨 Custom Themes</h3>
// //             <p>Choose from multiple attractive themes.</p>
// //           </Col>
// //         </Row>
// //       </div>

// //       {/* Upload Dataset Section */}
// //       <Container
// //         id="upload"
// //         fluid
// //         style={{
// //           padding: "50px 20px",
// //           backgroundColor: currentTheme.backgroundColor,
// //           color: currentTheme.textColor,
// //         }}
// //       >
// //         <Row className="mb-4">
// //           <Col md={8}>
// //             <Form.Group>
// //               <Form.Label>Select CSV File</Form.Label>
// //               <Form.Control
// //                 type="file"
// //                 accept=".csv"
// //                 onChange={handleFileChange}
// //                 style={{
// //                   backgroundColor: currentTheme.backgroundColor,
// //                   color: currentTheme.textColor,
// //                 }}
// //               />
// //             </Form.Group>
// //           </Col>
// //           <Col md={4} className="d-flex align-items-end">
// //             <Button
// //               onClick={handleUpload}
// //               className="w-100"
// //               style={{
// //                 backgroundColor: currentTheme.buttonColor,
// //                 color: currentTheme.buttonTextColor,
// //               }}
// //             >
// //               📤 Upload
// //             </Button>
// //           </Col>
// //         </Row>

// //         {dataset && (
// //           <div className="mb-4">
// //             <h3>Dataset Preview</h3>
// //             <div style={{ maxHeight: "400px", overflowY: "auto" }}>
// //               <Table striped bordered hover>
// //                 <thead style={{ backgroundColor: currentTheme.tableHeaderColor }}>
// //                   <tr>
// //                     {dataset.columns.map((col, index) => (
// //                       <th key={index}>
// //                         <Form.Check
// //                           type="checkbox"
// //                           label={col}
// //                           onChange={() => handleColumnSelect(col)}
// //                           style={{ color: currentTheme.textColor }}
// //                         />
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {dataset.rows.map((row, rowIndex) => (
// //                     <tr key={rowIndex}>
// //                       {row.map((cell, colIndex) => (
// //                         <td key={colIndex}>{cell}</td>
// //                       )}
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </Table>
// //             </div>
// //             <Button
// //               className="mt-3"
// //               onClick={handleShowPredictionForm}
// //               style={{
// //                 backgroundColor: currentTheme.buttonColor,
// //                 color: currentTheme.buttonTextColor,
// //               }}
// //             >
// //               Predict
// //             </Button>
// //           </div>
// //         )}

// //         {showPredictionForm && (
// //           <Form className="mb-4">
// //             <h4>Select Target Column for Prediction</h4>
// //             <Form.Select
// //               onChange={handleTargetColumnSelect}
// //               style={{
// //                 backgroundColor: currentTheme.backgroundColor,
// //                 color: currentTheme.textColor,
// //               }}
// //             >
// //               <option value="">Select a column to predict</option>
// //               {selectedColumns.map((col, index) => (
// //                 <option key={index} value={col}>
// //                   {col}
// //                 </option>
// //               ))}
// //             </Form.Select>

// //             {targetColumn && (
// //               <>
// //                 <h4 className="mt-3">Enter Input Values for Prediction</h4>
// //                 {selectedColumns
// //                   .filter((col) => col !== targetColumn)
// //                   .map((col, index) => (
// //                     <Form.Group key={index} className="mb-2">
// //                       <Form.Label>{col}</Form.Label>
// //                       <Form.Control
// //                         type="text"
// //                         value={inputValues[col]}
// //                         onChange={(e) => handleInputChange(col, e.target.value)}
// //                         style={{
// //                           backgroundColor: currentTheme.backgroundColor,
// //                           color: currentTheme.textColor,
// //                         }}
// //                       />
// //                     </Form.Group>
// //                   ))}
// //                 <Button
// //                   onClick={handlePrediction}
// //                   style={{
// //                     backgroundColor: currentTheme.buttonColor,
// //                     color: currentTheme.buttonTextColor,
// //                   }}
// //                 >
// //                   Get Prediction
// //                 </Button>
// //               </>
// //             )}
// //           </Form>
// //         )}

// //         {predictionResult && (
// //           <div className="mb-4">
// //             <h3>Prediction Result</h3>
// //             <pre>{JSON.stringify(predictionResult, null, 2)}</pre>
// //           </div>
// //         )}

// //         {dataset && selectedColumns.length > 1 && (
// //           <DataVisualization
// //             data={dataset}
// //             selectedColumns={selectedColumns}
// //             theme={theme}
// //           />
// //         )}
// //       </Container>
// //     </div>
// //   );
// // }

// // export default App;

// import React, { useState } from "react";
// import axios from "axios";
// import { Container, Button, Form, Table, Row, Col, Navbar, Nav } from "react-bootstrap";
// import DataVisualization from "./components/Visualization";
// import "./App.css"; // Custom CSS for animations and themes

// function App() {
//   const [file, setFile] = useState(null);
//   const [dataset, setDataset] = useState(null);
//   const [selectedColumns, setSelectedColumns] = useState([]);
//   const [predictionResult, setPredictionResult] = useState(null);
//   const [showPredictionForm, setShowPredictionForm] = useState(false);
//   const [inputValues, setInputValues] = useState({});
//   const [targetColumn, setTargetColumn] = useState("");
//   const [theme, setTheme] = useState("light"); // Default theme

//   const themes = {
//     light: {
//       backgroundColor: "#ffffff",
//       textColor: "#000000",
//       buttonColor: "#4CAF50",
//       buttonTextColor: "#ffffff",
//       tableHeaderColor: "#f8f9fa",
//       navbarColor: "#f8f9fa",
//     },
//     dark: {
//       backgroundColor: "#121212",
//       textColor: "#ffffff",
//       buttonColor: "#4CAF50",
//       buttonTextColor: "#ffffff",
//       tableHeaderColor: "#333333",
//       navbarColor: "#333333",
//     },
//     blue: {
//       backgroundColor: "#e3f2fd",
//       textColor: "#000000",
//       buttonColor: "#2196F3",
//       buttonTextColor: "#ffffff",
//       tableHeaderColor: "#bbdefb",
//       navbarColor: "#bbdefb",
//     },
//     purple: {
//       backgroundColor: "#f3e5f5",
//       textColor: "#000000",
//       buttonColor: "#9C27B0",
//       buttonTextColor: "#ffffff",
//       tableHeaderColor: "#e1bee7",
//       navbarColor: "#e1bee7",
//     },
//   };

//   const currentTheme = themes[theme];

//   const handleFileChange = (e) => setFile(e.target.files[0]);

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a file first!");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post("http://localhost:5000/upload", formData);
//       setDataset(response.data);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   };

//   const handleColumnSelect = (col) => {
//     setSelectedColumns((prev) =>
//       prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
//     );
//   };

//   const handleShowPredictionForm = () => {
//     if (selectedColumns.length < 2) {
//       alert("Please select at least two columns for prediction.");
//       return;
//     }
//     setShowPredictionForm(true);
//   };

//   const handleTargetColumnSelect = (e) => {
//     setTargetColumn(e.target.value);
//     const initialValues = {};
//     selectedColumns
//       .filter((col) => col !== e.target.value)
//       .forEach((col) => {
//         initialValues[col] = "";
//       });
//     setInputValues(initialValues);
//   };

//   const handleInputChange = (col, value) => {
//     setInputValues((prev) => ({
//       ...prev,
//       [col]: value,
//     }));
//   };

//   const handlePrediction = async () => {
//     try {
//       const formattedInputValues = {};
//       for (const [key, value] of Object.entries(inputValues)) {
//         formattedInputValues[key] = parseFloat(value);
//       }

//       const response = await axios.post("http://127.0.0.1:5001/predict", {
//         dataset,
//         selectedColumns,
//         targetColumn,
//         inputValues: formattedInputValues,
//       });
//       setPredictionResult(response.data);
//     } catch (error) {
//       console.error("Error fetching prediction:", error);
//       alert("Prediction failed. Please check the input values and try again.");
//     }
//   };

//   const toggleTheme = (selectedTheme) => setTheme(selectedTheme);

//   return (
//     <div
//       style={{
//         backgroundColor: currentTheme.backgroundColor,
//         color: currentTheme.textColor,
//         minHeight: "100vh",
//       }}
//     >
//       {/* Navbar */}
//       <Navbar
//         expand="lg"
//         style={{ backgroundColor: currentTheme.navbarColor, padding: "10px 20px" }}
//       >
//         <Navbar.Brand href="#home" style={{ color: currentTheme.textColor }}>
//           📊 Dataset Analyzer
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link href="#home" style={{ color: currentTheme.textColor }}>
//               Home
//             </Nav.Link>
//             <Nav.Link href="#features" style={{ color: currentTheme.textColor }}>
//               Features
//             </Nav.Link>
//             <Nav.Link href="#upload" style={{ color: currentTheme.textColor }}>
//               Upload Dataset
//             </Nav.Link>
//           </Nav>
//           <div>
//             <Button
//               onClick={() => toggleTheme("light")}
//               style={{
//                 backgroundColor: themes.light.buttonColor,
//                 color: themes.light.buttonTextColor,
//                 marginRight: "10px",
//               }}
//             >
//               Light
//             </Button>
//             <Button
//               onClick={() => toggleTheme("dark")}
//               style={{
//                 backgroundColor: themes.dark.buttonColor,
//                 color: themes.dark.buttonTextColor,
//                 marginRight: "10px",
//               }}
//             >
//               Dark
//             </Button>
//             <Button
//               onClick={() => toggleTheme("blue")}
//               style={{
//                 backgroundColor: themes.blue.buttonColor,
//                 color: themes.blue.buttonTextColor,
//                 marginRight: "10px",
//               }}
//             >
//               Blue
//             </Button>
//             <Button
//               onClick={() => toggleTheme("purple")}
//               style={{
//                 backgroundColor: themes.purple.buttonColor,
//                 color: themes.purple.buttonTextColor,
//               }}
//             >
//               Purple
//             </Button>
//           </div>
//         </Navbar.Collapse>
//       </Navbar>

//       {/* Front Page */}
//       <div
//         id="home"
//         style={{
//           padding: "100px 20px",
//           textAlign: "center",
//           backgroundColor: currentTheme.backgroundColor,
//           color: currentTheme.textColor,
//         }}
//       >
//         <h1>Welcome to Dataset Analyzer</h1>
//         <p>Analyze and visualize your datasets with ease.</p>
//         <Button
//           href="#upload"
//           style={{
//             backgroundColor: currentTheme.buttonColor,
//             color: currentTheme.buttonTextColor,
//           }}
//         >
//           Get Started
//         </Button>
//       </div>

//       {/* Features Section */}
//       <div
//         id="features"
//         style={{
//           padding: "50px 20px",
//           backgroundColor: currentTheme.backgroundColor,
//           color: currentTheme.textColor,
//         }}
//       >
//         <h2>Features</h2>
//         <Row>
//           <Col md={4}>
//             <h3>📊 Data Visualization</h3>
//             <p>Visualize your data with interactive charts.</p>
//           </Col>
//           <Col md={4}>
//             <h3>🔮 Predictions</h3>
//             <p>Make predictions using machine learning models.</p>
//           </Col>
//           <Col md={4}>
//             <h3>🎨 Custom Themes</h3>
//             <p>Choose from multiple attractive themes.</p>
//           </Col>
//         </Row>
//       </div>

//       {/* Upload Dataset Section */}
//       <Container
//         id="upload"
//         fluid
//         style={{
//           padding: "50px 20px",
//           backgroundColor: currentTheme.backgroundColor,
//           color: currentTheme.textColor,
//         }}
//       >
//         <Row className="mb-4">
//           <Col md={8}>
//             <Form.Group>
//               <Form.Label>Select CSV File</Form.Label>
//               <Form.Control
//                 type="file"
//                 accept=".csv"
//                 onChange={handleFileChange}
//                 style={{
//                   backgroundColor: currentTheme.backgroundColor,
//                   color: currentTheme.textColor,
//                 }}
//               />
//             </Form.Group>
//           </Col>
//           <Col md={4} className="d-flex align-items-end">
//             <Button
//               onClick={handleUpload}
//               className="w-100"
//               style={{
//                 backgroundColor: currentTheme.buttonColor,
//                 color: currentTheme.buttonTextColor,
//               }}
//             >
//               📤 Upload
//             </Button>
//           </Col>
//         </Row>

//         {dataset && (
//           <div className="mb-4">
//             <h3>Dataset Preview</h3>
//             <div style={{ maxHeight: "400px", overflowY: "auto" }}>
//               <Table striped bordered hover>
//                 <thead style={{ backgroundColor: currentTheme.tableHeaderColor }}>
//                   <tr>
//                     {dataset.columns.map((col, index) => (
//                       <th key={index}>
//                         <Form.Check
//                           type="checkbox"
//                           label={col}
//                           onChange={() => handleColumnSelect(col)}
//                           style={{ color: currentTheme.textColor }}
//                         />
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {dataset.rows.map((row, rowIndex) => (
//                     <tr key={rowIndex}>
//                       {row.map((cell, colIndex) => (
//                         <td key={colIndex}>{cell}</td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </div>
//             <Button
//               className="mt-3"
//               onClick={handleShowPredictionForm}
//               style={{
//                 backgroundColor: currentTheme.buttonColor,
//                 color: currentTheme.buttonTextColor,
//               }}
//             >
//               Predict
//             </Button>
//           </div>
//         )}

//         {showPredictionForm && (
//           <Form className="mb-4">
//             <h4>Select Target Column for Prediction</h4>
//             <Form.Select
//               onChange={handleTargetColumnSelect}
//               style={{
//                 backgroundColor: currentTheme.backgroundColor,
//                 color: currentTheme.textColor,
//               }}
//             >
//               <option value="">Select a column to predict</option>
//               {selectedColumns.map((col, index) => (
//                 <option key={index} value={col}>
//                   {col}
//                 </option>
//               ))}
//             </Form.Select>

//             {targetColumn && (
//               <>
//                 <h4 className="mt-3">Enter Input Values for Prediction</h4>
//                 {selectedColumns
//                   .filter((col) => col !== targetColumn)
//                   .map((col, index) => (
//                     <Form.Group key={index} className="mb-2">
//                       <Form.Label>{col}</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={inputValues[col]}
//                         onChange={(e) => handleInputChange(col, e.target.value)}
//                         style={{
//                           backgroundColor: currentTheme.backgroundColor,
//                           color: currentTheme.textColor,
//                         }}
//                       />
//                     </Form.Group>
//                   ))}
//                 <Button
//                   onClick={handlePrediction}
//                   style={{
//                     backgroundColor: currentTheme.buttonColor,
//                     color: currentTheme.buttonTextColor,
//                   }}
//                 >
//                   Get Prediction
//                 </Button>
//               </>
//             )}
//           </Form>
//         )}

//         {predictionResult && (
//           <div className="mb-4">
//             <h3>Prediction Result</h3>
//             <pre>{JSON.stringify(predictionResult, null, 2)}</pre>
//           </div>
//         )}

//         {dataset && selectedColumns.length > 1 && (
//           <DataVisualization
//             data={dataset}
//             selectedColumns={selectedColumns}
//             theme={theme}
//           />
//         )}
//       </Container>
//     </div>
//   );
// }

// export default App;


import React, { useState } from "react";
import axios from "axios";
import { Container, Button, Form, Table, Row, Col, Navbar, Nav } from "react-bootstrap";
import DataVisualization from "./components/Visualization";
import "./App.css"; // Custom CSS for animations and themes

function App() {
  const [file, setFile] = useState(null);
  const [dataset, setDataset] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [predictionResult, setPredictionResult] = useState(null);
  const [showPredictionForm, setShowPredictionForm] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [targetColumn, setTargetColumn] = useState("");
  const [theme, setTheme] = useState("light"); // Default theme

  const themes = {
    light: {
      backgroundColor: "#ffffff",
      textColor: "#000000",
      buttonColor: "grey",
      buttonTextColor: "#ffffff",
      tableHeaderColor: "#f8f9fa",
      navbarColor: "#f8f9fa",
    },
    dark: {
      backgroundColor: "#121212",
      textColor: "#ffffff",
      buttonColor: "black",
      buttonTextColor: "#ffffff",
      tableHeaderColor: "#333333",
      navbarColor: "#333333",
    },
    blue: {
      backgroundColor: "#e3f2fd",
      textColor: "#000000",
      buttonColor: "#2196F3",
      buttonTextColor: "#ffffff",
      tableHeaderColor: "#bbdefb",
      navbarColor: "#bbdefb",
    },
    purple: {
      backgroundColor: "#f3e5f5",
      textColor: "#000000",
      buttonColor: "#9C27B0",
      buttonTextColor: "#ffffff",
      tableHeaderColor: "#e1bee7",
      navbarColor: "#e1bee7",
    },
    lightGreen: {
      // backgroundColor: "#333",
      // textColor: "#ffffff",
      // buttonColor: "#4CAF50",
      // buttonTextColor: "#ffffff",
      tableHeaderColor: "#4CAF50",
      navbarColor: "#4CAF50",
      backgroundColor: "#E8F5E9",
      textColor: "#000",
      buttonColor: "#4CAF50",
      buttonTextColor: "#fff",
    },
  };

  const currentTheme = themes[theme];

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData);
      setDataset(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleColumnSelect = (col) => {
    setSelectedColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const handleShowPredictionForm = () => {
    if (selectedColumns.length < 2) {
      alert("Please select at least two columns for prediction.");
      return;
    }
    setShowPredictionForm(true);
  };

  const handleTargetColumnSelect = (e) => {
    setTargetColumn(e.target.value);
    const initialValues = {};
    selectedColumns
      .filter((col) => col !== e.target.value)
      .forEach((col) => {
        initialValues[col] = "";
      });
    setInputValues(initialValues);
  };

  const handleInputChange = (col, value) => {
    setInputValues((prev) => ({
      ...prev,
      [col]: value,
    }));
  };

  const handlePrediction = async () => {
    try {
      const formattedInputValues = {};
      for (const [key, value] of Object.entries(inputValues)) {
        formattedInputValues[key] = parseFloat(value);
      }

      const response = await axios.post("http://127.0.0.1:5001/predict", {
        dataset,
        selectedColumns,
        targetColumn,
        inputValues: formattedInputValues,
      });
      setPredictionResult(response.data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      alert("Prediction failed. Please check the input values and try again.");
    }
  };

  const toggleTheme = (selectedTheme) => setTheme(selectedTheme);

  return (
    <div
      style={{
        backgroundColor: currentTheme.backgroundColor,
        color: currentTheme.textColor,
        minHeight: "100vh",
      }}
    >
      {/* Navbar */}
      <Navbar
        expand="lg"
        style={{ backgroundColor: currentTheme.navbarColor, padding: "10px 20px" }}
      >
        <Navbar.Brand href="#home" style={{ color: currentTheme.textColor }}>
          📊 Dataset Analyzer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" style={{ color: currentTheme.textColor }}>
              Home
            </Nav.Link>
            <Nav.Link href="#features" style={{ color: currentTheme.textColor }}>
              Features
            </Nav.Link>
            <Nav.Link href="#upload" style={{ color: currentTheme.textColor }}>
              Upload Dataset
            </Nav.Link>
          </Nav>
          <div>
            <Button
              onClick={() => toggleTheme("light")}
              style={{
                backgroundColor: themes.light.buttonColor,
                color: themes.light.buttonTextColor,
                marginRight: "10px",
              }}
            >
              Light
            </Button>
            <Button
              onClick={() => toggleTheme("dark")}
              style={{
                backgroundColor: themes.dark.buttonColor,
                color: themes.dark.buttonTextColor,
                marginRight: "10px",
              }}
            >
              Dark
            </Button>
            <Button
              onClick={() => toggleTheme("blue")}
              style={{
                backgroundColor: themes.blue.buttonColor,
                color: themes.blue.buttonTextColor,
                marginRight: "10px",
              }}
            >
              Blue
            </Button>
            <Button
              onClick={() => toggleTheme("purple")}
              style={{
                backgroundColor: themes.purple.buttonColor,
                color: themes.purple.buttonTextColor,
                marginRight: "10px",
              }}
            >
              Purple
            </Button>
            <Button
              onClick={() => toggleTheme("lightGreen")}
              style={{
                backgroundColor: themes.lightGreen.buttonColor,
                color: themes.lightGreen.buttonTextColor,
              }}
            >
              Light Green
            </Button>
          </div>
        </Navbar.Collapse>
      </Navbar>

      {/* Front Page */}
      <div
        id="home"
        style={{
          padding: "100px 20px",
          textAlign: "center",
          backgroundColor: currentTheme.backgroundColor,
          color: currentTheme.textColor,
        }}
      >
        <h1>Welcome to Dataset Analyzer</h1>
        <p>Analyze and visualize your datasets with ease.</p>
        <Button
          href="#upload"
          style={{
            backgroundColor: currentTheme.buttonColor,
            color: currentTheme.buttonTextColor,
          }}
        >
          Get Started
        </Button>
      </div>

      {/* Features Section */}
      <div
        id="features"
        style={{
          padding: "50px 20px",
          backgroundColor: currentTheme.backgroundColor,
          color: currentTheme.textColor,
        }}
      >
        <h2>Features</h2>
        <Row>
          <Col md={4}>
            <h3>📊 Data Visualization</h3>
            <p>Visualize your data with interactive charts.</p>
          </Col>
          <Col md={4}>
            <h3>🔮 Predictions</h3>
            <p>Make predictions using machine learning models.</p>
          </Col>
          <Col md={4}>
            <h3>🎨 Custom Themes</h3>
            <p>Choose from multiple attractive themes.</p>
          </Col>
        </Row>
      </div>

      {/* Upload Dataset Section */}
      <Container
        id="upload"
        fluid
        style={{
          padding: "50px 20px",
          backgroundColor: currentTheme.backgroundColor,
          color: currentTheme.textColor,
        }}
      >
        <Row className="mb-4">
          <Col md={8}>
            <Form.Group>
              <Form.Label>Select CSV File</Form.Label>
              <Form.Control
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                style={{
                  backgroundColor: currentTheme.backgroundColor,
                  color: currentTheme.textColor,
                }}
              />
            </Form.Group>
          </Col>
          <Col md={4} className="d-flex align-items-end">
            <Button
              onClick={handleUpload}
              className="w-100"
              style={{
                backgroundColor: currentTheme.buttonColor,
                color: currentTheme.buttonTextColor,
              }}
            >
              📤 Upload
            </Button>
          </Col>
        </Row>
        <div style={{textAlign:"center"}}>
        <Button
              className="mt-3"
              onClick={handleShowPredictionForm}
              style={{
                backgroundColor: currentTheme.buttonColor,
                color: currentTheme.buttonTextColor,
                marginBottom:20,
                width:200,
              }}
            >
              Predict
            </Button>
            </div>
        {showPredictionForm && (
          <Form className="mb-4">
            <h4>Select Target Column for Prediction</h4>
            <Form.Select
              onChange={handleTargetColumnSelect}
              style={{
                backgroundColor: currentTheme.backgroundColor,
                color: currentTheme.textColor,
              }}
            >
              <option value="">Select a column to predict</option>
              {selectedColumns.map((col, index) => (
                <option key={index} value={col}>
                  {col}
                </option>
              ))}
            </Form.Select>

            {targetColumn && (
              <>
                <h4 className="mt-3">Enter Input Values for Prediction</h4>
                {selectedColumns
                  .filter((col) => col !== targetColumn)
                  .map((col, index) => (
                    <Form.Group key={index} className="mb-2">
                      <Form.Label>{col}</Form.Label>
                      <Form.Control
                        type="text"
                        value={inputValues[col]}
                        onChange={(e) => handleInputChange(col, e.target.value)}
                        style={{
                          backgroundColor: currentTheme.backgroundColor,
                          color: currentTheme.textColor,
                        }}
                      />
                    </Form.Group>
                  ))}
                <Button
                  onClick={handlePrediction}
                  style={{
                    backgroundColor: currentTheme.buttonColor,
                    color: currentTheme.buttonTextColor,
                  }}
                >
                  Get Prediction
                </Button>
              </>
            )}
          </Form>
        )}

        {predictionResult && (
          <div className="mb-4">
            <h3>Prediction Result</h3>
            <pre>{JSON.stringify(predictionResult, null, 2)}</pre>
          </div>
        )}
        {dataset && (
          <div className="mb-4">
            
            <h3>Dataset Preview</h3>
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              <Table striped bordered hover>
                <thead style={{ backgroundColor: currentTheme.tableHeaderColor }}>
                  <tr>
                    {dataset.columns.map((col, index) => (
                      <th key={index}>
                        <Form.Check
                          type="checkbox"
                          label={col}
                          onChange={() => handleColumnSelect(col)}
                          style={{ color: currentTheme.textColor }}
                        />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataset.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <td key={colIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            
          </div>
        )}

        

        {dataset && selectedColumns.length >= 1 && (
          <DataVisualization
            data={dataset}
            selectedColumns={selectedColumns}
            theme={theme}
          />
        )}
      </Container>
    </div>
  );
}

export default App;