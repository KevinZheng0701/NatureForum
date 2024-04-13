import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Postcard from "./components/Postcard";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Postcard />} />
      </Routes>
    </Router>
  );
};

export default App;
