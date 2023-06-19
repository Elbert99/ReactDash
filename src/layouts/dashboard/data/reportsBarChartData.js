// import App2 from "../../../connection/data-reciever/general-level/get/populateData";
import Populate from "connection/data-reciever/general-level/get/populateData2";

export default {
  labels: ["M", "T", "W", "T", "F", "S", "S", "E"],
  datasets: {
    label: "Sales",
    data: [50, 20, 10, 22, 50, 10, 40],
    label2: "Second Data Set",
    data2: Populate("chart"),
  },
};
