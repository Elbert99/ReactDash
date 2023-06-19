/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable no-plusplus */
/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import PopulateRealtimeInflux from "connection/data-reciever/general-level/get/populateRealtime";
import sensorDataAxiosInstance from "connection/helpers/base-urls/sensor-data/sensor-data-axius";
import Populate from "connection/data-reciever/general-level/get/populateData2";

import React, { useState, useEffect } from "react";
// import "./styles.css";

import {Line} from 'react-chartjs-2';

function TestChartJS() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://172.16.154.8:8080/api/sensordata/listInflux/');
        const newData = await response.json();

        // Aquí transformamos los datos obtenidos en el formato esperado por la gráfica
        const chartData = {
          labels: newData.map(data => data._field),
          datasets: [
            {
              label: 'Sensor Data',
              data: newData.map(data => data._value),
              fill: true,
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color del área sombreada
              borderColor: 'rgba(75, 192, 192, 1)', // Color de la línea
              tension: 0.1,
            }
          ]
        };

        setChartData(chartData);
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    fetchData();

    // Limpiamos el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={6}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={15}>
              <MDBox mb={3}>
                <div>
                  <Line data={chartData} options={{ maintainAspectRatio: false, responsive: true }} />
                </div>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default TestChartJS;
