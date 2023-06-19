import PopulateFromInflux from "connection/data-reciever/general-level/get/populateDataInflux";

function test() {
  const gradientLineChartData = {
    labels: PopulateFromInflux("Q"),
    datasets: [
      {
        label: "Dataset Power",
        color: "dark",
        data: PopulateFromInflux("Q"),
      },
    ],
  };
  return gradientLineChartData;
}

export default test;
