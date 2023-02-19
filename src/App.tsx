import React from 'react';

import { useLocation, Route, Navigate, Outlet, Routes, Router } from "react-router-dom"
import Settings  from './Pages/Settings/Settings';
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
        <Route path="/settings" element={<Settings />} />
        <Route path="/studyData" element={<StudyData />} />
        <Route path="/studyData/:studyDataName/:studyDataId" element={<Study/>}/>
        <Route path="/studyData/:studyDataName/:studyDataId/userGameData/:userGameDataId" element={<UserData/>}/>
      </Route>
    </Routes>
  );
}

export default App;
