import React, { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar.jsx";
import { Home, Favorites, routes } from "./pages";
import { detectMobile } from "./utils/helper.js";
import "./App.css";

const App = () => {
  const isMobile = detectMobile();

  return (
    <BrowserRouter>
      <div className={isMobile ? "is-mobile" : "is-pc"}>
        <Navbar />
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.favorites} element={<Favorites />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
