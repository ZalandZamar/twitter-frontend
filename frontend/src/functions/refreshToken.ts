import axios from "axios";

type RefreshResult = {
  accessToken: string;
};

export const refreshToken = async (): Promise<RefreshResult> => {
  const res = await axios.get("/api/refresh", {
    withCredentials: true,
  });

  return { accessToken: res.data.accessToken };
};
