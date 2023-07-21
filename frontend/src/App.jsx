import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages 
import Dashboard from "./pages/Dashboard";
import Myscans from "./pages/myscans";
import Newscan from "./pages/newscan";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/register";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./pages/Home";
import Patient from "./pages/Patient";
import Driver from "./pages/driver";
import Scanners from "./pages/scanners";
import Rapports from "./pages/rapports.jsx";
import Settings from "./pages/settings.jsx";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
          <Routes>
          <Route path="/register" element={<RegisterPage />} />
          
            <Route path="/login" element={<LoginPage />} /> 
            
            {/*<Route path="/driver" element={<Driver/>}/>*/}
           
            <Route path="/home" element={
              <ProtectedRoute role="Doctor" >
                <Home/>
              </ProtectedRoute>
            }/>
             <Route path="/scanners" element={
              <Scanners/>
             
            }/>
            <Route path="/rapports" element={
              <Rapports/>
             
            }/> 
               <Route path="/settings" element={
              <Settings/>
             
            }/> <Route path="/" element={
              <ProtectedRoute role="admin">
                <Dashboard />
             </ProtectedRoute> 
            } />
  <Route path="/newscan" element={
              
                <Newscan />
             
            } />
            <Route path="/Patient" element={
              <ProtectedRoute role="Doctor">
                <Patient/>
              </ProtectedRoute>
            }/>
 <Route path="/myscans" element={
              
                <Myscans /> 
            } />
            { <Route path="/driver" element={
              <ProtectedRoute role="Traiteur">
                <Driver/>
              </ProtectedRoute>
            }/>}


        </Routes>
      
    </>
  );
}

export default App;
