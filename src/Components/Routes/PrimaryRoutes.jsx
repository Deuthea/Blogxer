import React from "react";
import { Route, Routes } from "react-router-dom";
import MainScreen from "../MainScreen/MainScreen";
import WriteBlog from "../WriteBlog/WriteBlog";

const PrimaryRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/new-blog" element={<WriteBlog />} />
      </Routes>
    </div>
  );
};

export default PrimaryRoutes;
