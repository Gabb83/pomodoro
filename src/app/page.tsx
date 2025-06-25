'use client'

import { useState } from 'react';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';

export default function Home() {
  const [modo, setModo] = useState<'normal' | 'short'>('normal');
  const [ativado, setAtivado] = useState<boolean>(false);

  const tipoDoModo = (modo: 'normal' | 'short') => {
    setModo(modo);
  };

  const pomodoro = () => {
    setAtivado((prev) => !prev);
  };

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-10 text-white'>
      <h1 className='text-[25px] font-semibold shadow-md'>pomodoro</h1>

      <div className='relative w-[300px] h-[50px] bg-[#4C4C4C] flex justify-between items-center border-none rounded-md p-1 overflow-hidden'>
        {/* Indicador animado */}
        <div
          className={`absolute top-1 left-1 h-[42px] w-[146px] bg-[#E44040] rounded-md transition-all duration-300`}
          style={{ left: modo === 'normal' ? '4px' : '150px' }}
        />
        
        {/* Botões */}
        <button
          onClick={() => tipoDoModo('normal')}
          className='w-[145px] h-[40px] text-center font-semibold rounded-md z-10 cursor-pointer'
        >
          normal
        </button>
        <button
          onClick={() => tipoDoModo('short')}
          className='w-[145px] h-[40px] text-center font-semibold rounded-md z-10 cursor-pointer'
        >
          short
        </button>
      </div>

      <div className='w-[250px] h-[250px] bg-[#4C4C4C] flex flex-col justify-center items-center border-none rounded-full'>
        <p className='text-[50px] font-semibold'>25:00</p>
      </div>

      <button
        onClick={pomodoro}
        className='w-[50px] h-[50px] bg-[#4C4C4C] flex justify-center items-center border-none rounded-full cursor-pointer text-2xl'
      >
        {!ativado ? <BsFillPlayFill /> : <BsFillPauseFill />}
      </button>
    </div>
  );
}