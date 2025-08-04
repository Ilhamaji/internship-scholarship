import axios from "axios";

export default async function getLaporanDetailById(id: string) {
  await axios
    .get(`http://localhost:5000/monev/${id}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyNTMwMDAxIiwiZW1haWwiOm51bGwsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzUxNjk1NDYyLCJleHAiOjE3NTE3ODE4NjJ9.feyun_KfVTxToFwc95pzpFfSPL3pjhcOPR75kIoPjhI`,
      },
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}
