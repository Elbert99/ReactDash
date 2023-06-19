/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
// data
import Populate from "connection/data-reciever/general-level/get/populateData2";

export default function data() {
  return {
    columns: [
      { Header: "sensor id", accessor: "id_sensor", width: "45%", align: "left" },
      { Header: "value", accessor: "resultant_value", align: "center" },
      { Header: "timestamp", accessor: "timestamp", align: "center" },
      // { Header: "sensors id", accessor: "sensors", width: "45%", align: "left", selector: (rows) => rows.resultant_value, },
    ],

    rows: Populate("table"),
  };
}
