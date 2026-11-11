'use client';

import React, { useState } from 'react';
import { Volume2, Check, Copy } from 'lucide-react';

interface FalaDeApoioProps {
  titulo?: string;
  origem?: string;
  children: React.ReactNode;
}

export const FalaDeApoio: React.FC<FalaDeApoioProps> = ({ 
  titulo = 'Leia para a mesa', 
  origem, 
  children 
}) => {
  const [copiado, setCopiado] = useState(false);

  const extrairTexto = () => {
    if (typeof children === 'string') return children;
    return String(children);
  };

  const handleCopy = () => {
    const texto = extrairTexto();
    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="my-5 rounded-2xl border-2 border-amber-600/70 bg-[#FFFDF5] p-5 shadow-sm transition-all hover:shadow-md dark:border-amber-500/80 dark:bg-[#1E140C]">
      <div className="mb-3 flex items-center justify-between border-b border-amber-300 pb-2.5 dark:border-amber-700/60">
        <div className="flex items-center gap-2.5 font-bold text-amber-950 dark:text-amber-100">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-700 text-white shadow-sm">
            <Volume2 className="h-4.5 w-4.5" />
          </span>
          <span className="text-sm uppercase tracking-wide font-black">{titulo}</span>
          {origem && (
            <span className="rounded-md border border-amber-300/80 bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
              {origem}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg border border-amber-400/80 bg-amber-100/70 px-2.5 py-1 text-xs font-bold text-amber-950 hover:bg-amber-200 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100 dark:hover:bg-amber-900 transition"
          title="Copiar texto da narração"
        >
          {copiado ? (
            <>
              <Check className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span className="text-emerald-800 dark:text-emerald-300">Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-amber-800 dark:text-amber-300" />
              <span>Copiar fala</span>
            </>
          )}
        </button>
      </div>
      <div className="font-serif text-[15px] sm:text-base leading-relaxed text-[#1F120A] dark:text-[#FBF7F0]">
        {children}
      </div>
    </div>
  );
};
