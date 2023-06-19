/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable no-plusplus */
/* eslint-disable no-var */
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import PopulateRealtimeInflux from "connection/data-reciever/general-level/get/populateRealtime";
import sensorDataAxiosInstance from "connection/helpers/base-urls/sensor-data/sensor-data-axius";

import React, { useState, useEffect } from "react";
// import "./styles.css";
import Plot from "react-plotly.js";
import Plotly from "plotly.js-dist";

const count = 30;

const startingNumbers = Array(count)
  .fill(1)
  .map((_, i) => i);

function Test() {
  const [data, setData] = React.useState({
    x: startingNumbers,
    y: startingNumbers,
  });

  const [data2, setData2] = useState([{ y: [Math.random()], type: "line" }]);
  const [data3, setData3] = useState(4.6857);
  var limit = 0;

  useEffect(() => {
    Plotly.newPlot("chart", data2);
  }, []);

  const fetchData = async () => {
    const response = await sensorDataAxiosInstance.get("api/sensordata/listInflux/");
    setData3(response.data.value);
  };

  setInterval(() => {
    fetchData();
    Plotly.extendTraces("chart", { y: [[data3]] }, [0]);
    limit += 1;
    if (limit > 500) {
      Plotly.relayout("chart", {
        xaxis: {
          range: [limit - 500, limit],
        },
      });
    }
  }, 2000);

  React.useEffect(() => {
    const fetchData3 = async () => {
      const result = await sensorDataAxiosInstance.get("api/sensordata/listInflux/");
      setData((prev) => {
        return {
          x: prev.x,
          y: [...prev.y.slice(1), result.data.value],
        };
      });
    };
    fetchData3();
    const intervalId = setInterval(fetchData3, 500);
    return () => clearInterval(intervalId);
  }, []);

  const [data4, setData4] = useState([]);

  useEffect(() => {
    const fetchData2 = async () => {
      const result = await sensorDataAxiosInstance.get("api/sensordata/listInflux/");
      setData4(result.data);
    };
    fetchData2();
    console.log(data4);
    const intervalId = setInterval(fetchData2, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const plotData = [
    {
      x: [Date.now()],
      y: [data4.value],
      type: "scatter",
      mode: "lines+points",
      marker: { color: "red" },
    },
  ];

  const layout = {
    title: "Sensor Data",
    xaxis: {
      title: "Time",
    },
    yaxis: {
      title: "Value",
    },
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={6}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={15}>
              <MDBox mb={3}>
                <div className="navbar">
                  <span>Real-Time Chart Data From InfluxDB (Measurement: Lecturas)</span>
                </div>
                <div className="wrapper">
                  <div id="chart" />
                </div>
                <div className="wrapper">
                  <Plot
                    data={[data]}
                    layout={{
                      title: "Real-time Data App",
                      xaxis: { range: [0, count] },
                      yaxis: { range: [-5, count] },
                    }}
                  />
                </div>
                <div>
                  <Plot data={plotData} layout={layout} />
                </div>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Test;
