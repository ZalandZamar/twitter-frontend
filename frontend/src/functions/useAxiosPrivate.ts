import { axiosPrivate } from "./axiosPrivate";
import { refreshToken } from "./refreshToken";
import { useEffect } from "react";
import { useDataContext } from "../context/useDataContext";

const useAxiosPrivate = () => {
  const { token, setToken } = useDataContext();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization && token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          const { accessToken } = await refreshToken();

          setToken(accessToken); // critical
          prevRequest.headers.Authorization = `Bearer ${accessToken}`;

          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [token, setToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
