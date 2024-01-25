import React from 'react';
import { Card, Typography } from '@material-tailwind/react';
import Layout from '../layouts/Layout';
import { IoSearch } from 'react-icons/io5';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddPat from '../components/AddPat';
import EditPat from '../components/EditPat';
function Patients() {
  const TABLE_HEAD = ['Patient Name', 'Phone Number', 'birthdate', ''];

  const [patiens, setPatiens] = React.useState([]);
  const [patiensFiltered, setPatiensFiltered] = React.useState(patiens || []);
  const [addPatient, setAddPatient] = React.useState(false);
  const [editPatient, setEditPatient] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [pat, setPat] = React.useState(null);
  async function deletePat(idPat) {
    try {
      const { data } = axios.delete(
        import.meta.env.VITE_BACKEND + '/api/patient/delete/' + idPat,

        { headers: { token: localStorage.getItem('token') } }
      );
      toast.success('Patient deleted !');
      setPatiens((prev) => prev.filter((pat) => pat.idPat !== idPat));
    } catch (err) {
      toast.error(err);
      console.log(err);
    }
  }
  async function getPatients() {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_BACKEND + '/api/patient/getAll',
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
        setPatiens(data.data);
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
  function prepareEditPat(idPat, name, phone, birthdate) {
    setPat({ idPat, name, phone, birthdate });
    setEditPatient(true);
  }
  React.useEffect(() => {
    getPatients();
  }, []);
  React.useEffect(() => {
    setPatiensFiltered(patiens);
  }, [patiens]);
  React.useEffect(() => {
    if (search === '') {
      setPatiensFiltered(patiens);
      return;
    }
    const filtered = patiens.filter((pat) => {
      return (
        pat.name.toLowerCase().substring(0, search.length) ===
        search.toLowerCase()
      );
    });
    setPatiensFiltered(filtered);
  }, [search]);

  return (
    <>
      <Layout nav='full'>
        <div className='flex gap-3 items-center md:py-5 md:px-2  p-1'>
          <div className='flex relative justify-between items-center bg-[#ccc] rounded-md p-1'>
            <input
              type='text'
              className='w-full border-none outline-none bg-[#ccc] text-[#222]'
              placeholder='Search by name'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IoSearch className='mr-2 text-aux' />
          </div>
          <button
            className='border py-1 px-2 rounded-md'
            onClick={() => setAddPatient(true)}
          >
            Add Patient
          </button>
        </div>
        <Card className='p-4 shadow-lg max-h-[70vh] w-full md:w-[90vw]  '>
          <div className=' border border-[#D0D4CA] rounded-md overflow-auto'>
            <table className='w-full  table-auto text-left rounded-md '>
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className='border-b border-blue-gray-100 bg-blue-gray-50 p-4 rounded-md'
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
                {patiensFiltered?.map(
                  ({ birthdate, idPat, name, phone }, index) => {
                    const isLast = index === patiensFiltered.length - 1;
                    const classes = isLast
                      ? 'p-4 rounded-md'
                      : 'p-4 border-b border-blue-gray-50 ';

                    return (
                      <tr key={index} className='rounded-md'>
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
                            {birthdate}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Typography
                            as='a'
                            href='#'
                            variant='small'
                            color='blue-gray'
                            className='font-medium'
                          >
                            <button
                              className='mr-2 '
                              onClick={() =>
                                prepareEditPat(idPat, name, phone, birthdate)
                              }
                            >
                              Edit
                            </button>
                            <button
                              className='mr-2 text-aux'
                              onClick={() => deletePat(idPat)}
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
      {addPatient && (
        <AddPat
          toast={toast}
          getPatients={getPatients}
          closePopup={() => setAddPatient(false)}
        />
      )}
      {editPatient && (
        <EditPat
          toast={toast}
          getPatients={getPatients}
          closePopup={() => setEditPatient(false)}
          pat={pat}
        />
      )}
    </>
  );
}

export default Patients;
