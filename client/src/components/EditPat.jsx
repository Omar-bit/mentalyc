import React from 'react';
import Popup from './Popup';
import axios from 'axios';
function EditPat({ closePopup, getPatients, toast, pat }) {
  const [name, setName] = React.useState(pat?.name || '');
  const [phone, setPhone] = React.useState(pat?.phone || '');
  const [birthdate, setBirthdate] = React.useState(pat?.birthdate || '');
  async function editPat(e) {
    e.preventDefault();
    if (!name || phone.length < 8 || !birthdate) {
      toast.error('Please fill all the fields');
    }
    try {
      const { data } = await axios.put(
        import.meta.env.VITE_BACKEND + '/api/patient/update/' + pat.idPat,
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
        toast.success('Patient edited !', {
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
    }
  }
  return (
    <Popup closePopup={closePopup}>
      <form onSubmit={editPat} className='text-secondary flex flex-col gap-3'>
        <h2 className='text-xl font-bold text-center text-secondary'>
          Edit Patient {pat.name}
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
          onChange={(e) => {
            if (e.target.value.length === 0) {
              setPhone('');
              return;
            }
            if (
              ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(
                e.target.value[e.target.value.length - 1]
              )
            )
              setPhone(e.target.value);
          }}
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
          type='submit'
          className='border-2 rounded-md font-bold border-main text-primary hover:bg-primary border-b py-2 px-3 bg-main hover:text-main  transition-all'
        >
          Edit
        </button>
      </form>
    </Popup>
  );
}

export default EditPat;
