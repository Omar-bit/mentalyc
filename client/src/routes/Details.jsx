import React from 'react';
import Layout from '../layouts/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notes from '../components/Notes';
import { FaRegTrashCan } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
export default function Details() {
  const navigate = useNavigate();
  const [session, setSession] = React.useState(null);
  const urlParams = new URLSearchParams(window.location.search);
  async function getSession() {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_BACKEND + '/api/session/getOne',

        {
          params: {
            idPat: urlParams.get('idPat'),
            date: urlParams.get('date'),
          },
          headers: { token: localStorage.getItem('token') },
        }
      );
      if (!data.error) {
        console.log(data.data);
        setSession(data.data.length > 0 ? data.data[0] : null);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err);
      console.log(err);
    }
  }
  async function deleteSess(idPat, date) {
    try {
      const { data } = await axios.delete(
        import.meta.env.VITE_BACKEND + '/api/session/delete',
        {
          data: { idPat, date },
          headers: { token: localStorage.getItem('token') },
        }
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
        toast.success('Session deleted !', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        navigate(`/`);
      }
    } catch (err) {
      console.log(err);
    }
  }
  React.useEffect(() => {
    getSession();
  }, []);
  return (
    <Layout nav='back'>
      <div className=' w-full p-4'>
        <div className='flex items-center justify-between w-full  border border-main shadow-lg rounded-lg p-3 '>
          <h3>Patient : {session?.name}</h3>
          <h3>Phone Nbr : {session?.phone}</h3>
          <h3>
            Date :{' '}
            {session?.date.indexOf(' ') !== -1
              ? session?.date.substring(0, session?.date?.indexOf(' '))
              : session?.date}
          </h3>
          <FaRegTrashCan
            onClick={() => deleteSess(session.idPat, session.date)}
            className='text-xl  cursor-pointer'
          />
        </div>
        <div className=' w-full flex flex-col md:flex-row items-stretch gap-4 mt-5'>
          <Notes disabled={true} notes={session?.notes} setNotes={() => {}} />
          <div className=' w-full md:w-[47%] p-4 border border-[#D0D4CA] rounded-md flex flex-col items-center justify-center gap-5 '>
            <h3 className=' text-main font-bold text-2xl'>Recording</h3>
            {session?.records ? (
              <audio
                src={`${import.meta.env.VITE_BACKEND}/uploads/${
                  session?.records
                }`}
                className='w-full max-w-[400px]'
                controls
              ></audio>
            ) : (
              <h3 className=' text-main font-bold text-2xl'>No recording</h3>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
