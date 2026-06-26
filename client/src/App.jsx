import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Company from "./pages/Company";
import Province from "./pages/province";
import Items from "./pages/items";
import TruckType from "./pages/TruckType";
import Report from "./pages/Reports";
import CompanyReport from "./pages/CompanyReport";

// function App() {
//   return (
//     <div>
//       <Header />

//       <Routes>
//         <Route path="/" element={<CompanyReport />} />
//         <Route path="/province" element={<Province />} />
//         <Route path="/items" element={<Items />} />
//         <Route path="/company" element={<Company />} />
//         <Route path="/trucktypes" element={<TruckType />} />
//           <Route path="/reports" element={<Report />} />
//       </Routes>
//     </div>
//   );
// }
function App() {
  return (
    <div className="app-layout">

      <Header />

      <div className="page-content">
        <Routes>
          <Route path="/" element={<CompanyReport />} />
          <Route path="/province" element={<Province />} />
          <Route path="/items" element={<Items />} />
          <Route path="/company" element={<Company />} />
          <Route path="/trucktypes" element={<TruckType />} />
          <Route path="/reports" element={<Report />} />
        </Routes>
      </div>

    </div>
  );
}
export default App;