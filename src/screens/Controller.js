import React from "react";
// import Home from "../screens/home/Home";
import Home from "./home/Home"
import Details from "../screens/details/Details";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookShow from "../screens/bookshow/BookShow";
import Confirmation from "../screens/confirmation/Confirmation";


const Controller = () => {
  const baseUrl = "/api/v1/";

  return (
    <Router>
      <div className="main-container">
        <Routes>
          <Route
            exact
            path="/"
            element={<Home baseUrl={baseUrl} />}
          />
          
          <Route
            path="/movie/:id"
            element={<Details baseUrl={baseUrl} id = {'/:id'} />}
          />

          <Route
            path="/bookshow/:id"
            element={<BookShow baseUrl={baseUrl} id = {'/:id'} />}
          />
          <Route
            path="/confirm/:id"
            element={<Confirmation baseUrl={baseUrl} id = {'/:id'} />}
          />

        </Routes>
      </div>
    </Router>
  );
};

export default Controller;
