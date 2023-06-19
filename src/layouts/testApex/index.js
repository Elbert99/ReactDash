/* eslint-disable arrow-body-style */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
// @mui material components
import Grid from "@mui/material/Grid";
// import Divider from "@mui/material/Divider";
// import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Chart from "react-apexcharts";

function TestApex() {
    // const startTime = Date.now() - 60000; // Hace 60 segundos
    // const endTime = Date.now(); // Ahora
    const [options, setOptions] = useState({
        series: [
          {
            data: [],
          },
        ],
        chart: {
          id: "realtime",
          height: 350,
          type: "line",
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000,
            },
          },
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Dynamic Updating Chart",
          align: "left",
        },
        markers: {
          size: 0,
        },
        xaxis: {
          type: "datetime",
          range: 5000,
        },
        yaxis: {
          max: 100,
        },
        legend: {
          show: false,
        },
      });
    
      const [data, setData] = useState([]);
    
      useEffect(() => {
        const interval = setInterval(() => {
          const newData = Math.floor(Math.random() * 100);
          setData((data) => [...data, newData]);
        }, 3000);
    
        return () => clearInterval(interval);
      }, []);
    
      useEffect(() => {
        setOptions((options) => ({
          ...options,
          series: [
            {
              data: data.map((value, index) => [Date.now() - (data.length - index) * 1000, value]),
            },
          ],
        }));
      }, [data]);
      
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={6}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={15}>
              <MDBox mb={3}>
                <div id="chart">
                  <Chart options={options} series={options.series} type="line" height={350} />
                </div>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default TestApex;
