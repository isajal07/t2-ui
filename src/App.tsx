import React from 'react';

import { useLocation, Route, Navigate, Outlet, Routes, Router } from "react-router-dom"
import Parameter  from './Pages/Parameter/Parameter';
import StudyData  from './Pages/StudyData/StudyData';
import Game from './Pages/Game/Game';
import Auth from './Pages/Auth/Auth';
import Study from './Pages/StudyData/Studies/Study/Study';
import UserData from './Pages/StudyData/UserData/UserData';
import './App.css';
import PrivateRoutes from './Components/PrivateRoutes/PrivateRoutes';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} /> 
      <Route element={<PrivateRoutes />}>
        <Route path="/game" element={<Game />} /> 
        <Route path="/parameter" element={<Parameter />} />
        <Route path="/studyData" element={<StudyData />} />
        <Route path="/studyData/:studyDataId" element={<Study/>}/>
        <Route path="/studyData/:studyDataId/userGameData/:userGameDataId" element={<UserData/>}/>
      </Route>
    </Routes>
  );
}

export default App;
