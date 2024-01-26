import React from 'react';
import Layout from '../layouts/Layout';
import { Card, Typography } from '@material-tailwind/react';
import Select from 'react-select';
import axios from 'axios';
import { CiCirclePlus } from 'react-icons/ci';
import AddPat from '../components/AddPat';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notes from '../components/Notes';
import Recording from '../components/Recording';
import Loading from '../components/Loading';
import LiveRecording from '../components/LiveRecording';
const date = new Date();
let month = date.getMonth() + 1;
let day = date.getDate();
month = month < 10 ? `0${month}` : month;
day = day < 10 ? `0${day}` : day;
const today = `${date.getFullYear()}-${month}-${day}`;
let id = 0;
function Record() {
  const [loading, setLoading] = React.useState(false);
  const [notes, setNotes] = React.useState('');
  const [recording, setRecording] = React.useState(null);
  const [patient, setPatient] = React.useState('');
  const [patients, setPatients] = React.useState([]);
  const [date, setDate] = React.useState(today);
  const [addPatient, setAddPatient] = React.useState(false);
  const [pending, setPending] = React.useState([]);
  const [isLive, setIsLive] = React.useState(false);
  async function getPatients() {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_BACKEND + '/api/patient/getAll',
        { body: {}, headers: { token: localStorage.getItem('token') } }
      );
      if (!data.error) {
        setPatients(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  function prepareToUpload(e) {
    e.preventDefault();
    if (!patient || !date || !recording) {
      toast.error('Please fill all fields');
      return;
    }
    const formData = new FormData();
    formData.append('id', id++);
    formData.append('isLive', isLive);
    formData.append('date', date);
    formData.append('notes', notes);
    formData.append('idPat', patient.value);
    formData.append('records', recording);
    setPending((prev) => [...prev, formData]);
    setNotes('');
    setRecording(null);
    setPatient('');
    setDate(today);
    setLoading(false);
  }
  async function upload(record) {
    //setLoading(true);

    try {
      const { data } = await axios.post(
        import.meta.env.VITE_BACKEND + '/api/session/add',
        record,
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );
      if (!data.error) {
        toast.success('Session added successfully');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      //setLoading(false);
      setPending((prev) => prev.slice(1));
    }
  }
  React.useEffect(() => {
    getPatients();
  }, []);
  React.useEffect(() => {
    if (pending.length > 0) {
      upload(pending[0]);

    }
  }, [pending]);
  return (
    <Layout nav='full'>
      <div className=' bg-primary relative md:w-[90%]  w-[95%] py-5 '>
        <h2 className='text-xl font-bold'>
          Upload your session's audio recording
        </h2>
        <form action='' className=' flex flex-col gap-4 mt-5'>
          <div className='flex justify-between items-center '>
            <input
              type='date'
              placeholder='date'
              value={date}
              className='text-[#222] rounded-md p-1 w-[35%] md:w-[25%] border border-[#D0D4CA]'
              onChange={(e) => setDate(e.target.value)}
            />
            <div className=' flex items-center gap-3 w-[50%] md:w-[30%]'>
              <Select
                defaultValue={patient}
                onChange={setPatient}
                options={patients.map((pat) => ({
                  value: pat.idPat,
                  label: pat.name,
                }))}
                placeholder='Patient'
                required
                className='text-[#222] rounded-md p-1 w-[95%]'
              />
              <CiCirclePlus
                className='text-4xl cursor-pointer hover:opacity-80'
                onClick={() => setAddPatient(true)}
              />
            </div>
          </div>
          <div className='flex gap-3 items-center w-[47%] ml-auto'>
            <span
              className={`${
                isLive ? 'text-main' : 'text-aux'
              } cursor-pointer  text-lg`}
              onClick={() => setIsLive(true)}
            >
              Live Record
            </span>
            <span
              className={`${
                isLive ? 'text-aux' : 'text-main'
              } cursor-pointer  text-lg`}
              onClick={() => setIsLive(false)}
            >
              Upload Record
            </span>
          </div>
          <div className='flex  flex-col-reverse md:flex-row gap-10 items-stretch my-3'>
            <Notes disabled={false} setNotes={setNotes} notes={notes} />{' '}
            {!isLive && (
              <Recording
                toast={toast}
                recording={recording}
                setRecording={setRecording}
              />
            )}
            {isLive && (
              <LiveRecording
                toast={toast}
                recording={recording}
                setRecording={setRecording}
              />
            )}
          </div>
          <button
            type='submit'
            className=' border border-[white] bg-main text-[white] rounded-md p-1 w-[25%] block ml-auto hover:bg-[white] hover:text-main hover:border-main transition-all'
            onClick={(e) => prepareToUpload(e)}
          >
            Upload
          </button>
        </form>
        <div>
          <p className='text-md text-main font-semibold'>
            {pending.length} Recordings are in pending to upload !
          </p>
        </div>
      </div>
      {addPatient && (
        <AddPat
          getPatients={getPatients}
          toast={toast}
          closePopup={() => setAddPatient(false)}
        />
      )}
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
      {loading && <Loading />}
    </Layout>
  );
}

export default Record;
