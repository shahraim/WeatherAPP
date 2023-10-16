import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WeatherApp } from "./Components/WeatherApp";


function App() {
  return (
    <div className="App">
      <WeatherApp />
      <ToastContainer />
    </div>
  );
}

export default App;
