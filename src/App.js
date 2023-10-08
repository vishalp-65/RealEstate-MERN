import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element = {<LandingPage />}> </Route>
      </Routes>
    </div>
  );
}

export default App;
