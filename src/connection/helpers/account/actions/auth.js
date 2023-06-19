import AxiosInstance from "connection/helpers/base-urls/sensor-data/sensor-data-axius";

function Login(email, password) {
  let isAutenticated = [];
  const flag = [];
  const login = async () => {
    try {
      const res = await AxiosInstance.post("account/login-app/", { email, password });
      console.log("entra al try");
      console.log(res.data);
      flag.splice();
      flag.push(1);
    } catch (err) {
      console.error(err);
    }
  };
  login();
  isAutenticated = flag;
  console.log("method", isAutenticated);
  console.log("method-lenght", isAutenticated.length);
  return isAutenticated;
}

export default Login;
