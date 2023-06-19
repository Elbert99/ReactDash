/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
// @mui material components
import Grid from "@mui/material/Grid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// react-router components
import { useNavigate } from "react-router-dom";
// image wallpaper
// import BasicLayoutt from "layouts/dashboard/components/BasicLayputt";

import kisspnginternetofthingscomputericonshandhelddevicessignal from "assets/images/icons/marker/kisspng-internet-of-things-computer-icons-handheld-devices-signal.png";
// import LACETEL from "assets/images/icons/marker/LACETEL.jpg";
// Material Dashboard 2 React routes
// import routes from "routes";
// import App3 from "connection/data-reciever/general-level/get/populateData2";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
// import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
// import Plot from "react-plotlyjs";
// import Chart from "react-apexcharts";
// import ApexCharts from "apexcharts";
// import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
// import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
// import test from "layouts/dashboard/data/test";
// import gradientOsciloscopioLineChartData from "layouts/dashboard/data/gradientOsciloscopioLineChartData";
// import PopulateFromInflux from "connection/data-reciever/general-level/get/populateDataInflux";
import PopulateRealtimeInflux from "connection/data-reciever/general-level/get/populateRealtime";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
// import { Box } from "@mui/material";
// import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useRef, useEffect, useState } from "react";
// import React, { useRef, useEffect, useState } from "react";
// import React from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "layouts/dashboard/index.css";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { Line } from "react-chartjs-2";
import moment from "moment";
import { Chart } from "chart.js";
import "chartjs-adapter-luxon";
import ChartStreaming from "chartjs-plugin-streaming";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZWxiZXJ0bWVzYSIsImEiOiJjbGYxYzRkZXMwNnhpM3FteG13dmttMzk1In0.J8Sf6yAbFo4LcCA8EW4DEQ";
// import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
// import { MapContainer } from 'react-leaflet/MapContainer'

// mapboxgl.accessToken =
// "pk.eyJ1IjoiZWxiZXJ0bWVzYSIsImEiOiJjbGV5ajhvZzEwNWtuM3FwdTQwODEzdGdyIn0.px5EshgXot7hAohqhwqpGQ";

function Dashboard() {
  // Ploty JS Example
  // const [datap, setDatap] = useState([{ y: [Math.random()], type: "line" }]);
  // const [cnt, setCnt] = useState(0);

  // ChartJS Example
  Chart.register(ChartStreaming);

  const chartColors = {
    red: "rgb(255, 99, 132)",
    orange: "rgb(255, 159, 64)",
    yellow: "rgb(255, 205, 86)",
    green: "rgb(75, 192, 192)",
    blue: "rgb(54, 162, 235)",
    purple: "rgb(153, 102, 255)",
    grey: "rgb(201, 203, 207)",
  };

  const dataTest = {
    labels: [],
    datasets: [
      {
        label: "Dataset 1 (Telegraf Data)",
        backgroundColor: chartColors.red,
        borderColor: chartColors.red,
        fill: false,
        lineTension: 0,
        borderDash: [8, 4],
        data: [],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      streaming: {
        duration: 10000,
        ttl: 60000,
        refresh: 2000,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      xAxes: {
        type: "realtime",
        distribution: "linear",
        realtime: {
          onRefresh: function (chart) {
            chart.data.datasets[0].data.push({
              x: Date.now(),
              // Math.random(),
              // y: PopulateFromInflux("test"),
              y: PopulateRealtimeInflux(),
            });
          },
          delay: 3000,
          time: {
            displayFormat: "h:mm",
          },
        },
        ticks: {
          displayFormats: 1,
          maxRotation: 0,
          minRotation: 0,
          stepSize: 1,
          maxTicksLimit: 30,
          minUnit: "second",
          source: "auto",
          autoSkip: true,
          callback: function (value) {
            return moment(value, "HH:mm:ss").format("HH:mm:ss");
          },
        },
      },
      yAxes: {
        ticks: {
          beginAtZero: true,
          max: 1,
        },
      },
    },
  };

  const navigate = useNavigate();
  const [barChartData, setBarChartData] = useState({});
  // const [gradLineChartData, setGradLineChartData] = useState({});
  // const [gradOsciloscopioLineChartData, setGradOsciloscopioLineChartData] = useState({});
  // const [dat, setDat] = useState({});
  // const [resultAutoRefresh, setResultAutoRefresh] = useState([]);
  const { sales, tasks } = reportsLineChartData;
  const mapContainer = useRef(null);
  const map = useRef(null);
  // const barChart = useRef(null);
  const [lng] = useState(-82.366592);
  const [lat] = useState(23.113592);
  const [zoom] = useState(9);
  const [data, setData] = useState(0);
  const [data2, setData2] = useState(0);
  // const [data4, updateData4] = useState([]);
  // const [data4, updateData4] = useState(PopulateFromInflux("Q"));
  // const [list, setList] = useState([]);
  const [username, setUsername] = useState("");
  // const [dataStream, setDataStream] = useState([0]);
  /** 
  const series = [
    {
      name: "I/Q",
      data: data4,
    },
  ];
  const options = {
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
      // toolbar: {
      //  show: false,
      // },
      // zoom: {
      //  enabled: false,
      // },
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Dynamic Updating Chart",
      align: "left",
    },
    xaxis: {
      range: 100,
      type: "numeric",
      // categories: PopulateFromInflux("Q"),
      // categories: ["2019-05-01", "2019-05-02", "2019-05-03", "2019-05-04"],
    },
  }; */

  // Test geojson static
  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-82.45434, 23.0929],
        },
        properties: {
          title: "RSP1A",
          description: "La Habana, Playa",
          id_sensor: "First1",
          value: 2.14,
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-82.43119, 23.117634],
        },
        properties: {
          title: "RSP1A",
          description: "La Habana, Miramar",
          id_sensor: "First5",
          value: 100,
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-82.26895, 23.04459],
        },
        properties: {
          title: "RSP1A",
          description: "La Habana, Cotorro",
          id_sensor: "First4",
          value: 1.8,
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-82.304779, 23.12554],
        },
        properties: {
          title: "RSP1A",
          description: "La Habana, Guanabacoa",
          id_sensor: "First3",
          value: 0.06,
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-82.383965, 22.972345],
        },
        properties: {
          title: "RSP1A",
          description: "La Habana, Boyeros",
          id_sensor: "First2",
          value: 10.6,
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-82.386172, 22.989087],
        },
        properties: {
          title: "RSP1A",
          description: "La Habana, Boyeros, LACETEL",
          id_sensor: "test",
          value: 1.6,
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-82.386877, 22.988889],
        },
        properties: {
          title: "RSP1A",
          description: "La Habana, Boyeros, LACETEL",
          id_sensor: "test2",
          value: 2.14,
        },
      },
    ],
  };

  // Code For Testing  geojson dinamically load from API
  /**
  cube(`Users`, {
    sql: `SELECT * FROM public.Users WHERE geometry is not null`,
  
    measures: {
      count: {
        type: `count`,
      }
    },
  
    dimensions: {
      geometry: {
        sql: 'geometry',
        type: 'string',
      }
    }
  }); 

  const { resultSet } = useCubeQuery({ 
    measures: ['Users.count'],
    dimensions: ['Users.geometry'],
  }); 

  let data = {
    type: 'FeatureCollection',
    features: [],
  };
  
  if (resultSet) {
    resultSet.tablePivot().map((item) => {
      data['features'].push({
        type: 'Feature',
        properties: {
          value: parseInt(item['Users.count']),
        },
        geometry: JSON.parse(item['Users.geometry']),
      });
    });
  } */
  /** 
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      return null;
    }); */

  const markerClicked = (idSensor, lastValue, descriptions, long, latitud) => {
    setData(sales);
    setData2(tasks);
    navigate(`/dashboard/sensor-id/${idSensor}/${lastValue}/${descriptions}/${long}/${latitud}`);
    // window.alert("have you push a marker");
  };

  useEffect(() => {
    const username2 = sessionStorage.getItem("username");
    setUsername(sessionStorage.getItem("username"));
    console.log(username);
    toast.success(`Welcome ${username2} to our IoT monitoring system `, {
      theme: "colored",
      autoClose: 2000,
    });
  }, [useState]);

  useEffect(() => {
    console.log("refre");
    const interval = setInterval(() => {
      console.log("refresh every 3s");
      const y = gradientLineChartData;
      console.log("yyyyys", y);
      setBarChartData(reportsBarChartData);
      // setGradLineChartData(gradientLineChartData);
      // setGradLineChartData(testCall());
      // setGradOsciloscopioLineChartData(gradientOsciloscopioLineChartData);
    }, 5000);
    return () => clearInterval(interval);
    // }, [useState, o list, cnt]);
    // }, [useState]); aqui asi estaba
  }, [useState]);

  // useEffect(() => {
  //  Plotly.newPlot("chart", datap);
  // }, []);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      attributionControl: false,
      center: [lng, lat],
      zoom: [zoom],
    });
    map.current.addControl(new mapboxgl.NavigationControl());

    map.current.on("load", () => {
      // Load an image from an external URL.
      map.current.loadImage(
        kisspnginternetofthingscomputericonshandhelddevicessignal,
        (error, image) => {
          if (error) throw error;
          // Add the image to the map style.
          map.current.addImage("custom-marker", image);
          // add source
          map.current.addSource("places", {
            type: "geojson",
            data: geojson,
          });
          // Add a layer showing the heatmap.
          map.current.addLayer(
            {
              id: "trees-heat",
              type: "heatmap",
              source: "places",
              maxzoom: 15,
              paint: {
                // increase weight as diameter breast height increases
                "heatmap-weight": {
                  property: "value",
                  type: "identity",
                  // ["interpolate", ["linear"], ["get", "value"], 0, 0, 6, 2],
                  //  // type: "exponential",
                  // stops: [
                  //  [1, 0],
                  //  [62, 1],
                  // ],
                },
                // increase intensity as zoom level increases
                // "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],
                "heatmap-intensity": {
                  stops: [
                    [11, 1],
                    [15, 3],
                  ],
                },
                // increase radius as zoom increases
                /** 
                "heatmap-color": [
                  "interpolate",
                  ["linear"],
                  ["heatmap-density"],
                  0,
                  "rgba(33,102,172,0)",
                  0.2,
                  "rgb(103,169,207)",
                  0.4,
                  "rgb(209,229,240)",
                  0.6,
                  "rgb(253,219,199)",
                  0.8,
                  "yellow",
                  1,
                  "red",
                ], */
                "heatmap-radius": 30,
                // decrease opacity to transition into the circle layer
                "heatmap-opacity": 1,
                // "heatmap-mode": "density",
              },
            },
            "waterway-label"
          );
          // Add a layer showing the places.
          map.current.addLayer({
            id: "places",
            type: "symbol",
            source: "places", // reference the data source
            /** 
            paint: {
              "circle-color": "#4264fb",
              "circle-radius": 6,
              "circle-stroke-width": 2,
              "circle-stroke-color": "#ffffff",
            }, */
            layout: {
              "icon-image": "custom-marker", // reference the image
              // "icon-ignore-placement": true,
              "icon-allow-overlap": true,
              "icon-size": 0.04,
            },
          });
          // Create a popup, but don't add it to the map yet.
          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
          });

          map.current.on("mouseenter", "places", (e) => {
            // Change the cursor style as a UI indicator.
            map.current.getCanvas().style.cursor = "pointer";
            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const descriptions = e.features[0].properties.description;
            const titles = e.features[0].properties.title;
            const idsensors = e.features[0].properties.id_sensor;
            const values = e.features[0].properties.value;
            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            // Populate the popup and set its coordinates
            // based on the feature found.
            popup
              .setLngLat(coordinates)
              .setHTML(
                `<h3>${titles}</h3>
                <p>${descriptions}</p>
              <p>Sensor ID: ${idsensors}</p>
              <p>Sensor value: ${values}</p>`
              )
              .addTo(map.current);
          });

          map.current.on("mouseleave", "places", () => {
            map.current.getCanvas().style.cursor = "";
            popup.remove();
          });

          map.current.on("click", "places", (e) => {
            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const idsensors = e.features[0].properties.id_sensor;
            const lastValue = e.features[0].properties.value;
            const descriptions = e.features[0].properties.description;
            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            markerClicked(idsensors, lastValue, descriptions, coordinates[0], coordinates[1]);
          });
        }
      );
    });

    /** 
    for (let index = 0, l = geojson.features.length; index < l; index += 1) {
      const feature = geojson.features[index];
      // create a HTML element for each feature
      const el = document.createElement("div");
      el.className = "marker";
      // make a marker for each feature and add it to the map
      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(`<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>
            <p>Sensor ID: ${feature.properties.id_sensor}</p>
            <p>Sensor value: ${feature.properties.value}</p>`)
        )
        .addTo(map.current);
      el.addEventListener("click", () => {
        markerClicked();
      });
    } 
    <div>
     <Chart options={options} series={series} type="line" width={1150} height={350} />
    </div> */
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ToastContainer />
      <MDBox py={6}>
        Sensor Map
        <MDBox mt={4.5}>
          <div>
            <div ref={mapContainer} className="map-container" />
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title=""
                  description=""
                  date=""
                  chart={barChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title=""
                  description={
                    <>
                      (<strong>Testing Data Set</strong>)
                    </>
                  }
                  date=""
                  chart={data}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="lectura procesada"
                  description=""
                  date=""
                  chart={data2}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={15}>
              <MDBox mb={3}>
                <div>
                  <Line data={dataTest} options={options} />
                </div>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={15}>
              <Projects />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
