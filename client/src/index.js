import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './index.css';
import App from './App';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PatientStart from "./Pages/PatientStart";
import PatientHome from './Pages/PatientHome';
import AdminHome from './Pages/AdminHome';
 
ReactDOM.render(
   <React.StrictMode>
      <Router>
         <Routes>
            <Route index element={<App />} />
            <Route exact path="/patientStart" element={<PatientStart/>} />
            <Route exact path="/patientHome" element={<PatientHome/>} />
            <Route exact path="/adminHome" element={<AdminHome/>} />
         </Routes>
      </Router>
   </React.StrictMode>,
   document.getElementById('root')
);