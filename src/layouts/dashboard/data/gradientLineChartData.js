import PopulateFromInflux from "connection/data-reciever/general-level/get/populateDataInflux";

const gradientLineChartData = {
  labels: PopulateFromInflux("Q"),
  datasets: [
    // {
    //  label: "Dataset Testing",
    //  color: "info",
    //  data: [],
    // },
    {
      label: "Dataset Power",
      color: "dark",
      data: PopulateFromInflux("Q"),
    },
  ],
};

export default gradientLineChartData;
