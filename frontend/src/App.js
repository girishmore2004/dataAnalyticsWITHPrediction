import React, { useState } from "react";
import axios from "axios";
import { Container, Button, Form, Table, Row, Col, Navbar, Nav, Card, Badge } from "react-bootstrap";
import DataVisualization from "./components/Visualization";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [dataset, setDataset] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [predictionResult, setPredictionResult] = useState(null);
  const [showPredictionForm, setShowPredictionForm] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [targetColumn, setTargetColumn] = useState("");
  const [theme, setTheme] = useState("light");

  const themes = {
    light: {
      backgroundColor: "#f8f9fa",
      textColor: "#2c3e50",
      buttonColor: "#667eea",
      buttonTextColor: "#ffffff",
      tableHeaderColor: "#667eea",
      navbarColor: "#ffffff",
      cardBackground: "#ffffff",
      accentColor: "#764ba2",
      gradientFrom: "#667eea",
      gradientTo: "#764ba2",
    },
    dark: {
      backgroundColor: "#0f0f23",
      textColor: "#e0e0e0",
      buttonColor: "#667eea",
      buttonTextColor: "#ffffff",
      tableHeaderColor: "#1a1a3e",
      navbarColor: "#1a1a3e",
      cardBackground: "#1a1a3e",
      accentColor: "#764ba2",
      gradientFrom: "#667eea",
      gradientTo: "#764ba2",
    },
    blue: {
      backgroundColor: "#e8f4f8",
      textColor: "#1e3a5f",
      buttonColor: "#2196F3",
      buttonTextColor: "#ffffff",
      tableHeaderColor: "#42a5f5",
      navbarColor: "#ffffff",
      cardBackground: "#ffffff",
      accentColor: "#1976d2",
      gradientFrom: "#2196F3",
      gradientTo: "#00bcd4",
    },
    purple: {
      backgroundColor: "#f5f0f8",
      textColor: "#4a148c",
      buttonColor: "#9C27B0",
      buttonTextColor: "#ffffff",
      tableHeaderColor: "#ba68c8",
      navbarColor: "#ffffff",
      cardBackground: "#ffffff",
      accentColor: "#7b1fa2",
      gradientFrom: "#9C27B0",
      gradientTo: "#e91e63",
    },
    lightGreen: {
      backgroundColor: "#f1f8f4",
      textColor: "#1b5e20",
      buttonColor: "#4CAF50",
      buttonTextColor: "#fff",
      tableHeaderColor: "#66bb6a",
      navbarColor: "#ffffff",
      cardBackground: "#ffffff",
      accentColor: "#388e3c",
      gradientFrom: "#4CAF50",
      gradientTo: "#8bc34a",
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
        transition: "all 0.3s ease",
      }}
    >
      {/* Enhanced Navbar */}
      <Navbar
        expand="lg"
        style={{
          backgroundColor: currentTheme.navbarColor,
          padding: "15px 30px",
          boxShadow: "0 2px 20px rgba(0,0,0,0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Navbar.Brand
          href="#home"
          style={{
            color: currentTheme.textColor,
            fontSize: "1.5rem",
            fontWeight: "700",
            letterSpacing: "-0.5px",
          }}
        >
          📊 Dataset Analyzer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              href="#home"
              style={{
                color: currentTheme.textColor,
                fontWeight: "500",
                margin: "0 10px",
                transition: "all 0.3s ease",
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#features"
              style={{
                color: currentTheme.textColor,
                fontWeight: "500",
                margin: "0 10px",
                transition: "all 0.3s ease",
              }}
            >
              Features
            </Nav.Link>
            <Nav.Link
              href="#upload"
              style={{
                color: currentTheme.textColor,
                fontWeight: "500",
                margin: "0 10px",
                transition: "all 0.3s ease",
              }}
            >
              Upload Dataset
            </Nav.Link>
          </Nav>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {Object.keys(themes).map((themeName) => (
              <Button
                key={themeName}
                onClick={() => toggleTheme(themeName)}
                style={{
                  backgroundColor: themes[themeName].buttonColor,
                  color: themes[themeName].buttonTextColor,
                  border: "none",
                  borderRadius: "20px",
                  padding: "6px 16px",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  textTransform: "capitalize",
                  transition: "all 0.3s ease",
                  transform: theme === themeName ? "scale(1.05)" : "scale(1)",
                  boxShadow: theme === themeName ? "0 4px 15px rgba(0,0,0,0.2)" : "none",
                }}
              >
                {themeName === "lightGreen" ? "Green" : themeName}
              </Button>
            ))}
          </div>
        </Navbar.Collapse>
      </Navbar>

      {/* Hero Section */}
      <div
        id="home"
        style={{
          padding: "120px 20px 100px",
          textAlign: "center",
          background: `linear-gradient(135deg, ${currentTheme.gradientFrom} 0%, ${currentTheme.gradientTo} 100%)`,
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "800",
              marginBottom: "20px",
              letterSpacing: "-1px",
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            Welcome to Dataset Analyzer
          </h1>
          <p style={{ fontSize: "1.3rem", marginBottom: "30px", opacity: 0.95 }}>
            Analyze and visualize your datasets with ease and intelligence
          </p>
          <Button
            href="#upload"
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "#ffffff",
              border: "2px solid #ffffff",
              borderRadius: "30px",
              padding: "12px 40px",
              fontSize: "1.1rem",
              fontWeight: "600",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#ffffff";
              e.target.style.color = currentTheme.buttonColor;
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "rgba(255,255,255,0.2)";
              e.target.style.color = "#ffffff";
            }}
          >
            Get Started →
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div
        id="features"
        style={{
          padding: "80px 20px",
          backgroundColor: currentTheme.backgroundColor,
          color: currentTheme.textColor,
        }}
      >
        <Container>
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              fontWeight: "700",
              marginBottom: "60px",
              color: currentTheme.textColor,
            }}
          >
            Powerful Features
          </h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card
                style={{
                  backgroundColor: currentTheme.cardBackground,
                  border: "none",
                  borderRadius: "20px",
                  padding: "30px",
                  height: "100%",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 15px 50px rgba(0,0,0,0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.08)";
                }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    marginBottom: "20px",
                    textAlign: "center",
                  }}
                >
                  📊
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    marginBottom: "15px",
                    color: currentTheme.textColor,
                    textAlign: "center",
                  }}
                >
                  Data Visualization
                </h3>
                <p style={{ textAlign: "center", color: currentTheme.textColor, opacity: 0.8 }}>
                  Visualize your data with interactive and beautiful charts that bring insights to life
                </p>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card
                style={{
                  backgroundColor: currentTheme.cardBackground,
                  border: "none",
                  borderRadius: "20px",
                  padding: "30px",
                  height: "100%",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 15px 50px rgba(0,0,0,0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.08)";
                }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    marginBottom: "20px",
                    textAlign: "center",
                  }}
                >
                  🔮
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    marginBottom: "15px",
                    color: currentTheme.textColor,
                    textAlign: "center",
                  }}
                >
                  AI Predictions
                </h3>
                <p style={{ textAlign: "center", color: currentTheme.textColor, opacity: 0.8 }}>
                  Make accurate predictions using advanced machine learning models
                </p>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card
                style={{
                  backgroundColor: currentTheme.cardBackground,
                  border: "none",
                  borderRadius: "20px",
                  padding: "30px",
                  height: "100%",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 15px 50px rgba(0,0,0,0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.08)";
                }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    marginBottom: "20px",
                    textAlign: "center",
                  }}
                >
                  🎨
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    marginBottom: "15px",
                    color: currentTheme.textColor,
                    textAlign: "center",
                  }}
                >
                  Custom Themes
                </h3>
                <p style={{ textAlign: "center", color: currentTheme.textColor, opacity: 0.8 }}>
                  Choose from multiple attractive themes to match your style
                </p>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Upload Dataset Section */}
      <Container
        id="upload"
        fluid
        style={{
          padding: "80px 40px",
          backgroundColor: currentTheme.backgroundColor,
          color: currentTheme.textColor,
        }}
      >
        <Card
          style={{
            backgroundColor: currentTheme.cardBackground,
            border: "none",
            borderRadius: "20px",
            padding: "40px",
            marginBottom: "30px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          }}
        >
          <h3
            style={{
              fontSize: "1.8rem",
              fontWeight: "700",
              marginBottom: "30px",
              color: currentTheme.textColor,
            }}
          >
            Upload Your Dataset
          </h3>
          <Row className="mb-4">
            <Col md={8}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "600", marginBottom: "10px" }}>
                  Select CSV File
                </Form.Label>
                <Form.Control
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  style={{
                    backgroundColor: currentTheme.backgroundColor,
                    color: currentTheme.textColor,
                    border: `2px dashed ${currentTheme.buttonColor}`,
                    borderRadius: "12px",
                    padding: "15px",
                    transition: "all 0.3s ease",
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="d-flex align-items-end">
              <Button
                onClick={handleUpload}
                className="w-100"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.gradientFrom} 0%, ${currentTheme.gradientTo} 100%)`,
                  color: currentTheme.buttonTextColor,
                  border: "none",
                  borderRadius: "12px",
                  padding: "15px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
              >
                📤 Upload Dataset
              </Button>
            </Col>
          </Row>
        </Card>

        {selectedColumns.length > 0 && (
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <Badge
              bg="secondary"
              style={{
                fontSize: "1rem",
                padding: "10px 20px",
                borderRadius: "20px",
                marginRight: "15px",
              }}
            >
              {selectedColumns.length} columns selected
            </Badge>
            <Button
              onClick={handleShowPredictionForm}
              style={{
                background: `linear-gradient(135deg, ${currentTheme.gradientFrom} 0%, ${currentTheme.gradientTo} 100%)`,
                color: currentTheme.buttonTextColor,
                border: "none",
                borderRadius: "25px",
                padding: "12px 35px",
                fontSize: "1rem",
                fontWeight: "600",
                transition: "all 0.3s ease",
              }}
            >
              🔮 Make Prediction
            </Button>
          </div>
        )}

        {showPredictionForm && (
          <Card
            style={{
              backgroundColor: currentTheme.cardBackground,
              border: "none",
              borderRadius: "20px",
              padding: "40px",
              marginBottom: "30px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
            }}
          >
            <h4
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                marginBottom: "25px",
                color: currentTheme.textColor,
              }}
            >
              Configure Prediction
            </h4>
            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: "600", marginBottom: "10px" }}>
                Select Target Column
              </Form.Label>
              <Form.Select
                onChange={handleTargetColumnSelect}
                style={{
                  backgroundColor: currentTheme.backgroundColor,
                  color: currentTheme.textColor,
                  border: `2px solid ${currentTheme.buttonColor}`,
                  borderRadius: "12px",
                  padding: "12px",
                  fontSize: "1rem",
                }}
              >
                <option value="">Choose a column to predict</option>
                {selectedColumns.map((col, index) => (
                  <option key={index} value={col}>
                    {col}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {targetColumn && (
              <>
                <h5
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    marginTop: "30px",
                    marginBottom: "20px",
                    color: currentTheme.textColor,
                  }}
                >
                  Enter Input Values
                </h5>
                <Row>
                  {selectedColumns
                    .filter((col) => col !== targetColumn)
                    .map((col, index) => (
                      <Col md={6} key={index} className="mb-3">
                        <Form.Group>
                          <Form.Label style={{ fontWeight: "600", fontSize: "0.9rem" }}>
                            {col}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={inputValues[col]}
                            onChange={(e) => handleInputChange(col, e.target.value)}
                            style={{
                              backgroundColor: currentTheme.backgroundColor,
                              color: currentTheme.textColor,
                              border: `1px solid ${currentTheme.buttonColor}`,
                              borderRadius: "10px",
                              padding: "12px",
                            }}
                            placeholder={`Enter ${col}`}
                          />
                        </Form.Group>
                      </Col>
                    ))}
                </Row>
                <div style={{ textAlign: "center", marginTop: "30px" }}>
                  <Button
                    onClick={handlePrediction}
                    style={{
                      background: `linear-gradient(135deg, ${currentTheme.gradientFrom} 0%, ${currentTheme.gradientTo} 100%)`,
                      color: currentTheme.buttonTextColor,
                      border: "none",
                      borderRadius: "25px",
                      padding: "12px 40px",
                      fontSize: "1.1rem",
                      fontWeight: "600",
                    }}
                  >
                    Get Prediction →
                  </Button>
                </div>
              </>
            )}
          </Card>
        )}

        {predictionResult && (
          <Card
            style={{
              backgroundColor: currentTheme.cardBackground,
              border: "none",
              borderRadius: "20px",
              padding: "40px",
              marginBottom: "30px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
            }}
          >
            <h3
              style={{
                fontSize: "1.8rem",
                fontWeight: "700",
                marginBottom: "20px",
                color: currentTheme.buttonColor,
              }}
            >
              🎯 Prediction Result
            </h3>
            <pre
              style={{
                backgroundColor: currentTheme.backgroundColor,
                color: currentTheme.textColor,
                padding: "25px",
                borderRadius: "12px",
                fontSize: "1rem",
                border: `1px solid ${currentTheme.buttonColor}`,
              }}
            >
              {JSON.stringify(predictionResult, null, 2)}
            </pre>
          </Card>
        )}

        {dataset && (
          <Card
            style={{
              backgroundColor: currentTheme.cardBackground,
              border: "none",
              borderRadius: "20px",
              padding: "40px",
              marginBottom: "30px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
            }}
          >
            <h3
              style={{
                fontSize: "1.8rem",
                fontWeight: "700",
                marginBottom: "25px",
                color: currentTheme.textColor,
              }}
            >
              Dataset Preview
            </h3>
            <div
              style={{
                maxHeight: "500px",
                overflowY: "auto",
                borderRadius: "12px",
                border: `1px solid ${currentTheme.buttonColor}`,
              }}
            >
              <Table striped hover style={{ marginBottom: 0 }}>
                <thead
                  style={{
                    backgroundColor: currentTheme.tableHeaderColor,
                    color: "#ffffff",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                  }}
                >
                  <tr>
                    {dataset.columns.map((col, index) => (
                      <th
                        key={index}
                        style={{
                          padding: "15px",
                          fontWeight: "600",
                          fontSize: "0.95rem",
                        }}
                      >
                        <Form.Check
                          type="checkbox"
                          label={col}
                          onChange={() => handleColumnSelect(col)}
                          checked={selectedColumns.includes(col)}
                          style={{ color: "#ffffff" }}
                        />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataset.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <td
                          key={colIndex}
                          style={{
                            padding: "12px 15px",
                            color: currentTheme.textColor,
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card>
        )}

        {dataset && selectedColumns.length >= 1 && (
          <div style={{ marginTop: "30px" }}>
            <DataVisualization
              data={dataset}
              selectedColumns={selectedColumns}
              theme={theme}
            />
          </div>
        )}
      </Container>

      {/* Footer */}
      <div
        style={{
          padding: "40px 20px",
          textAlign: "center",
          backgroundColor: currentTheme.navbarColor,
          color: currentTheme.textColor,
          borderTop: `1px solid ${currentTheme.buttonColor}`,
        }}
      >
        <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.8 }}>
          © 2024 Dataset Analyzer. Powered by AI and Data Science.
        </p>
      </div>
    </div>
  );
}

export default App;