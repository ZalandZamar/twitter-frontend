import axios from "axios";

type LoginResult =
  | {
      success: true;
      accessTkn: string;
    }
  | {
      success: false;
      message: string;
    };

export const login = async (
  email: string,
  password: string
): Promise<LoginResult> => {
  const data = { email, password };

  try {
    const res = await axios.post("/api/auth/login", data, {
      withCredentials: true,
    });

    // if we reach here the response is a success(2xx)
    return {
      success: true,
      accessTkn: res.data.accessTkn,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "invalid credintials",
    };
  }
};
