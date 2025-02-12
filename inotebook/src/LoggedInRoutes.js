import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Notes from "./components/Notes";
import Sidebar from "./components/Sidebar";
import Trash from "./components/Trash";

const NotFoundRedirect = () => {
    
    const navigate = useNavigate();
    
    useEffect(() => {
      window.location.href = "/notes";
    }, [navigate]);
  
    return null;
  };
  
const LoggedInRoutes = ({token}) =>{

    return(
        <>
        <NoteState>
            <div className="flex">
                <Sidebar title = "iNotebook"/>
            </div>
            <div className="ml-0 pt-20 pl-6 pr-6 md:ml-64 md:pt-4">
                <Routes>
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/trash" element={<Trash />} />
                    <Route path="*" element = {<NotFoundRedirect/>}></Route>    
                </Routes>
            </div>
        </NoteState>
        </>
    )
}

export default LoggedInRoutes;
