// import React, { useState, useEffect, useRef } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   RadialLinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar, Line, Pie, Scatter, Radar, Bubble } from "react-chartjs-2";
// import zoomPlugin from "chartjs-plugin-zoom";
// import annotationPlugin from "chartjs-plugin-annotation";
// import { Flow, SankeyController } from "chartjs-chart-sankey";

// // Register Chart.js components and plugins
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   RadialLinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
//   zoomPlugin,
//   annotationPlugin,
//   SankeyController,
//   Flow
// );

// const Visualization = ({ data, selectedColumns, theme }) => {
//   const [range, setRange] = useState({ min: 0, max: 0 });
//   const [aggregation, setAggregation] = useState("none");
//   const [filterValue, setFilterValue] = useState(0);
//   const [filterColumn, setFilterColumn] = useState("");
//   const [drillDownLevel, setDrillDownLevel] = useState(0);
//   const [crossFilter, setCrossFilter] = useState(null);
//   const [groupByColumn, setGroupByColumn] = useState("");
//   const [segmentedData, setSegmentedData] = useState([]);

//   // Refs to track chart instances
//   const barChartRef = useRef(null);
//   const lineChartRef = useRef(null);
//   const pieChartRef = useRef(null);
//   const scatterChartRef = useRef(null);
//   const radarChartRef = useRef(null);
//   const bubbleChartRef = useRef(null);

//   // Destroy charts on unmount
//   useEffect(() => {
//     return () => {
//       if (barChartRef.current) barChartRef.current.destroy();
//       if (lineChartRef.current) lineChartRef.current.destroy();
//       if (pieChartRef.current) pieChartRef.current.destroy();
//       if (scatterChartRef.current) scatterChartRef.current.destroy();
//       if (radarChartRef.current) radarChartRef.current.destroy();
//       if (bubbleChartRef.current) bubbleChartRef.current.destroy();
//     };
//   }, []);

//   // Filter and group data
//   useEffect(() => {
//     if (!selectedColumns.length || !data || !data.rows) return;

//     // Get the total number of rows
//     const totalRows = data.rows.length;

//     // Default range to show all rows if no range is set
//     const min = range.min || 0;
//     const max = range.max || totalRows;

//     // Filter rows based on the selected range
//     let filteredRows = data.rows.slice(min, max);

//     // Apply additional filtering based on column value
//     if (filterColumn && filterValue) {
//       const columnIndex = data.columns.indexOf(filterColumn);
//       filteredRows = filteredRows.filter(
//         (row) => Number(row[columnIndex]) > filterValue
//       );
//     }

//     // Group data dynamically
//     if (groupByColumn) {
//       const columnIndex = data.columns.indexOf(groupByColumn);
//       const groupedData = filteredRows.reduce((acc, row) => {
//         const key = row[columnIndex];
//         if (!acc[key]) acc[key] = [];
//         acc[key].push(row);
//         return acc;
//       }, {});
//       setSegmentedData(Object.values(groupedData));
//     } else {
//       setSegmentedData([filteredRows]);
//     }
//   }, [data, selectedColumns, range, filterColumn, filterValue, groupByColumn]);

//   if (!selectedColumns.length || !data || !data.rows) {
//     return <p>Please select columns to visualize the data.</p>;
//   }

//   // Extract labels and data for the charts
//   const rowLabels = segmentedData.flat().map((row) => row[0]);
//   const columnIndices = selectedColumns
//     .map((col) => data.columns.indexOf(col))
//     .filter((index) => index > 0);

//   // Apply aggregation to the dataset
//   const aggregatedData = segmentedData.flat().reduce((acc, row) => {
//     columnIndices.forEach((index, i) => {
//       const value = Number(row[index]) || 0;
//       if (!acc[i]) acc[i] = { sum: 0, count: 0, max: -Infinity, min: Infinity };
//       acc[i].sum += value;
//       acc[i].count += 1;
//       acc[i].max = Math.max(acc[i].max, value);
//       acc[i].min = Math.min(acc[i].min, value);
//     });
//     return acc;
//   }, []);

//   const chartData = {
//     labels: rowLabels,
//     datasets: selectedColumns
//       .filter((col) => col !== data.columns[0])
//       .map((col, index) => ({
//         label: col,
//         data: segmentedData.flat().map((row) => {
//           const value = Number(row[columnIndices[index]]) || 0;
//           if (aggregation === "none") return value;
//           if (aggregation === "sum") return aggregatedData[index].sum;
//           if (aggregation === "average") return aggregatedData[index].sum / aggregatedData[index].count;
//           if (aggregation === "max") return aggregatedData[index].max;
//           if (aggregation === "min") return aggregatedData[index].min;
//           return value;
//         }),
//         backgroundColor: `rgba(${index * 50}, 99, 132, 0.5)`,
//         borderColor: `rgba(${index * 50}, 99, 132, 1)`,
//         borderWidth: 1,
//       })),
//   };

//   // Scatter Plot and Bubble Chart Data
//   const scatterChartData = {
//     datasets: selectedColumns
//       .filter((col) => col !== data.columns[0])
//       .map((col, index) => ({
//         label: col,
//         data: segmentedData.flat().map((row) => ({
//           x: Number(row[columnIndices[index]]) || 0,
//           y: Number(row[columnIndices[(index + 1) % columnIndices.length]]) || 0,
//         })),
//         backgroundColor: `rgba(${index * 50}, 99, 132, 0.5)`,
//         borderColor: `rgba(${index * 50}, 99, 132, 1)`,
//         borderWidth: 1,
//       })),
//   };

//   const bubbleChartData = {
//     datasets: selectedColumns
//       .filter((col) => col !== data.columns[0])
//       .map((col, index) => ({
//         label: col,
//         data: segmentedData.flat().map((row) => ({
//           x: Number(row[columnIndices[index]]) || 0,
//           y: Number(row[columnIndices[(index + 1) % columnIndices.length]]) || 0,
//           r: Math.abs(Number(row[columnIndices[index]]) || 0) / 10,
//         })),
//         backgroundColor: `rgba(${index * 50}, 99, 132, 0.5)`,
//         borderColor: `rgba(${index * 50}, 99, 132, 1)`,
//         borderWidth: 1,
//       })),
//   };

//   // Handle range input changes
//   const handleRangeChange = (e) => {
//     const { name, value } = e.target;
//     setRange((prev) => ({
//       ...prev,
//       [name]: Math.max(0, Math.min(data.rows.length, Number(value))),
//     }));
//   };

//   // Handle aggregation change
//   const handleAggregationChange = (e) => {
//     setAggregation(e.target.value);
//   };

//   // Handle filter change
//   const handleFilterChange = (e) => {
//     setFilterValue(Number(e.target.value));
//   };

//   // Handle filter column change
//   const handleFilterColumnChange = (e) => {
//     setFilterColumn(e.target.value);
//   };

//   // Handle group by column change
//   const handleGroupByChange = (e) => {
//     setGroupByColumn(e.target.value);
//   };

//   // Handle drill-down
//   // const handleDrillDown = (level) => {
//   //   setDrillDownLevel(level);
//   // };

//   // Handle cross-filtering
//   const handleCrossFilter = (filter) => {
//     setCrossFilter(filter);
//   };

//   // Export chart as image
//   const handleExportImage = (chartId) => {
//     const chart = document.getElementById(chartId);
//     const image = chart.toDataURL("image/png");
//     const link = document.createElement("a");
//     link.href = image;
//     link.download = `${chartId}.png`;
//     link.click();
//   };

//   // Chart options with theme, zoom, and annotations
//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       tooltip: {
//         enabled: true,
//         mode: "index",
//         intersect: false,
//       },
//       legend: {
//         onClick: (e, legendItem, legend) => {
//           const index = legendItem.datasetIndex;
//           const chart = legend.chart;
//           chart.getDatasetMeta(index).hidden =
//             !chart.getDatasetMeta(index).hidden;
//           chart.update();
//         },
//       },
//       zoom: {
//         zoom: {
//           wheel: { enabled: true },
//           pinch: { enabled: true },
//           mode: "xy",
//         },
//         pan: {
//           enabled: true,
//           mode: "xy",
//         },
//       },
//     },
//     scales: {
//       x: {
//         ticks: {
//           color: theme === "light" ? "black" : theme === "dark" ? "white" : "#333",
//         },
//       },
//       y: {
//         ticks: {
//           color: theme === "light" ? "black" : theme === "dark" ? "white" : "#333",
//         },
//       },
//     },
//     animation: {
//       duration: 1000,
//       easing: "easeInOutQuad",
//     },
//   };

//   // Theme-based styles
//   const themeStyles = {
//     light: {
//       backgroundColor: "#ffffff",
//       textColor: "#000000",
//       buttonColor: "#4CAF50",
//       buttonTextColor: "#ffffff",
//     },
//     dark: {
//       backgroundColor: "#121212",
//       textColor: "#ffffff",
//       buttonColor: "#4CAF50",
//       buttonTextColor: "#ffffff",
//     },
//     blue: {
//       backgroundColor: "#e3f2fd",
//       textColor: "#000000",
//       buttonColor: "#2196F3",
//       buttonTextColor: "#ffffff",
//     },
//     purple: {
//       backgroundColor: "#f3e5f5",
//       textColor: "#000000",
//       buttonColor: "#9C27B0",
//       buttonTextColor: "#ffffff",
//     },
//     lightGreen: {
//       backgroundColor: "#E8F5E9",
//       textColor: "#000",
//       buttonColor: "#4CAF50",
//       buttonTextColor: "#fff",
//     },
//   };

//   const currentTheme = themeStyles[theme];

//   return (
//     <div
//       style={{
//         backgroundColor: currentTheme.backgroundColor,
//         color: currentTheme.textColor,
//         padding: "20px",
//         minHeight: "100vh",
//       }}
//     >
//       <h3>Data Visualization</h3>

//       {/* Range Input */}
//       <div style={{ marginBottom: "20px" }}>
//         <label>
//           Min Row:
//           <input
//             type="number"
//             name="min"
//             value={range.min}
//             onChange={handleRangeChange}
//             min={0}
//             max={data.rows.length - 1}
//             style={{
//               marginLeft: "10px",
//               marginRight: "20px",
//               padding: "5px",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//             }}
//           />
//         </label>
//         <label>
//           Max Row:
//           <input
//             type="number"
//             name="max"
//             value={range.max}
//             onChange={handleRangeChange}
//             min={1}
//             max={data.rows.length}
//             style={{
//               marginLeft: "10px",
//               padding: "5px",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//             }}
//           />
//         </label>
//         <p>
//           Showing rows {range.min + 1} to {range.max} of {data.rows.length}.
//         </p>
//       </div>

//       {/* Aggregation Dropdown */}
//       <div style={{ marginBottom: "20px" }}>
//         <label>
//           Aggregation:
//           <select
//             value={aggregation}
//             onChange={handleAggregationChange}
//             style={{
//               marginLeft: "10px",
//               padding: "5px",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//             }}
//           >
//             <option value="none">None</option>
//             <option value="sum">Sum</option>
//             <option value="average">Average</option>
//             <option value="max">Max</option>
//             <option value="min">Min</option>
//           </select>
//         </label>
//       </div>

//       {/* Filter Input */}
//       <div style={{ marginBottom: "20px" }}>
//         <label>
//           Filter Column:
//           <select
//             value={filterColumn}
//             onChange={handleFilterColumnChange}
//             style={{
//               marginLeft: "10px",
//               padding: "5px",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//             }}
//           >
//             <option value="">Select a column</option>
//             {selectedColumns.map((col, index) => (
//               <option key={index} value={col}>
//                 {col}
//               </option>
//             ))}
//           </select>
//         </label>
//         <label>
//           Filter Value:
//           <input
//             type="number"
//             value={filterValue}
//             onChange={handleFilterChange}
//             style={{
//               marginLeft: "10px",
//               padding: "5px",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//             }}
//           />
//         </label>
//       </div>

//       {/* Group By Dropdown */}
//       <div style={{ marginBottom: "20px" }}>
//         <label>
//           Group By:
//           <select
//             value={groupByColumn}
//             onChange={handleGroupByChange}
//             style={{
//               marginLeft: "10px",
//               padding: "5px",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//             }}
//           >
//             <option value="">Select a column</option>
//             {selectedColumns.map((col, index) => (
//               <option key={index} value={col}>
//                 {col}
//               </option>
//             ))}
//           </select>
//         </label>
//       </div>

//       {/* Drill-Down Buttons */}
//       {/* <div style={{ marginBottom: "20px" }}>
//         <button
//           onClick={() => handleDrillDown(1)}
//           style={{
//             backgroundColor: currentTheme.buttonColor,
//             color: currentTheme.buttonTextColor,
//             border: "none",
//             padding: "10px 20px",
//             borderRadius: "5px",
//             cursor: "pointer",
//             marginRight: "10px",
//           }}
//         >
//           Drill Down Level 1
//         </button>
//         <button
//           onClick={() => handleDrillDown(2)}
//           style={{
//             backgroundColor: currentTheme.buttonColor,
//             color: currentTheme.buttonTextColor,
//             border: "none",
//             padding: "10px 20px",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Drill Down Level 2
//         </button>
//       </div> */}

//       {/* Charts */}
//       <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
//         {/* Bar Chart */}
//         <div style={{ flex: "1 1 100%", maxWidth: "100%", padding: "10px" }}>
//           <h5>Bar Chart</h5>
//           <div style={{ width: "100%", height: "85%" }}>
//             <Bar
//               ref={barChartRef}
//               data={chartData}
//               options={chartOptions}
//               id="barChart"
//             />
//           </div>
//           <button
//             onClick={() => handleExportImage("barChart")}
//             style={{
//               backgroundColor: currentTheme.buttonColor,
//               color: currentTheme.buttonTextColor,
//               border: "none",
//               padding: "10px 20px",
//               borderRadius: "5px",
//               cursor: "pointer",
//               marginTop: "10px",
//             }}
//           >
//             Export as Image
//           </button>
//         </div>

//         {/* Line Chart */}
//         <div style={{ flex: "1 1 100%", maxWidth: "100%", padding: "10px" }}>
//           <h5>Line Chart</h5>
//           <div style={{ width: "100%", height: "85%" }}>
//             <Line
//               ref={lineChartRef}
//               data={chartData}
//               options={chartOptions}
//               id="lineChart"
//             />
//           </div>
//           <button
//             onClick={() => handleExportImage("lineChart")}
//             style={{
//               backgroundColor: currentTheme.buttonColor,
//               color: currentTheme.buttonTextColor,
//               border: "none",
//               padding: "10px 20px",
//               borderRadius: "5px",
//               cursor: "pointer",
//               marginTop: "10px",
//             }}
//           >
//             Export as Image
//           </button>
//         </div>

//         {/* Pie Chart */}
//         <div style={{ flex: "1 1 100%", maxWidth: "100%", padding: "10px" }}>
//           <h5>Pie Chart</h5>
//           <div style={{ width: "100%", height: "85%" }}>
//             <Pie
//               ref={pieChartRef}
//               data={chartData}
//               options={chartOptions}
//               id="pieChart"
//             />
//           </div>
//           <button
//             onClick={() => handleExportImage("pieChart")}
//             style={{
//               backgroundColor: currentTheme.buttonColor,
//               color: currentTheme.buttonTextColor,
//               border: "none",
//               padding: "10px 20px",
//               borderRadius: "5px",
//               cursor: "pointer",
//               marginTop: "10px",
//             }}
//           >
//             Export as Image
//           </button>
//         </div>

//         {/* Radar Chart */}
//         <div style={{ flex: "1 1 100%", maxWidth: "100%", padding: "10px" }}>
//           <h5>Radar Chart</h5>
//           <div style={{ width: "100%", height: "85%" }}>
//             <Radar
//               ref={radarChartRef}
//               data={chartData}
//               options={chartOptions}
//               id="radarChart"
//             />
//           </div>
//           <button
//             onClick={() => handleExportImage("radarChart")}
//             style={{
//               backgroundColor: currentTheme.buttonColor,
//               color: currentTheme.buttonTextColor,
//               border: "none",
//               padding: "10px 20px",
//               borderRadius: "5px",
//               cursor: "pointer",
//               marginTop: "10px",
//             }}
//           >
//             Export as Image
//           </button>
//         </div>

//         {/* Scatter Plot */}
//         <div style={{ flex: "1 1 100%", maxWidth: "100%", padding: "10px" }}>
//           <h5>Scatter Plot</h5>
//           <div style={{ width: "100%", height: "85%" }}>
//             <Scatter
//               ref={scatterChartRef}
//               data={scatterChartData}
//               options={chartOptions}
//               id="scatterPlot"
//             />
//           </div>
//           <button
//             onClick={() => handleExportImage("scatterPlot")}
//             style={{
//               backgroundColor: currentTheme.buttonColor,
//               color: currentTheme.buttonTextColor,
//               border: "none",
//               padding: "10px 20px",
//               borderRadius: "5px",
//               cursor: "pointer",
//               marginTop: "10px",
//             }}
//           >
//             Export as Image
//           </button>
//         </div>

//         {/* Bubble Chart */}
//         <div style={{ flex: "1 1 100%", maxWidth: "100%", padding: "10px" }}>
//           <h5>Bubble Chart</h5>
//           <div style={{ width: "100%", height: "85%" }}>
//             <Bubble
//               ref={bubbleChartRef}
//               data={bubbleChartData}
//               options={chartOptions}
//               id="bubbleChart"
//             />
//           </div>
//           <button
//             onClick={() => handleExportImage("bubbleChart")}
//             style={{
//               backgroundColor: currentTheme.buttonColor,
//               color: currentTheme.buttonTextColor,
//               border: "none",
//               padding: "10px 20px",
//               borderRadius: "5px",
//               cursor: "pointer",
//               marginTop: "10px",
//             }}
//           >
//             Export as Image
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Visualization;

import React, { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie, Scatter, Radar, Bubble } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import annotationPlugin from "chartjs-plugin-annotation";
import { Flow, SankeyController } from "chartjs-chart-sankey";

// Register Chart.js components and plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  annotationPlugin,
  SankeyController,
  Flow
);

const Visualization = ({ data, selectedColumns, theme }) => {
  const [range, setRange] = useState({ min: 0, max: 0 });
  const [aggregation, setAggregation] = useState("none");
  const [filterValue, setFilterValue] = useState(0);
  const [filterColumn, setFilterColumn] = useState("");
  const [drillDownLevel, setDrillDownLevel] = useState(0);
  const [crossFilter, setCrossFilter] = useState(null);
  const [groupByColumn, setGroupByColumn] = useState("");
  const [segmentedData, setSegmentedData] = useState([]);

  // Refs to track chart instances
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const scatterChartRef = useRef(null);
  const radarChartRef = useRef(null);
  const bubbleChartRef = useRef(null);

  // Destroy charts on unmount
  useEffect(() => {
    return () => {
      if (barChartRef.current) barChartRef.current.destroy();
      if (lineChartRef.current) lineChartRef.current.destroy();
      if (pieChartRef.current) pieChartRef.current.destroy();
      if (scatterChartRef.current) scatterChartRef.current.destroy();
      if (radarChartRef.current) radarChartRef.current.destroy();
      if (bubbleChartRef.current) bubbleChartRef.current.destroy();
    };
  }, []);

  // Filter and group data
  useEffect(() => {
    if (!selectedColumns.length || !data || !data.rows) return;

    const totalRows = data.rows.length;
    const min = range.min || 0;
    const max = range.max || totalRows;

    let filteredRows = data.rows.slice(min, max);

    if (filterColumn && filterValue) {
      const columnIndex = data.columns.indexOf(filterColumn);
      filteredRows = filteredRows.filter(
        (row) => Number(row[columnIndex]) > filterValue
      );
    }

    if (groupByColumn) {
      const columnIndex = data.columns.indexOf(groupByColumn);
      const groupedData = filteredRows.reduce((acc, row) => {
        const key = row[columnIndex];
        if (!acc[key]) acc[key] = [];
        acc[key].push(row);
        return acc;
      }, {});
      setSegmentedData(Object.values(groupedData));
    } else {
      setSegmentedData([filteredRows]);
    }
  }, [data, selectedColumns, range, filterColumn, filterValue, groupByColumn]);

  if (!selectedColumns.length || !data || !data.rows) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }}>
        <div style={{
          background: 'rgba(182, 5, 5, 0.95)',
          padding: '40px 60px',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '18px', color: '#4a5568', margin: 0 }}>
            📊 Please select columns to visualize the data
          </p>
        </div>
      </div>
    );
  }

  const rowLabels = segmentedData.flat().map((row) => row[0]);
  const columnIndices = selectedColumns
    .map((col) => data.columns.indexOf(col))
    .filter((index) => index > 0);

  const aggregatedData = segmentedData.flat().reduce((acc, row) => {
    columnIndices.forEach((index, i) => {
      const value = Number(row[index]) || 0;
      if (!acc[i]) acc[i] = { sum: 0, count: 0, max: -Infinity, min: Infinity };
      acc[i].sum += value;
      acc[i].count += 1;
      acc[i].max = Math.max(acc[i].max, value);
      acc[i].min = Math.min(acc[i].min, value);
    });
    return acc;
  }, []);

  const chartColors = [
    { bg: 'rgba(99, 102, 241, 0.6)', border: 'rgba(99, 102, 241, 1)' },
    { bg: 'rgba(236, 72, 153, 0.6)', border: 'rgba(236, 72, 153, 1)' },
    { bg: 'rgba(34, 197, 94, 0.6)', border: 'rgba(34, 197, 94, 1)' },
    { bg: 'rgba(251, 146, 60, 0.6)', border: 'rgba(251, 146, 60, 1)' },
    { bg: 'rgba(168, 85, 247, 0.6)', border: 'rgba(168, 85, 247, 1)' },
    { bg: 'rgba(14, 165, 233, 0.6)', border: 'rgba(14, 165, 233, 1)' }
  ];

  const chartData = {
    labels: rowLabels,
    datasets: selectedColumns
      .filter((col) => col !== data.columns[0])
      .map((col, index) => ({
        label: col,
        data: segmentedData.flat().map((row) => {
          const value = Number(row[columnIndices[index]]) || 0;
          if (aggregation === "none") return value;
          if (aggregation === "sum") return aggregatedData[index].sum;
          if (aggregation === "average") return aggregatedData[index].sum / aggregatedData[index].count;
          if (aggregation === "max") return aggregatedData[index].max;
          if (aggregation === "min") return aggregatedData[index].min;
          return value;
        }),
        backgroundColor: chartColors[index % chartColors.length].bg,
        borderColor: chartColors[index % chartColors.length].border,
        borderWidth: 2,
      })),
  };

  const scatterChartData = {
    datasets: selectedColumns
      .filter((col) => col !== data.columns[0])
      .map((col, index) => ({
        label: col,
        data: segmentedData.flat().map((row) => ({
          x: Number(row[columnIndices[index]]) || 0,
          y: Number(row[columnIndices[(index + 1) % columnIndices.length]]) || 0,
        })),
        backgroundColor: chartColors[index % chartColors.length].bg,
        borderColor: chartColors[index % chartColors.length].border,
        borderWidth: 2,
      })),
  };

  const bubbleChartData = {
    datasets: selectedColumns
      .filter((col) => col !== data.columns[0])
      .map((col, index) => ({
        label: col,
        data: segmentedData.flat().map((row) => ({
          x: Number(row[columnIndices[index]]) || 0,
          y: Number(row[columnIndices[(index + 1) % columnIndices.length]]) || 0,
          r: Math.abs(Number(row[columnIndices[index]]) || 0) / 10,
        })),
        backgroundColor: chartColors[index % chartColors.length].bg,
        borderColor: chartColors[index % chartColors.length].border,
        borderWidth: 2,
      })),
  };

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    setRange((prev) => ({
      ...prev,
      [name]: Math.max(0, Math.min(data.rows.length, Number(value))),
    }));
  };

  const handleAggregationChange = (e) => {
    setAggregation(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterValue(Number(e.target.value));
  };

  const handleFilterColumnChange = (e) => {
    setFilterColumn(e.target.value);
  };

  const handleGroupByChange = (e) => {
    setGroupByColumn(e.target.value);
  };

  const handleCrossFilter = (filter) => {
    setCrossFilter(filter);
  };

  const handleExportImage = (chartId) => {
    const chart = document.getElementById(chartId);
    const image = chart.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = `${chartId}.png`;
    link.click();
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 }
      },
      legend: {
        onClick: (e, legendItem, legend) => {
          const index = legendItem.datasetIndex;
          const chart = legend.chart;
          chart.getDatasetMeta(index).hidden =
            !chart.getDatasetMeta(index).hidden;
          chart.update();
        },
        labels: {
          font: { size: 13, weight: '500' },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      zoom: {
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: "xy",
        },
        pan: {
          enabled: true,
          mode: "xy",
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: theme === "dark" ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
        },
        ticks: {
          color: theme === "light" ? "#4a5568" : theme === "dark" ? "#e2e8f0" : "#4a5568",
          font: { size: 12, weight: '500' }
        },
      },
      y: {
        grid: {
          color: theme === "dark" ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
        },
        ticks: {
          color: theme === "light" ? "#4a5568" : theme === "dark" ? "#e2e8f0" : "#4a5568",
          font: { size: 12, weight: '500' }
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuad",
    },
  };

  const themeStyles = {
    light: {
      backgroundColor: "#f8fafc",
      cardBackground: "#ffffff",
      textColor: "#1e293b",
      secondaryText: "#64748b",
      borderColor: "#e2e8f0",
      buttonColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      buttonTextColor: "#ffffff",
      inputBackground: "#ffffff",
      inputBorder: "#cbd5e1",
      accentColor: "#667eea"
    },
    dark: {
      backgroundColor: "#0f172a",
      cardBackground: "#1e293b",
      textColor: "#f1f5f9",
      secondaryText: "#94a3b8",
      borderColor: "#334155",
      buttonColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      buttonTextColor: "#ffffff",
      inputBackground: "#334155",
      inputBorder: "#475569",
      accentColor: "#818cf8"
    },
    blue: {
      backgroundColor: "#eff6ff",
      cardBackground: "#ffffff",
      textColor: "#1e3a8a",
      secondaryText: "#3b82f6",
      borderColor: "#dbeafe",
      buttonColor: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      buttonTextColor: "#ffffff",
      inputBackground: "#ffffff",
      inputBorder: "#bfdbfe",
      accentColor: "#3b82f6"
    },
    purple: {
      backgroundColor: "#faf5ff",
      cardBackground: "#ffffff",
      textColor: "#581c87",
      secondaryText: "#a855f7",
      borderColor: "#e9d5ff",
      buttonColor: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
      buttonTextColor: "#ffffff",
      inputBackground: "#ffffff",
      inputBorder: "#d8b4fe",
      accentColor: "#a855f7"
    },
    lightGreen: {
      backgroundColor: "#f0fdf4",
      cardBackground: "#ffffff",
      textColor: "#14532d",
      secondaryText: "#22c55e",
      borderColor: "#dcfce7",
      buttonColor: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
      buttonTextColor: "#ffffff",
      inputBackground: "#ffffff",
      inputBorder: "#bbf7d0",
      accentColor: "#22c55e"
    },
  };

  const currentTheme = themeStyles[theme];

  const inputStyle = {
    padding: "10px 16px",
    borderRadius: "10px",
    border: `2px solid ${currentTheme.inputBorder}`,
    backgroundColor: currentTheme.inputBackground,
    color: currentTheme.textColor,
    fontSize: "14px",
    fontWeight: "500",
    outline: "none",
    transition: "all 0.3s ease",
    fontFamily: "'Inter', sans-serif"
  };

  const labelStyle = {
    fontSize: "14px",
    fontWeight: "600",
    color: currentTheme.secondaryText,
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  };

  const buttonStyle = {
    background: currentTheme.buttonColor,
    color: currentTheme.buttonTextColor,
    border: "none",
    padding: "12px 24px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    fontFamily: "'Inter', sans-serif"
  };

  return (
    <div
      style={{
        backgroundColor: currentTheme.backgroundColor,
        color: currentTheme.textColor,
        padding: "32px",
        minHeight: "100vh",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }}
    >
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        <h1 style={{
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "12px",
          background: currentTheme.buttonColor,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          📊 Data Visualization Dashboard
        </h1>
        <p style={{
          color: currentTheme.secondaryText,
          fontSize: "16px",
          marginBottom: "32px"
        }}>
          Explore and analyze your data with interactive charts
        </p>

        <div style={{
          backgroundColor: currentTheme.cardBackground,
          padding: "28px",
          borderRadius: "16px",
          marginBottom: "32px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          border: `1px solid ${currentTheme.borderColor}`
        }}>
          <h3 style={{
            fontSize: "20px",
            fontWeight: "600",
            marginBottom: "24px",
            color: currentTheme.textColor
          }}>
            ⚙️ Controls
          </h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "24px"
          }}>
            <div>
              <label style={labelStyle}>
                📍 Min Row
              </label>
              <input
                type="number"
                name="min"
                value={range.min}
                onChange={handleRangeChange}
                min={0}
                max={data.rows.length - 1}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>
                📍 Max Row
              </label>
              <input
                type="number"
                name="max"
                value={range.max}
                onChange={handleRangeChange}
                min={1}
                max={data.rows.length}
                style={inputStyle}
              />
            </div>
          </div>
          <p style={{
            fontSize: "14px",
            color: currentTheme.secondaryText,
            marginBottom: "24px",
            padding: "12px",
            backgroundColor: currentTheme.backgroundColor,
            borderRadius: "8px",
            border: `1px solid ${currentTheme.borderColor}`
          }}>
            Showing rows <strong>{range.min + 1}</strong> to <strong>{range.max}</strong> of <strong>{data.rows.length}</strong>
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px"
          }}>
            <div>
              <label style={labelStyle}>
                📊 Aggregation
              </label>
              <select
                value={aggregation}
                onChange={handleAggregationChange}
                style={inputStyle}
              >
                <option value="none">None</option>
                <option value="sum">Sum</option>
                <option value="average">Average</option>
                <option value="max">Max</option>
                <option value="min">Min</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>
                🔍 Filter Column
              </label>
              <select
                value={filterColumn}
                onChange={handleFilterColumnChange}
                style={inputStyle}
              >
                <option value="">Select a column</option>
                {selectedColumns.map((col, index) => (
                  <option key={index} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>
                🎯 Filter Value
              </label>
              <input
                type="number"
                value={filterValue}
                onChange={handleFilterChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>
                📑 Group By
              </label>
              <select
                value={groupByColumn}
                onChange={handleGroupByChange}
                style={inputStyle}
              >
                <option value="">Select a column</option>
                {selectedColumns.map((col, index) => (
                  <option key={index} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "24px"
        }}>
          <div style={{
            backgroundColor: currentTheme.cardBackground,
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            border: `1px solid ${currentTheme.borderColor}`
          }}>
            <h4 style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "20px",
              color: currentTheme.textColor
            }}>
              📊 Bar Chart
            </h4>
            <div style={{ width: "100%", height: "350px", marginBottom: "16px" }}>
              <Bar
                ref={barChartRef}
                data={chartData}
                options={chartOptions}
                id="barChart"
              />
            </div>
            <button
              onClick={() => handleExportImage("barChart")}
              style={buttonStyle}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              💾 Export as Image
            </button>
          </div>

          <div style={{
            backgroundColor: currentTheme.cardBackground,
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            border: `1px solid ${currentTheme.borderColor}`
          }}>
            <h4 style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "20px",
              color: currentTheme.textColor
            }}>
              📈 Line Chart
            </h4>
            <div style={{ width: "100%", height: "350px", marginBottom: "16px" }}>
              <Line
                ref={lineChartRef}
                data={chartData}
                options={chartOptions}
                id="lineChart"
              />
            </div>
            <button
              onClick={() => handleExportImage("lineChart")}
              style={buttonStyle}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              💾 Export as Image
            </button>
          </div>

          <div style={{
            backgroundColor: currentTheme.cardBackground,
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            border: `1px solid ${currentTheme.borderColor}`
          }}>
            <h4 style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "20px",
              color: currentTheme.textColor
            }}>
              🥧 Pie Chart
            </h4>
            <div style={{ width: "100%", height: "350px", marginBottom: "16px" }}>
              <Pie
                ref={pieChartRef}
                data={chartData}
                options={chartOptions}
                id="pieChart"
              />
            </div>
            <button
              onClick={() => handleExportImage("pieChart")}
              style={buttonStyle}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              💾 Export as Image
            </button>
          </div>

          <div style={{
            backgroundColor: currentTheme.cardBackground,
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            border: `1px solid ${currentTheme.borderColor}`
          }}>
            <h4 style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "20px",
              color: currentTheme.textColor
            }}>
              🎯 Radar Chart
            </h4>
            <div style={{ width: "100%", height: "350px", marginBottom: "16px" }}>
              <Radar
                ref={radarChartRef}
                data={chartData}
                options={chartOptions}
                id="radarChart"
              />
            </div>
            <button
              onClick={() => handleExportImage("radarChart")}
              style={buttonStyle}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              💾 Export as Image
            </button>
          </div>

          <div style={{
            backgroundColor: currentTheme.cardBackground,
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            border: `1px solid ${currentTheme.borderColor}`
          }}>
            <h4 style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "20px",
              color: currentTheme.textColor
            }}>
              ⚡ Scatter Plot
            </h4>
            <div style={{ width: "100%", height: "350px", marginBottom: "16px" }}>
              <Scatter
                ref={scatterChartRef}
                data={scatterChartData}
                options={chartOptions}
                id="scatterPlot"
              />
            </div>
            <button
              onClick={() => handleExportImage("scatterPlot")}
              style={buttonStyle}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              💾 Export as Image
            </button>
          </div>

          <div style={{
            backgroundColor: currentTheme.cardBackground,
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            border: `1px solid ${currentTheme.borderColor}`
          }}>
            <h4 style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "20px",
              color: currentTheme.textColor
            }}>
              🫧 Bubble Chart
            </h4>
            <div style={{ width: "100%", height: "350px", marginBottom: "16px" }}>
              <Bubble
                ref={bubbleChartRef}
                data={bubbleChartData}
                options={chartOptions}
                id="bubbleChart"
              />
            </div>
            <button
              onClick={() => handleExportImage("bubbleChart")}
              style={buttonStyle}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              💾 Export as Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualization;