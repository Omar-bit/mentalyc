import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../components/Nav';
function Login({ setUser }) {
  event.preventDefault();
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  async function login(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_BACKEND + '/api/psy/login',
        { name: username, pwd }
      );
      if (data.error) {
        toast.error(data.data, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        return;
      } else {
        toast.success('Welcome Back !', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('psyName', data.data.name);
        setUser(data.data.token);
        navigate(`/`);
      }
    } catch (err) {
      console.log(err);
      toast.error(err, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  }
  React.useEffect(() => {
    alert(
      'This is a demo version, you can use one of these therapists accounts: \n\n Acc1 \n username: admin \n password: admin \n\n Acc2 \n username: test \n password: psy2 \n\n'
    );
  }, []);
  return (
    <>
      <Nav></Nav>
      <div className='w-full flex justify-center items-center h-[80vh]  '>
        <form
          action=''
          className='flex flex-col gap-5 items-center  p-5 shadow-2xl rounded-md w-[90vw] md:w-auto md:min-w-[500px] border border-[#D0D4CA] '
        >
          <h3 className='text-secondary text-xl font-semibold'>Login</h3>
          <input
            type='text'
            placeholder='username'
            className='border-b w-full py-2  px-2'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='password'
            placeholder='password'
            className='border-b w-full py-2  px-2'
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <button
            type='submit'
            className=' text-primary bg-main py-3 border rounded-md w-full hover:bg-primary hover:text-main transition duration-300 ease-in-out'
            onClick={login}
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </>
  );
}

export default Login;
