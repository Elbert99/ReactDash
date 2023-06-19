import sensorDataAxiosInstance from "connection/helpers/base-urls/sensor-data/sensor-data-axius";

function Populate(goal) {
  const timestamp = [];
  const power = [];
  const gradientChart = [];
  const resultant = [];
  let result = [];
  const tableData = [];

  const getSensorDataList = async () => {
    try {
      await sensorDataAxiosInstance.get("api/sensordata/listFinal/").then((response) => {
        for (let index = 0, l = response.data.length; index < l; index += 1) {
          const dataObj = response.data[index];
          tableData.splice();
          tableData.push(dataObj);
          gradientChart.splice();
          gradientChart.push(dataObj.frequency);
          power.splice();
          power.push(dataObj.power);
          timestamp.slice();
          timestamp.push(dataObj.timestamp);
          resultant.slice();
          resultant.push(dataObj.resultant_value);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  getSensorDataList();
  if (goal === "frequency") {
    result = gradientChart;
  } else if (goal === "table") {
    result = tableData;
  } else if (goal === "power") {
    result = power;
  } else if (goal === "time") {
    result = timestamp;
  } else if (goal === "result") {
    result = resultant;
  }
  return result;
}

export default Populate;
