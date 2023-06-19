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

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";

import React, { useEffect, useState } from "react";

// react-router components
import { useParams } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import NavBarSensor from "examples/Navbars/NavBarSensor";
// import Footer from "examples/Footer";
import SensorInfoCard from "examples/Cards/InfoCards/SensorInfoCard";
// import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import Chart from "react-apexcharts";
// import ProfilesList from "examples/Lists/ProfilesList";
// import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/dashboard/sensor-id/components/Header";
// import PlatformSettings from "layouts/dashboard/sensor-id/components/PlatformSettings";

// Data
// import profilesListData from "layouts/dashboard/sensor-id/data/profilesListData";
// import PopulateDataSensor from "connection/data-reciever/sensor-id-level/get/PopulateDataSensor";
// import PopulateFromInflux from "connection/data-reciever/general-level/get/populateDataInflux";
import Projects from "layouts/dashboard/components/Projects";
import projectsTableData from "layouts/dashboard/sensor-id/data/projectsTableData";
// import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
// import Plot from "react-plotly.js";
// import Plotly from "plotly.js-dist";
// import sensorDataAxiosInstance from "connection/helpers/base-urls/sensor-data/sensor-data-axius";
// Images
// import homeDecor1 from "assets/images/home-decor-1.jpg";

function OverviewSensorID() {
  const { id, lastValue, descriptions, long, lat } = useParams();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  // const [gradLineChartData, setGradLineChartData] = useState({});

  // Charts Data by Id-Sensor

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

  // Effects
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
      <NavBarSensor />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <SensorInfoCard
                title="sensor information"
                description="RSP1A Sensor information by identificator"
                info={{
                  "Sensor id": id,
                  "Last value": lastValue,
                  location: descriptions,
                  latitude: long,
                  longitude: lat,
                }}
                action={{ route: "", tooltip: "Edit Sensor" }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            History information by identification
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Row sensor information in real-time
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={15}>
              <Projects />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Sensor Information History
                  </MDTypography>
                </MDBox>
                <Grid item xs={12} md={6} lg={15}>
                  <MDBox mb={3}>
                    <div className="navbar">
                      <span>Real-Time Chart Data From InfluxDB (Measurement: Lecturas)</span>
                    </div>
                    <div className="wrapper">
                      <div id="chart" />
                    </div>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={15}>
                  <MDBox mb={3}>
                    <div>
                      <Chart
                        options={options}
                        series={series}
                        type="area"
                        width={1100}
                        height={400}
                      />
                    </div>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={15}>
                  <MDBox mb={3}>
                    <div>
                      <iframe  title="Grafana Panel" src="http://localhost:3000/d-solo/a5ccc1eb-e2bb-4e38-b4eb-25875342be65/test-connection-influxdb?orgId=1&refresh=5s&from=now-5m&theme=light&panelId=1" width="1100" height="400" frameBorder="0" />
                    </div>
                  </MDBox>
                </Grid>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns: pColumns, rows: pRows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </Header>
    </DashboardLayout>
  );
}

export default OverviewSensorID;
