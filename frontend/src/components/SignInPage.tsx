import { useState } from "react";
import { signin } from "../functions/signin";
import { useDataContext } from "../context/useDataContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../functions/routes";

export const SigninPage = () => {
  const { setIsLoggedIn, setToken } = useDataContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (): Promise<void> => {
    setIsloading(true);

    const result = await signin(name, email, password);

    setIsloading(false);

    if (result.success) {
      setToken(result.token);
      setIsLoggedIn(true);
      navigate(ROUTES.UIPAGE);
    } else {
      alert("registeration failed");
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="name"
          className="py-5 px-2 block border border-black border-solid w-3xs h-8 text-[18px] text-black mt-2 outline-0"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
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
          onClick={handleSignIn}
        >
          {isLoading ? "loading" : "signin"}
        </button>
      </div>
    </div>
  );
};
