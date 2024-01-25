import React from 'react';
import { FaFileAlt } from 'react-icons/fa';

function Recording({ recording, setRecording, toast }) {
  function checkFileType(file) {
    if (file.type.substring(0, 5) !== 'audio') return false;
    return true;
  }
  function upload(e) {
    const file = e.target.files[0];
    if (!checkFileType(file)) return toast.error('Please upload an audio file');
    setRecording(file);
  }
  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!checkFileType(file)) return toast.error('Please upload an audio file');
    setRecording(file);
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

          <p className='text-md'>
            Upload the recording <br />{' '}
            <span className='text-sm text-aux'> Or Drag & Drop it</span>
          </p>
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
        onChange={(e) => upload(e)}
      />
    </div>
  );
}

export default Recording;
