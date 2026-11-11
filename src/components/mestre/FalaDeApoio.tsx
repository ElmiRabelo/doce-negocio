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
    // fallback simples
    return String(children);
  };

  const handleCopy = () => {
    const texto = extrairTexto();
    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="my-4 rounded-xl border-2 border-amber-300 bg-amber-50/90 p-4 shadow-sm transition-all hover:shadow-md dark:border-amber-600/50 dark:bg-amber-950/30">
      <div className="mb-2 flex items-center justify-between border-b border-amber-200/80 pb-2 dark:border-amber-800/40">
        <div className="flex items-center gap-2 font-semibold text-amber-900 dark:text-amber-200">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-white shadow-sm">
            <Volume2 className="h-4 w-4" />
          </span>
          <span>{titulo}</span>
          {origem && (
            <span className="rounded bg-amber-200/60 px-2 py-0.5 text-xs font-normal text-amber-800 dark:bg-amber-900/60 dark:text-amber-300">
              {origem}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-amber-800 hover:bg-amber-200/60 dark:text-amber-200 dark:hover:bg-amber-900/60"
          title="Copiar texto da narração"
        >
          {copiado ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-600" />
              <span>Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copiar fala</span>
            </>
          )}
        </button>
      </div>
      <div className="font-serif text-base leading-relaxed text-amber-950 dark:text-amber-100">
        {children}
      </div>
    </div>
  );
};
