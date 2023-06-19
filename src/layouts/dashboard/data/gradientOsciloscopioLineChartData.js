import Populate from "connection/data-reciever/general-level/get/populateData2";

const gradientOsciloscopioLineChartData = {
  labels: Populate("time"),
  datasets: [
    {
      label: "Dataset Oscilo",
      color: "dark",
      data: Populate("result"),
    },
  ],
};

export default gradientOsciloscopioLineChartData;
