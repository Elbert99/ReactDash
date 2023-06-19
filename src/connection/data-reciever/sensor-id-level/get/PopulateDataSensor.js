import sensorDataAxiosInstance from "connection/helpers/base-urls/sensor-data/sensor-data-axius";

function PopulateDataSensor(goal, idSensor) {
  const timestamp = [];
  const power = [];
  const gradientChart = [];
  const resultant = [];
  let result = [];
  const tableData = [];
  console.log("ID emn populateDataSensor", idSensor);

  const getSensorDataListByID = async () => {
    try {
      await sensorDataAxiosInstance
        .get(`api/sensordata/listFinal/${idSensor}/`)
        .then((response) => {
          console.log(response.data);
          for (let index = 0, l = response.data.length; index < l; index += 1) {
            const dataObj = response.data[index];
            console.log(dataObj);
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
          console.log(gradientChart);
        });
    } catch (error) {
      console.error(error);
    }
  };
  getSensorDataListByID();
  console.log(gradientChart);
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

/** 
function App3() {
  let data3 = [];
  let data5 = [0];
  const [data, setData] = useState(0);
  const getSensorDataList = async () => {
    await sensorDataAxiosInstance.get("list/").then((response) => {
      const data2 = response.data;
      setData(data2);
      console.log("teeeeeeeeeeeeeeeeeee", data);
    });
  };

  const getSensorDataList2 = async () => {
    await sensorDataAxiosInstance.get("list/").then((response) => {
      data3 = response.data;
      console.log("teeeeeeeeeeeeeeeeeeerrrrrrData3", data3);
    });
    data5 = data3;
  };

  useEffect(() => {
    getSensorDataList();
  }, []);

  getSensorDataList2();
  console.log("teeeeeeeeeeeeeeeeeeerrrrrrData3", data5);
  console.log("vvvvvvvvvvvvvvvvvvvvvvv", data);
  // console.log("thidddddd", data);
  // const data4 = data3.map((data3) => data3.resultant_value);
  // console.log("data4", data4);

  return data;
} */
export default PopulateDataSensor;
