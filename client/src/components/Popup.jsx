import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';

function Popup({ children, closePopup }) {
  function hanldeClose(e) {
    if (e.target.classList.contains('popup')) {
      closePopup();
    }
  }
  return (
    <div
      className='popup absolute top-0 left-0 z-[100]  w-full h-screen bg-[#dddddd9e] flex justify-center items-center'
      onClick={hanldeClose}
    >
      <div className='relative bg-primary  shadow-lg rounded-md p-7 w-[90vw] md:w-[500px]'>
        <IoCloseSharp
          className=' absolute right-3 top-3 cursor-pointer text-xl text-secondary'
          onClick={closePopup}
        />
        {children}
      </div>
    </div>
  );
}

export default Popup;
