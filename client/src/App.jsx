import React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import Login from './routes/Login';
import Patients from './routes/Patients';
import Recordings from './routes/Recordings';
import Record from './routes/Record';
import Details from './routes/Details';
function App() {
  const [user, setUser] = React.useState(localStorage.getItem('token') || null);

  if (!localStorage.getItem('token')) return <Login setUser={setUser} />;

  return (
    <>
      <userContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path='/' element={<Recordings />} />

          <Route path='/patients' element={<Patients />} />
          <Route path='/record' element={<Record />} />
          <Route path='/recording/details' element={<Details />} />
          <Route path='*' element={<h2>404 </h2>} />
        </Routes>
      </userContext.Provider>
    </>
  );
}

export const userContext = React.createContext();
export default App;
