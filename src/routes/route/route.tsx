import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@pages/home/home";
import AddPage from "@pages/addingBook/collectingAddPage";
import Updateing from "@pages/updating/editPage";
import Info from "@pages/bookInfo/info";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adding" element={<AddPage />} />
      <Route path="/editing/:id" element={<Updateing />} />
      <Route path="/info/:id" element={<Info />} />
    </Routes>
  );
}

export default Routing;
