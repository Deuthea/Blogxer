import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import PrimaryRoutes from "./Components/Routes/PrimaryRoutes";
import { useDispatch } from "react-redux";
import { getUser } from "./features/Auth/authSlice";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className="">
      <ToastContainer  />
      <Router>
        <PrimaryRoutes />
      </Router>
    </div>
  );
}

export default App;
