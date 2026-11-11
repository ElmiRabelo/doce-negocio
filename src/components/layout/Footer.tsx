'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-amber-200/80 bg-amber-100/40 py-8 text-center text-xs text-stone-600 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="font-semibold text-stone-800 dark:text-stone-200 mb-1">
          🍫 Doce Negócio · Ferramenta de Apoio & Escudo do Mestre
        </p>
        <p className="text-[11px] text-stone-500 max-w-2xl mx-auto leading-relaxed">
          Baseado no RPG pedagógico de empreendedorismo, matemática financeira e cultura cacaueira desenvolvido por{' '}
          <strong>Jamilly Santos Nascimento</strong> (Ilhéus - Bahia).
        </p>
        <p className="mt-3 text-[10px] text-stone-400">
          Aplicação 100% local, autônoma e offline. Todos os dados da sua mesa ficam salvos com segurança no seu navegador.
        </p>
      </div>
    </footer>
  );
};
