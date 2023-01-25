import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import MainScreen from "./Components/MainScreen/MainScreen";

function App() {
  return (
    <div className="bg-light">
      <Navbar />
      <MainScreen />
    </div>
  );
}

export default App;
