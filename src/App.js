import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./components/Blog";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import "./App.css";
import { ThemeProvider } from "./theme-context";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
