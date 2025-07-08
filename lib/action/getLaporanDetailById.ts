import axios from "axios";

export default async function getLaporanById(
  setIsLoading: any,
  setDataIpk: any,
  id: string,
  semester: string
) {
  setIsLoading(true);
  await axios
    .get(`http://localhost:5000/monev/${id}/semester/${semester}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyNTMwMDAxIiwiZW1haWwiOm51bGwsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzUxNjk1NDYyLCJleHAiOjE3NTE3ODE4NjJ9.feyun_KfVTxToFwc95pzpFfSPL3pjhcOPR75kIoPjhI`,
      },
    })
    .then(function (response) {
      return setDataIpk(...response.data.data.detailLaporan.academicReports);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(() => setIsLoading(false));
}
