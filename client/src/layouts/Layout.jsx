import React from 'react';
import Nav from '../components/Nav';
import { userContext } from '../App';
function Layout({ children, nav }) {
  const { user, setUser } = React.useContext(userContext);
  React.useEffect(() => {
    if (
      localStorage.getItem('token') === null ||
      localStorage.getItem('token') === ''
    )
      navigate('/login');
  }, []);
  return (
    <>
      <Nav nav={nav} />

      <div className=' border border-[#D0D4CA] bg-primary text-[#111] rounded-lg shadow-lg   w-[95vw] md:w-[90vw] mx-auto  flex flex-col  justify-center items-center  gap-3 mt-5 '>
        {children}
      </div>
    </>
  );
}

export default Layout;
