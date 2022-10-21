import logo from "./logo.svg";
import "./App.css";
import PrimaryRoutes from "./routes/primaryRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {" "}
      <PrimaryRoutes />{" "}
    </BrowserRouter>
  );
}

export default App;
