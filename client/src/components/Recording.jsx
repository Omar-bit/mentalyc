import React from 'react';
import { FaFileAlt } from 'react-icons/fa';

function Recording({ recording, setRecording }) {
  function handleDrop(e) {
    e.preventDefault();
    setRecording(e.dataTransfer.files[0]);
  }
  return (
    <div
      className='rounded-md  border-2 border-dashed bg-[#eeeeee2f]  w-full md:w-[48%] p-10 md:p-0  '
      onDrop={(e) => handleDrop(e)}
      onDrag={(e) => e.preventDefault()}
      onDragOver={(e) => e.preventDefault()}
    >
      <label
        htmlFor='audio'
        className=' w-full h-full flex flex-col items-center justify-center cursor-pointer '
      >
        <div className='flex items-start gap-3 justify-center'>
          <FaFileAlt className='text-2xl font-bold' />

          <p>Upload the recording</p>
        </div>
        <br />
        <p className='text-center text-sm text-[#222]'>
          {recording ? recording.name : 'No file selected'}
        </p>
      </label>
      <input
        type='file'
        id='audio'
        name='audio'
        className=' hidden'
        onChange={(e) => setRecording(e.target.files[0])}
      />
    </div>
  );
}

export default Recording;
