import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Company from "./pages/Company";
import Province from "./pages/Province";
import Items from "./pages/Items";
import TruckType from "./pages/TruckType";

function Home() {
  return (
    <div className="container mt-4">
      <h2>Welcome to Kamisoon Report System</h2>
      <p>Bootstrap UI is now active 🚀</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/province" element={<Province />} />
        <Route path="/items" element={<Items />} />
        <Route path="/company" element={<Company />} />
        <Route path="/trucktypes" element={<TruckType />} />
      </Routes>
    </div>
  );
}

export default App;