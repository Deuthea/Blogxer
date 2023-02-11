import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import MainScreen from "./Components/MainScreen/MainScreen";
import { BrowserRouter as Router } from "react-router-dom";
import PrimaryRoutes from "./Components/Routes/PrimaryRoutes";
import { useDispatch } from "react-redux";
import { getUser } from "./features/Auth/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className="">
      <Router>
        <PrimaryRoutes />
      </Router>
    </div>
  );
}

export default App;
