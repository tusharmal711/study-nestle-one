import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SearchStudyMaterial from "./SearchStudyMaterial";

function DispStudyMaterial({ isAuthenticated, setIsAuthenticated }) {
  

  return (
    <>
      <Header  isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated}  />
    
      <SearchStudyMaterial/>
      <Footer />
    </>
  );
}

export default DispStudyMaterial;
