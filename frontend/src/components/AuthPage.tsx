import { useNavigate } from "react-router-dom";
import { ROUTES } from "../functions/routes";

export const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <button
          className="bg-green-600 py-4 px-4 text-white"
          onClick={() => {
            navigate(ROUTES.LOGIN);
          }}
        >
          Log In
        </button>
        <button
          className="bg-green-600 py-4 px-4 text-white ml-3"
          onClick={() => {
            navigate(ROUTES.SIGNIN);
          }}
        >
          sign In
        </button>
      </div>
    </div>
  );
};
