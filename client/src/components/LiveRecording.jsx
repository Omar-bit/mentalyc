import React, { useState, useRef } from 'react';
import axios from 'axios';
import { AiFillAudio } from 'react-icons/ai';
import { FaRegStopCircle } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Record from '../routes/Record';

function LiveRecording({ toast, recording, setRecording }) {
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(0);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    setTime(0);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.start();
      setIsRecording(true);

      mediaRecorder.current.addEventListener('dataavailable', (event) => {
        audioChunks.current.push(event.data);
      });

      mediaRecorder.current.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks.current);
        setRecording(audioBlob);
      });
    } catch (err) {
      console.error('Error accessing media devices.', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  React.useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);
  return (
    <div className='border-2 border-dashed w-full p-2 md:p-0 md:w-[47%] rounded-md flex items-center gap-3 justify-center'>
      {!isRecording && (
        <span className=' cursor-pointer'>
          <AiFillAudio
            className='text-2xl text-secondary'
            onClick={startRecording}
          />
        </span>
      )}
      {isRecording && (
        <>
          <span className=' cursor-pointer'>
            <FaRegStopCircle
              className='text-2xl text-secondary '
              onClick={stopRecording}
            />
          </span>
        </>
      )}
      {(parseInt(time / 60) >= 10
        ? parseInt(time / 60)
        : '0' + parseInt(time / 60)) +
        ':' +
        (parseInt(time % 60) >= 10
          ? parseInt(time % 60)
          : '0' + parseInt(time % 60))}
      {isRecording && (
        <span className=' '>
          <AiFillAudio className='text-2xl text-secondary pinging ' />
        </span>
      )}
      {recording && (
        <MdDelete
          className='text-2xl text-[#de3c3c]  cursor-pointer '
          onClick={() => {
            setRecording(null);
            setTime(0);
          }}
        />
      )}
    </div>
  );
}

export default LiveRecording;
