import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./routes/Homepage";
import Createpage from "./routes/Createpage";
import Postpage from "./routes/Postpage";
import Editpage from "./routes/Editpage";
import Viewpage from "./routes/Viewpage";
import Notfoundpage from "./routes/Notfoundpage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<Createpage />} />
        <Route path="/post/:id" element={<Postpage />} />
        <Route path="/edit/:id" element={<Editpage />} />
        <Route path="view" element={<Viewpage />} />
        <Route path="view/:query" element={<Viewpage />} />
        <Route path="*" element={<Notfoundpage />} />
      </Routes>
    </Router>
  );
};

export default App;
