import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../routes/Login';
import { CiMenuBurger } from 'react-icons/ci';
import { IoCloseSharp } from 'react-icons/io5';
import { userContext } from '../App';
import { TbLogout2 } from 'react-icons/tb';
import { FaArrowLeftLong } from 'react-icons/fa6';

function Nav({ nav }) {
  const navigate = useNavigate();
  const user = React.useContext(userContext);

  const [showMenu, setShowMenu] = React.useState(false);
  const current = window.location.pathname.substring(1);
  const routes = [
    { slug: 'Recordings', name: '', path: '/' },
    { slug: 'Patients', name: 'patients', path: '/patients' },
    { slug: 'Record', name: 'record', path: '/record' },
  ];
  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('psyName');
    user.setUser(null);
    navigate(`/login`);
  }
  if (nav === 'back') return <Back />;
  return (
    <header className='   border border-[#D0D4CA] w-[95vw] shadow-xl bg-primary md:w-[90vw] mx-auto mt-2 rounded-lg py-5 px-14 flex justify-between items-center'>
      <h2 className='text-main font-bold text-2xl navTitle'>Mentalyc</h2>
      {user && (
        <nav
          className={`${
            showMenu ? 'flex' : 'hidden'
          } md:flex w-[100vw] h-[100vh]  bg-primary z-[50]  fixed -top-0 right-0 
       flex-col justify-center items-center gap-5 
      md:flex-row md:static md:bg-none md:w-auto md:h-auto `}
        >
          <div
            className='md:hidden absolute  top-5 right-5  cursor-pointer'
            onClick={() => setShowMenu(false)}
          >
            <IoCloseSharp className='text-2xl text-secondary' />
          </div>
          <h3 className=' text-aux mb-10 text-4xl  hover:font-semibold underline'>
            Menu
          </h3>
          {routes.map((route) => (
            <Link
              key={route.name}
              className={`${
                current === route.name ? 'font-bold' : ''
              } text-main text-lg  hover:font-semibold`}
              onClick={() => {
                setShowMenu(false);
                //navigate(route.path);
              }}
              to={route.path}
            >
              {route.slug}
            </Link>
          ))}
        </nav>
      )}

      {user && (
        <>
          <button
            className=' flex items-center gap-2  border-aux py-2 px-1 rounded-md text-[black] font-semibold  hover:opacity-80 transition-all'
            onClick={handleLogout}
          >
            Log out
            <TbLogout2 className='text-xl' />
          </button>
          <div
            className='md:hidden   cursor-pointer'
            onClick={() => setShowMenu(true)}
          >
            <CiMenuBurger className='text-secondary text-2xl' />
          </div>
        </>
      )}
    </header>
  );
}
function Back() {
  const navigate = useNavigate();

  return (
    <header className='   border border-[#D0D4CA] w-[95vw] shadow-xl bg-primary md:w-[90vw] mx-auto mt-2 rounded-lg py-5 px-14 flex justify-between items-center'>
      <h2
        className='text-secondary font-semibold text-xl flex items-center gap-2 cursor-pointer '
        onClick={() => navigate(-1)}
      >
        <FaArrowLeftLong />
        Back
      </h2>
    </header>
  );
}
export default Nav;
