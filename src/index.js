import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
// import Basic from "layouts/authentication/sign-in";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
// import "mapbox-gl/dist/mapbox-gl.css";
// import mapboxgl from "mapbox-gl";

// mapboxgl.accessToken= "pk.eyJ1IjoiZWxiZXJ0bWVzYSIsImEiOiJjbGV4eHY4enYwZXUyM3NwNWl1M2oyOHg4In0.vjuS8X6ok7HTozq5EqyRug"

ReactDOM.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
