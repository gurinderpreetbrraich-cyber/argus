import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import LiveDemo from './pages/LiveDemo';
import Domains from './pages/Domains';
import Benchmark from './pages/Benchmark';
import Docs from './pages/Docs';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="demo" element={<LiveDemo />} />
          <Route path="domains" element={<Domains />} />
          <Route path="benchmark" element={<Benchmark />} />
          <Route path="docs" element={<Docs />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
