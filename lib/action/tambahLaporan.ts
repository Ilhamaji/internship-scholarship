import axios from "axios";

export default async function tambahLaporan(formData: FormData) {
  await axios
    .post("http://localhost:5000/monev/draft", {
      academicReports: {
        semester: "",
        ips: "",
        ipk: "",
        buktiUrl: "",
      },
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyNTMwMDAxIiwiZW1haWwiOm51bGwsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzUxNTUxODQzLCJleHAiOjE3NTE2MzgyNDN9.sgLrciIgxF9mfFpN9uKLyGN7kSqP5cshmsKM01sCksQ`,
      },
    })
    .then(function (response) {
      console.log("sukses");
    })
    .catch(function (error) {
      console.log(error);
    });
}
