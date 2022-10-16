
// import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import { Navbar, Container } from 'react-bootstrap';

// import Navbar from './template/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchPage from "./pages/SearchPage";
import Projects from "./pages/projects/Projects";
import Footer from "./template/Footer";
import Header from "./template/Header";
import Sidebar from "./template/Sidebar";

function App() {
  return (
    <Router>


      <Header />
      <Sidebar />


      <main id="main" className="main">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>

      </main>

      <Footer />
    </Router>
  );
}

export default App;
