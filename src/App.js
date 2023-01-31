import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import MainScreen from "./Components/MainScreen/MainScreen";
import { BrowserRouter as Router } from "react-router-dom";
import PrimaryRoutes from "./Components/Routes/PrimaryRoutes";

function App() {
  return (
    <div className="">
      <Router>
        <PrimaryRoutes />
      </Router>
    </div>
  );
}

export default App;
