import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { SoldPage } from './pages/SoldPage';
import { ContactPage } from './pages/ContactPage';
import { FloorPlansPage } from './pages/FloorPlansPage';
import { UsefulInfoPage } from './pages/UsefulInfoPage';
import { Footer } from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sold" element={<SoldPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/floor-plans" element={<FloorPlansPage />} />
            <Route path="/useful-info" element={<UsefulInfoPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
