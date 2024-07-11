import { Route, Routes, Navigate } from "react-router-dom";
import Form from "./components/Form/Form";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

function App() {
  const token = localStorage.getItem("token");
  return (
    <Routes>
      {token && <Route path="/" exact element={<Form />} />}
      <Route path="/register" exact element={<Register />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
