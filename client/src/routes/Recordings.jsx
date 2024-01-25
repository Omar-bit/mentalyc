import React from 'react';
import { Card, Typography } from '@material-tailwind/react';
import Layout from '../layouts/Layout';
import { IoSearch } from 'react-icons/io5';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Recordings() {
  const TABLE_HEAD = ['#', 'Patient Name', 'Phone Number', 'Session Date', ''];

  const [sessions, setSessions] = React.useState([]);
  const [sessionsFiltered, setSessionsFiltered] = React.useState(sessions);

  const [search, setSearch] = React.useState('');
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
        getSessions();
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function getSessions() {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_BACKEND + '/api/session/getAll',
        { body: {}, headers: { token: localStorage.getItem('token') } }
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
        setSessions(data.data);
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
    getSessions();
  }, []);
  React.useEffect(() => {
    setSessionsFiltered(sessions);
  }, [sessions]);
  React.useEffect(() => {
    if (search === '') {
      setSessionsFiltered(sessions);
      return;
    }
    const filtered = sessions.filter((sess) => {
      return (
        sess.name.toLowerCase().substring(0, search.length) ===
        search.toLowerCase()
      );
    });
    setSessionsFiltered(filtered);
  }, [search]);
  return (
    <>
      <Layout nav='full'>
        <div className='flex gap-3 items-center md:py-5 md:px-2  p-1'>
          <div className='flex relative justify-between items-center bg-[#ccc] rounded-lg p-1'>
            <input
              type='text'
              className='w-full border-none outline-none bg-[#ccc] text-[#222]'
              placeholder='Search by name'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IoSearch className='mr-2 text-aux' />
          </div>
          <Link className=' py-1 px-2 border  rounded-md' to={'/record'}>
            Record
          </Link>
        </div>
        <Card className=' shadow-lg max-h-[70vh] w-full  md:w-[90vw]   p-4'>
          <div className=' border w-full border-[#D0D4CA] rounded-md overflow-auto'>
            <table className=' w-full table-auto text-left rounded-md  '>
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={index}
                      className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'
                    >
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal leading-none opacity-70'
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sessionsFiltered?.map(
                  ({ birthdate, idPat, name, phone, date, idPsy }, index) => {
                    const isLast = index === sessionsFiltered.length - 1;
                    const classes = isLast
                      ? 'p-4 min-w-full'
                      : 'p-4 border-b border-blue-gray-50 min-w-full';

                    return (
                      <tr key={index}>
                        <td className={classes}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            #Session{index + 1}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            {name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            {phone}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            {date.indexOf(' ') !== -1
                              ? date.substring(0, date.indexOf(' '))
                              : date}{' '}
                            <br />
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Link
                            className='mr-2 '
                            to={`/recording/details?idPat=${idPat}&date=${date}`}
                          >
                            See More..
                          </Link>
                          <Typography
                            as='a'
                            href='#'
                            variant='small'
                            color='blue-gray'
                            className='font-medium'
                          >
                            <button
                              className='mr-2 text-aux'
                              onClick={() => deleteSess(idPat, date)}
                            >
                              Delete
                            </button>
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </Layout>
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

export default Recordings;
