import "./App.css";
import { AuthPage } from "./components/AuthPage";
import { LoginPage } from "./components/LoginPage";
import { SigninPage } from "./components/SignInPage";
import { UIPage } from "./components/UIPage";
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/signin" element={<SigninPage />}></Route>
      <Route path="/UI" element={<UIPage />}></Route>
    </Routes>
  );
}

export default App;
