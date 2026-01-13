import axios from "axios";

type SigninResult =
  | { success: true; token: string }
  | { success: false; message: string };

export const signin = async (
  name: string,
  email: string,
  password: string
): Promise<SigninResult> => {
  try {
    const res = await axios.post("/api/auth/register", {
      name,
      email,
      password,
    });

    // map backend token explicitly
    return {
      success: true,
      token: res.data.token, // must match backend response exactly
    };
  } catch (error) {
    return { success: false, message: "registration failed" };
  }
};
