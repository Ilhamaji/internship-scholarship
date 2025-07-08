import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    // Forward the request to your actual backend API
    const response = await axios.post(
      `${process.env.API_URL}/auth/refresh`,
      {},
      {
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      }
    );

    res.status(200).json({ accessToken: response.data.accessToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
}
