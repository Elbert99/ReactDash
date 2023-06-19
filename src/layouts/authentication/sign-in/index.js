/* eslint-disable object-shorthand */
/* eslint-disable prefer-destructuring */
import { useState } from "react";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
// import { connect } from "react-redux";
// import Login from "connection/helpers/account/actions/auth";
// import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "connection/helpers/base-urls/sensor-data/sensor-data-axius";
// import PopulateRealtimeInflux from "connection/data-reciever/general-level/get/populateRealtime";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// @mui icons
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
// import MDAlert from "components/MDAlert";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-mapa-punteado-del-espectro-de-cuba.jpg";
// import { Line } from "react-chartjs-2";
// import "chartjs-plugin-streaming";
// import moment from "moment";
// import { Chart } from "chart.js";
import "chartjs-adapter-luxon";
// import ChartStreaming from "chartjs-plugin-streaming";

/**
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

const data = {
  labels: [],
  datasets: [
    {
      label: "Dataset 1 (linear interpolation)",
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
}; */

function Basic() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  // const [flag, setFlag] = useState(false);
  // const [val, setVal] = useState([]);
  const [errorSB, setErrorSB] = useState(false);
  // const [showFail, setShowFail] = useState(false);
  const closeErrorSB = () => setErrorSB(false);
  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Wrong Credentials"
      content="Email and password not valid."
      dateTime="2 seconds ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgRed
    />
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.type]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    AxiosInstance.post("account/login-app/", { email, password })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          localStorage.setItem("user-token", res.data.token.access);
          sessionStorage.setItem("username", res.data.username);
          console.log("user-token", localStorage);
          console.log("Successfully login.");
          console.log("Congrats Youre In");
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        toast.error("Wrong Credentials. Fields not match with your account.", {
          theme: "colored",
          autoClose: 2000,
        });
        console.log("ERROR", error);
        console.log("Wrong Credentials. Email and password dosen't match with you account.");
        // setErrorSB(true);
      });
    // const val = Login(email, password);
  };

  // const continueWithGoogle = async () => {
  //  try {
  //    const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)
  //     window.location.replace(res.data.authorization_url);
  //    } catch (err) {}
  //  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  // const handleClick = () => navigate("/dashboard");

  return (
    <BasicLayout image={bgImage}>
      <ToastContainer />
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={(e) => onSubmit(e)}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                value={email}
                onChange={(e) => onChange(e)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                value={password}
                onChange={(e) => onChange(e)}
                fullWidth
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" type="submit" fullWidth>
                sign in
              </MDButton>
              {renderErrorSB}
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Usted ya posee cuenta?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDBox mt={0} mb={0} textAlign="center">
              <MDTypography variant="button" color="text">
                Olvidó su contraseña?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Reset password
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
