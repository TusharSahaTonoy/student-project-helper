
// import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
// import { Navbar, Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import SearchPage from "./components/SearchPage";


function App() {

  const [programs, setPrograms] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:6500/projects').then((res) => {
      // console.log(res);
      setPrograms(res.data);
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home programs={programs} />} />
            <Route path="/home" element={<Home programs={programs} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>

        </div>
      </Router>

    </div>
  );
}

export default App;
