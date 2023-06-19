import sensorDataAxiosInstance from "connection/helpers/base-urls/sensor-data/sensor-data-axius";

function App2() {
  const data = [100, 50, 90, 80, 70, 40, 80];
  async function getUser() {
    try {
      const response = await sensorDataAxiosInstance.get("api/sensordata/list/");
      const data3 = response.data;
    } catch (error) {
      console.error(error);
    }
  }
  getUser();
  // data2.map((data1) => data1.resultant_value);
  return data;
}
export default App2;
