import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Explrore from "./components/Explrore/Explrore";
import ListingDetailPage from "./components/ListingDetailPage/ListingDetailPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element = {<LandingPage />} /> 

        {/* Explrore */}
        <Route path="listings" element={<Explrore/>} />

        {/* Listing Details */}
        <Route path="/detail/:property_id" element={<ListingDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
