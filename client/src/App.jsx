import React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import Login from './routes/Login';
import Patients from './routes/Patients';
import Recordings from './routes/Recordings';
import Record from './routes/Record';
import Details from './routes/Details';
import LiveRecording from './components/LiveRecording';
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
          <Route
            path='*'
            element={
              <div className='w-full h-screen flex items-center justify-center '>
                <div className='flex items-center justify-center flex-col gap-5 text-2xl p-10 shadow-lg rounded-md'>
                  <h2>Error 404 </h2>{' '}
                  <h1 className=' font-bold'>Page not found!</h1>{' '}
                  <Link
                    to='/'
                    className='border rounded-md px-2 py-1 text-lg hover:opacity-85'
                  >
                    Go Back
                  </Link>
                </div>
              </div>
            }
          />
        </Routes>
      </userContext.Provider>
    </>
  );
}

export const userContext = React.createContext();
export default App;
