import { useState } from "react";
import { login } from "../functions/login";
import { useDataContext } from "../context/useDataContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../functions/routes";

export const LoginPage = () => {
  const { setIsLoggedIn, setToken } = useDataContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const handleLogIn = async (): Promise<void> => {
    setIsloading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        setToken(result.accessTkn);
        console.log(result.accessTkn);
        setIsLoggedIn(true);
        navigate(ROUTES.UIPAGE);
      } else {
        alert("registeration failed");
      }
    } catch (err) {
      alert("network or server error");
      console.error(err);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div>
      <div>
        <input
          type="email"
          placeholder="email"
          className="py-5 px-2 block border border-black border-solid w-3xs h-8 text-[18px] text-black mt-2 outline-0"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          className="py-5 px-2 block border border-black border-solid w-3xs h-8 text-[18px] text-black mt-2 outline-0"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="bg-blue-600 text-white text-[18px] py-1.5 px-4 block mt-2 cursor-pointer"
          onClick={handleLogIn}
        >
          {isLoading ? "loading" : "logIn"}
        </button>
      </div>
    </div>
  );
};
