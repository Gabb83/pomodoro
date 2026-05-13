'use client';

import { useState, useEffect, useRef } from 'react';
import { BsFillPlayFill, BsFillPauseFill, BsArrowCounterclockwise } from 'react-icons/bs';
import { PiMoonStars, PiSunBold } from 'react-icons/pi';

export default function Home() {
  // --- Estados ---
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [modo, setModo] = useState<'normal' | 'short'>('normal');
  const [ativado, setAtivado] = useState<boolean>(false);
  const [tempo, setTempo] = useState<number>(25 * 60);
  const [tarefas, setTarefas] = useState<{ id: number, texto: string, completa: boolean }[]>([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [ciclos, setCiclos] = useState(0);
  const intervaloRef = useRef<NodeJS.Timeout | null>(null);

  // --- Lógica do Timer ---
  useEffect(() => {
    if (ativado) {
      intervaloRef.current = setInterval(() => {
        setTempo((prev) => {
          if (prev <= 1) {
            clearInterval(intervaloRef.current!);
            setAtivado(false);
            // Lógica de conclusão de ciclo
            if (modo === 'normal') {
              setCiclos(c => c + 1);
              alert("Fim do foco! Hora de descansar.");
            } else {
              alert("Pausa encerrada! Vamos voltar?");
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervaloRef.current) clearInterval(intervaloRef.current);
    }
    return () => { if (intervaloRef.current) clearInterval(intervaloRef.current); };
  }, [ativado, modo]);

  // --- Ações ---
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const resetarTudo = () => {
    setAtivado(false);
    setTempo(modo === 'normal' ? 25 * 60 : 5 * 60);
    setTarefas([]); // Limpa checklist
    setCiclos(0);   // Zera ciclos
    setNovaTarefa('');
  };

  const selecionarModo = (novoModo: 'normal' | 'short') => {
    setModo(novoModo);
    setAtivado(false);
    setTempo(novoModo === 'normal' ? 25 * 60 : 5 * 60);
  };

  const adicionarTarefa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaTarefa.trim()) return;
    setTarefas([...tarefas, { id: Date.now(), texto: novaTarefa, completa: false }]);
    setNovaTarefa('');
  };

  const formatarTempo = (segundos: number) => {
    const min = Math.floor(segundos / 60).toString().padStart(2, '0');
    const sec = (segundos % 60).toString().padStart(2, '0');
    return { min, sec };
  };

  const { min, sec } = formatarTempo(tempo);

  return (
  <main className={`h-screen overflow-hidden transition-colors duration-500 ${darkMode ? 'bg-[#121212] text-white' : 'bg-gray-50 text-gray-800'}`}>
    {/* Container principal com h-full e flex-col */}
    <div className="max-w-7xl mx-auto px-6 h-full flex flex-col py-6">
      
      {/* Header - Espaçamento reduzido */}
      <nav className="flex justify-between items-center mb-6 flex-shrink-0">
        <h2 className="text-xl font-black tracking-tighter italic">POMODORO.</h2>
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-xl transition-all cursor-pointer ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white shadow-lg text-indigo-600'}`}
        >
          {darkMode ? <PiSunBold size={20} /> : <PiMoonStars size={20} />}
        </button>
      </nav>

      {/* Grid Container - Ajustado para ocupar o resto da tela (flex-1) */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 flex-1 min-h-0 items-stretch">
        
        {/* COLUNA DA ESQUERDA: TIMER (70%) */}
        <section className="lg:col-span-7 flex flex-col h-full">
          <div className={`relative flex-1 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center transition-all duration-500 w-full p-8
            ${darkMode ? 'bg-gray-900/40 border border-gray-800' : 'bg-white border border-gray-100'}`}>
            
            {/* Switch de Modo */}
            <div className={`relative flex p-1 mb-8 rounded-xl w-full max-w-[280px] flex-shrink-0 ${darkMode ? 'bg-black/40' : 'bg-gray-100'}`}>
              <div
                className={`absolute top-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-lg transition-all duration-500 shadow-xl
                  ${modo === 'normal' ? 'left-1 bg-red-500' : 'left-[50%] bg-teal-500'}`}
              />
              <button onClick={() => selecionarModo('normal')} className={`flex-1 py-2 text-xs font-bold z-10 cursor-pointer transition-colors ${modo === 'normal' ? 'text-white' : 'text-gray-500'}`}>Foco</button>
              <button onClick={() => selecionarModo('short')} className={`flex-1 py-2 text-xs font-bold z-10 cursor-pointer transition-colors ${modo === 'short' ? 'text-white' : 'text-gray-500'}`}>Pausa</button>
            </div>

            {/* Display do Cronômetro - Tamanho adaptável */}
            <div className="relative mb-8 flex-shrink-0">
              <div className={`absolute inset-0 blur-[80px] opacity-20 transition-colors duration-700 ${modo === 'normal' ? 'bg-red-500' : 'bg-teal-500'}`} />
              <div className="relative flex items-baseline font-mono font-black text-[6rem] md:text-[10rem] leading-none tracking-tighter">
                <span>{min}</span>
                <span className={`animate-pulse duration-1000 ${modo === 'normal' ? 'text-red-500' : 'text-teal-500'}`}>:</span>
                <span>{sec}</span>
              </div>
            </div>

            {/* Botões de Controle */}
            <div className="flex items-center gap-6 flex-shrink-0">
              <button 
                onClick={resetarTudo} 
                className={`p-4 cursor-pointer rounded-full border-2 transition-all hover:rotate-[-45deg] active:scale-90
                  ${darkMode ? 'border-gray-700 text-gray-400 hover:bg-gray-800' : 'border-gray-200 text-gray-400 hover:bg-gray-100'}`}
              >
                <BsArrowCounterclockwise size={24} />
              </button>

              <button
                onClick={() => setAtivado(!ativado)}
                className={`w-24 h-24 flex justify-center items-center rounded-[2.5rem] text-white ccursor-pointer transition-all transform hover:scale-105 active:scale-95 shadow-2xl
                  ${modo === 'normal' ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-teal-500 hover:bg-teal-600 shadow-teal-500/20'}`}
              >
                {ativado ? <BsFillPauseFill size={48} /> : <BsFillPlayFill size={48} className="ml-1" />}
              </button>
              <div className="w-[56px]" /> 
            </div>
          </div>

          {/* Contador de Ciclos */}
          <div className="mt-4 flex items-center justify-center gap-4 flex-shrink-0">
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${i < ciclos ? (modo === 'normal' ? 'bg-red-500' : 'bg-teal-500') : 'bg-gray-700'}`} />
              ))}
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">Ciclos</span>
          </div>
        </section>

        {/* COLUNA DA DIREITA: TASK LIST (30%) - Gerencia o scroll interno */}
        <section className={`lg:col-span-3 rounded-[2.5rem] transition-all duration-500 flex flex-col p-6 min-h-0
          ${darkMode ? 'bg-gray-900/20 border border-gray-800' : 'bg-gray-100/50 border border-gray-200'}`}>
          
          <h3 className="text-lg font-bold mb-6 flex items-center gap-3 flex-shrink-0">
            Tarefas
            <span className="text-[10px] py-0.5 px-2 rounded-lg bg-red-500/10 text-red-500">{tarefas.length}</span>
          </h3>
          
          <form onSubmit={adicionarTarefa} className="relative mb-6 flex-shrink-0">
            <input 
              type="text" 
              value={novaTarefa}
              onChange={(e) => setNovaTarefa(e.target.value)}
              placeholder="Focar em..."
              className={`w-full p-3 pr-12 rounded-xl outline-none border transition-all text-sm
                ${darkMode ? 'bg-black/40 border-gray-700 focus:border-red-500' : 'bg-white border-gray-200 focus:shadow-md'}`}
            />
            <button className="absolute right-1.5 top-1.5 w-8 h-8 cursor-pointer bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-colors">
              +
            </button>
          </form>

          {/* Área de scroll apenas para as tarefas */}
          <div className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar">
            {tarefas.length === 0 ? (
              <div className="text-center py-10 opacity-30 text-xs italic">Lista vazia</div>
            ) : (
              tarefas.map(t => (
                <div 
                  key={t.id}
                  className={`p-3 rounded-xl flex items-center gap-3 border transition-all
                    ${darkMode ? 'bg-gray-800/40 border-gray-700' : 'bg-white border-white shadow-sm'}`}
                >
                  <input 
                    type="checkbox" 
                    checked={t.completa}
                    onChange={() => setTarefas(tarefas.map(item => item.id === t.id ? {...item, completa: !item.completa} : item))}
                    className="w-4 h-4 rounded-md accent-red-500 cursor-pointer"
                  />
                  <span className={`flex-1 text-xs font-medium truncate ${t.completa ? 'line-through opacity-30' : ''}`}>
                    {t.texto}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  </main>
);
}