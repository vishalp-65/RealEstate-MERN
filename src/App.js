import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Explrore from "./components/Explrore/Explrore";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element = {<LandingPage />}> </Route>

        {/* Explrore */}
        <Route path="listings" element={<Explrore/>}></Route>

      </Routes>
    </div>
  );
}

export default App;
