
// import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

// import { Navbar, Container } from 'react-bootstrap';

import Navbar from './template/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchPage from "./pages/SearchPage";
import Projects from "./pages/Projects";
import Footer from "./template/Footer";

function App() {

  const [programs, setPrograms] = useState([]);
  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + "/projects").then((res) => {
      // console.log(process.env);
      // console.log(res);
      setPrograms(res.data);
    });
  }, []);

  return (
    <main class="main" id="top">

      <Router>

        <Navbar />
        <Projects />
        {/* <Routes>
          <Route path="/" element={<Home programs={programs} />} />
          <Route path="/home" element={<Home programs={programs} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes> */}

        <Footer />
      </Router>
    </main>
  );
}

export default App;
