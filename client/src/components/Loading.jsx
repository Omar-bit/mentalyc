import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function Loading() {
  return (
    <div className=' fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-[#9c9b9b65] z-[100]'>
      <div className='   flex flex-col items-center gap-3'>
        <AiOutlineLoading3Quarters className=' text-5xl text-main font-bold text-center rotate' />
        <p className=' text-main font-bold text-xl'>Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
