import sensorDataAxiosInstance from "connection/helpers/base-urls/sensor-data/sensor-data-axius";

function PopulateRealtimeInflux() {
  const q = [];

  const getSensorDataList = async () => {
    await sensorDataAxiosInstance.get("api/sensordata/listInflux/").then((response) => {
      console.log("GET reQUESTqqqq");
      const dataObj = response.data;
      console.log("GET reQUESTqqqq", dataObj);
      q.push(dataObj.value);
      console.log("GET reQUESTqqqq", dataObj);
    });
    console.log("GET reQUESTqqqq");
  };
  getSensorDataList();
  // console.log("valorq", q.length);
  const result = q;
  console.log("GET reQUEST", result);
  return result;
}
export default PopulateRealtimeInflux;
