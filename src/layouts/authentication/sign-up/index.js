/* eslint-disable camelcase */
import { useState } from "react";

// Connection
import AxiosInstance from "connection/helpers/base-urls/sensor-data/sensor-data-axius";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import { toast, ToastContainer } from "react-toastify";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-getty-images.jpg";

function Cover() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { first_name, last_name, username, email, password, password2 } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    AxiosInstance.post("account/register/", {
      first_name,
      last_name,
      username,
      email,
      password,
      password2,
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          console.log("user-token", res.data.username);
          console.log("Successfully registed.");
          toast.success(`${res.data.username}, su registro en el sistema ha sido exitoso.`, {
            theme: "colored",
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        console.log("ERROR", error);
        console.log("Wrong register fields. passwords does not match or already exists the email.");
        toast.warning("Existen campos incorrectos", {
          theme: "colored",
          autoClose: 2000,
        });
      });
  };

  console.log(formData);

  return (
    <CoverLayout image={bgImage}>
      <ToastContainer />
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Bienvenido a nuestra web
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Ingrese los siguientes datos para su registro
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={(e) => onSubmit(e)}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Nombre"
                name="first_name"
                variant="standard"
                value={first_name}
                onChange={(e) => onChange(e)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Apellidos"
                name="last_name"
                variant="standard"
                value={last_name}
                onChange={(e) => onChange(e)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Nombre de usuario"
                name="username"
                variant="standard"
                value={username}
                onChange={(e) => onChange(e)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                name="email"
                variant="standard"
                value={email}
                onChange={(e) => onChange(e)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Contraseña"
                name="password"
                variant="standard"
                value={password}
                onChange={(e) => onChange(e)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Confirmar contraseña"
                name="password2"
                variant="standard"
                value={password2}
                onChange={(e) => onChange(e)}
                fullWidth
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" type="submit" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Usted ya posee cuenta?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
