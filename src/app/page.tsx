'use client'

import { useState, useEffect } from 'react';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { PiMoonStars } from 'react-icons/pi';

export default function Home() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [modo, setModo] = useState<'normal' | 'short'>('normal');
  const [ativado, setAtivado] = useState<boolean>(false);

  const botaoDarkMode = () => {
    setDarkMode((prev) => !prev);
  }

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);


  const tipoDoModo = (modo: 'normal' | 'short') => {
    setModo(modo);
  };

  const pomodoro = () => {
    setAtivado((prev) => !prev);
  };

  return(
    <div className='p-8'>
      <div className='flex flex-row justify-between items-center'>
        <p className='font-semibold'>pomodoroTime</p>
        <button
          onClick={botaoDarkMode}
          className={`group rounded-full transition-all duration-700 ease-in-out cursor-pointer
            ${darkMode ? 'hover:bg-white' : 'hover:bg-[#4C4C4C]'} 
            p-2 hover:p-3`}
        >
          <PiMoonStars 
            size={30} 
            className={`transition-colors duration-700 
              ${darkMode ? 'text-white group-hover:text-[#4C4C4C]' : 'text-black group-hover:text-[#ffffff]'}`}
          />
        </button>
      </div>
      <div className='flex flex-col justify-center items-center gap-10'>
        <h1 className='text-[25px] font-semibold '>pomodoro</h1>

        <div className='relative w-[300px] h-[50px] bg-[var(--corSectionTipo)] flex justify-between items-center border-none rounded-md p-1 overflow-hidden'>
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

        <div className='w-[250px] h-[250px] bg-[var(--corSectionTipo)] flex flex-col justify-center items-center border-none rounded-full'>
          <p className='text-[50px] font-semibold'>25:00</p>
        </div>

        <button
          onClick={pomodoro}
          className='w-[50px] h-[50px] bg-[var(--corSectionTipo)] flex justify-center items-center border-none rounded-full cursor-pointer text-2xl'
        >
          {!ativado ? <BsFillPlayFill /> : <BsFillPauseFill />}
        </button>
      </div>
    </div>
  );
}