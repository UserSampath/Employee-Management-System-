import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import Rating from "./pages/Rating/Rating";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/" element={<Rating />}></Route>
        <Route path="/admin" element={<AdminDashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
