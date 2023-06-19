/* eslint-disable arrow-body-style */
/* eslint-disable arrow-body-style */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import NavBarSensor from "examples/Navbars/NavBarSensor";
import Chart from "react-apexcharts";

function TestApexInflux() {
    const [options, setOptions] = useState({
        chart: {
          id: "basic-area"
        },
        xaxis: {
          categories: []
        }
      });
    
      const [series, setSeries] = useState([
        {
          name: "Valor",
          data: []
        }
      ]);
    
      useEffect(() => {
        const fetchData = async () => {
          const response = await fetch("http://172.16.154.8:8080/api/sensordata/listInflux/");
          const data = await response.json();
          const dateTimeOptions = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
          const categories = data.map(d => new Date(d._time).toLocaleString(undefined, dateTimeOptions));
          const values = data.map(d => d._value);
          setOptions(options => ({ ...options, xaxis: { categories } }));
          setSeries(series => [{ ...series[0], data: values }]);
        };
        fetchData();
        const interval = setInterval(fetchData, 3000);
        return () => clearInterval(interval);
      }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={6}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={15}>
              <MDBox mb={3}>
                <div>
                  <Chart options={options} series={series} type="area" width={1100} height={400} />
                </div>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default TestApexInflux;
