import axios from "axios";

export const logout = async () => {
  try {
    await axios.get("/api/logout");
    localStorage.removeItem("token");

    // if we reach here the response is a success(2xx)
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
