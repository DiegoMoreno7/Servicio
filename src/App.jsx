import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";
import SearchPlace from "./pages/SearchPlace";
import AddPerson from "./pages/AddPerson";
import SearchMatches from "./pages/SearchMatches";
import Statistics from "./pages/Statistics";
import Localized from "./pages/Localized";

function App() {
  return (
    <div>
      {/*<Navbar />*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search-place" element={<SearchPlace />} />
        <Route path="/add-person" element={<AddPerson />} />
        <Route path="/search-matches" element={<SearchMatches />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/localized" element={<Localized />} />
      </Routes>
    </div>
  );
}

export default App;
