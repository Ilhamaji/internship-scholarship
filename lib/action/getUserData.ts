import axios from "axios";
import Cookies from "js-cookie";

export default async function getUserData(setLoading: any, setUserData: any) {
  setLoading(true);
  await axios
    .get(`http://localhost:5000/users/${Cookies.get("userId")}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    })
    .then(function (response) {
      setUserData(response.data.data);
      setLoading(false);
      return response;
    })
    .catch(function (error) {
      setLoading(false);
      return console.log(error);
    });
}
