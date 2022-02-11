
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './components/HomePage';
import CreateMeeting from './components/CreateMeeting';
import ViewMeeting from './components/ViewMeeting';
import MeetingItems from './components/MeetingItems';
import UpdateMeetingItemStatus from './components/UpdateMeetingItemStatus';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreateMeeting />} />
        <Route path='/viewmeeting' element={<ViewMeeting />} />
        <Route path='/viewmeetingItems/:MeetingTypeId' element={<MeetingItems />} />
        <Route path='/updateStatus/:ItemId' element={<UpdateMeetingItemStatus />} />
      </Routes>
    </Router>
  );
}

export default App;
