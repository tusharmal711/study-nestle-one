import React from "react";
import ReactDom from "react-dom/client";

import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";
 import SearchStudyMaterial from "./SearchStudyMaterial";
function Homepage({ isAuthenticated, setIsAuthenticated })
{
    return(
        <>
       
         <Header 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated} 
      />
        <Body/>
        <SearchStudyMaterial/>
        <Footer/> 
        
        </>
    )
}

export default Homepage;
