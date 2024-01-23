import React from 'react';
import Popup from './Popup';
import axios from 'axios';
function AddPat({ closePopup, getPatients, toast }) {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [birthdate, setBirthdate] = React.useState('');
  async function addPat(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_BACKEND + '/api/patient/add',
        {
          name,
          phone,

          birthdate,
        },
        {
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
        toast.success('Patient added !', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        getPatients();
        closePopup();
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
    } finally {
      () => setLoading(false);
    }
  }
  return (
    <Popup closePopup={closePopup}>
      <form
        onSubmit={addPat}
        action=''
        className='text-secondary flex flex-col gap-3'
      >
        <h2 className='text-xl font-bold text-center text-secondary'>
          Add Patient
        </h2>
        <input
          type='text'
          className='p-1  border-b border-secondary outline-none'
          placeholder='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type='tel'
          className='p-1  border-b border-secondary outline-none'
          placeholder='phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          type='date'
          className='p-1  border-b border-secondary outline-none'
          placeholder='birthdate'
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
        />
        <button
          disabled={loading}
          type='submit'
          className='border-2 rounded-md font-bold border-main text-primary hover:bg-primary border-b py-2 px-3 bg-main hover:text-main  transition-all'
        >
          Add
        </button>
      </form>
    </Popup>
  );
}

export default AddPat;
