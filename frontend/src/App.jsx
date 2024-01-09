import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import Rating from "./pages/Rating/Rating";
import AllEmployees from "./pages/AllEmployees/AllEmployees";
import WebTeam from "./pages/webTeam/WebTeam";
import ApiTeam from "./pages/apiTeam/ApiTeam";
import FlutterTeam from "./pages/flutterTeam/FlutterTeam";
import UiUxTeam from "./pages/uiUxTeam/UiUxTeam";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/" element={<AllEmployees />}></Route>
        <Route path="/web_team" element={<WebTeam />}></Route>
        <Route path="/api_team" element={<ApiTeam />}></Route>
        <Route path="/flutter_team" element={<FlutterTeam />}></Route>
        <Route path="/ui_ux_team" element={<UiUxTeam />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
