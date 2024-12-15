import { Route, Routes } from "react-router-dom";
import "./App.css";
import SecureLayout from "./components/page/SecureWebsite/Layout/SecureLayout";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<SecureLayout/>} />
      </Routes>
    </div>
  );
}

export default App;
