import React from 'react';
import { MdOutlineNotes } from 'react-icons/md';

function Notes({ notes, setNotes, disabled }) {
  return (
    <div className=' rounded-md overflow-hidden bg-[white]  w-full md:w-[48%]  border border-[#D0D4CA]'>
      <div className='bg-main p-3 flex items-center gap-3  w-full'>
        <MdOutlineNotes className='text-4xl font-bold text-[white]' />
        <span className='font-bold text-2xl text-[white] shadow-md p-1'>
          Notes
        </span>
      </div>
      <textarea
        disabled={disabled}
        onChange={(e) => setNotes(e.target.value)}
        placeholder={
          !disabled
            ? "Write your notes here...'"
            : "You didn't record any notes"
        }
        className='w-full outline-none p-2   bg-[white] text-[#111] resize-none min-h-[200px]'
        value={notes}
      ></textarea>
    </div>
  );
}

export default Notes;
