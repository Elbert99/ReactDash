import sensorDataAxiosInstance from "connection/helpers/base-urls/sensor-data/sensor-data-axius";

function PopulateFromInflux(id) {
  let result = [];
  const q = [];

  if (id === "test") {
    const getSensorDataList = async () => {
      console.log("Entre a test");
      await sensorDataAxiosInstance.get("api/sensordata/listInflux/").then((response) => {
        console.log("Entre a testdentroinside");
        for (let index = 0, l = response.data.length; index < l; index += 1) {
          const dataObj = response.data[index];
          console.log("Entre a testdentroinside");
          // console.log("Ojectttttttt", dataObj);
          // console.log("responseeeeee", response.data);
          q.splice();
          // eslint-disable-next-line no-underscore-dangle
          q.push(dataObj._value);
        }
        // console.log(gradientChart);
      });
    };
    getSensorDataList();
    result = q;
    console.log("Entre a test");
    // console.log("Ojecttttttttresulttt", result);
  } else if (id === "test2") {
    const getSensorDataList = async () => {
      await sensorDataAxiosInstance.get("api/sensordata/listInflux2/").then((response) => {
        for (let index = 0, l = response.data.length; index < l; index += 1) {
          const dataObj = response.data[index];
          // console.log("Ojectttttttt", dataObj);
          // console.log("responseeeeee", response.data);
          q.splice();
          // eslint-disable-next-line no-underscore-dangle
          q.push(dataObj._value);
        }
        // console.log(gradientChart);
      });
    };
    getSensorDataList();
    result = q;
    console.log("Entre a test2");
  }
  return result;
}

export default PopulateFromInflux;
